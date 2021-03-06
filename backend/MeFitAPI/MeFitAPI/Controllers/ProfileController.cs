using MeFitAPI.Models;
using MeFitAPI.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MeFitAPI.Models.DTO.ProfileDTO;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Primitives;
using Microsoft.Extensions.Configuration;

namespace MeFitAPI.Controllers
{
    public class ProfileController : ControllerBase
    {
        private readonly meFitContext _context;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public ProfileController(meFitContext context, IMapper mapper, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
            _mapper = mapper;
        }


        /// <summary>
        /// Adds a new profile to the database and makes a new keycloak user.
        /// </summary>
        /// <param name="profileaddDTO">Contains the data for the new profile.</param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [HttpPost("user")]
        public async Task<ActionResult> PostNewUser([FromBody] ProfileAddDTO profileaddDTO)
        {

            string user_id = "";

            KeycloakAdminAccessAgent agent = new KeycloakAdminAccessAgent(_configuration);


            user_id = await agent.PostUser(profileaddDTO.FirstName, profileaddDTO.LastName, profileaddDTO.Email, profileaddDTO.Username, profileaddDTO.Password);

            if (user_id == "alreadyexists")
            {
                return BadRequest();
            }
            else
            {

                try
                {
                    Models.Profile profile = new Models.Profile();
                    profile.UserId = user_id;
                    _context.Profiles.Add(profile);

                    await _context.SaveChangesAsync();

                }

                catch (Exception e)
                {
                    return StatusCode(500);
                }
                return NoContent();
            }
        }

        /// <summary>
        /// Login: Requests an access token from the keycloak server using the provided user credentials.
        /// </summary>
        /// <param name="profileloginDTO">Contains the user credentials</param>
        /// <returns> An access token.</returns>
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [HttpPost("login")]
        public async Task<ActionResult<string>> UserLogin([FromBody] ProfileLoginDTO profileloginDTO)
        {

            string username = profileloginDTO.Username;
            string password = profileloginDTO.Password;
            KeycloakAdminAccessAgent agent = new KeycloakAdminAccessAgent(_configuration);

            var token = await agent.GetUserToken(username, password);
            string authHeader = this.HttpContext.Request.Headers["preferred_username"];
            if (token == null)
            {
                return StatusCode(500);
            }
            if (token == "401")
            {
                return Unauthorized();
            }

            return Ok(token);

        }

        /// <summary>
        /// Gets all the information from keycloak pertaining the user and the profile from the sql database.
        /// </summary>
        /// <returns>Returns a ProfileDTO with all the information on the user</returns>
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [HttpGet("login")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ProfileReadDTO>>> GetUserProfileWithToken()
        {
            StringValues tokenBase64;
            HttpContext.Request.Headers.TryGetValue("Authorization", out tokenBase64);
            var jwttoken = tokenBase64.ToArray()[0].Split(" ")[1];

            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwttoken);



            string sid = token.Payload.ToArray()[5].Value.ToString();

            
            string username = token.Payload.ToArray()[16].Value.ToString();
            string firstname = token.Payload.ToArray()[17].Value.ToString();
            string lastname = token.Payload.ToArray()[18].Value.ToString();
            string email = token.Payload.ToArray()[20].Value.ToString();
            Console.WriteLine(email);
            var profileList = await _context.Profiles.Include(m => m.Goals).Where(c => c.UserId == sid).ToListAsync();

            if (profileList.Count == 0)
            {
                return NotFound();
            }

            List<ProfileReadDTO> dtoList = _mapper.Map<List<ProfileReadDTO>>(profileList);

             dtoList[0].FirstName = firstname;
             dtoList[0].LastName = lastname;
             dtoList[0].Username = username;
             dtoList[0].Email = email;
             dtoList[0].Token = jwttoken;
            return Ok(dtoList[0]);
            }

        /// <summary>
        /// Changes the users password.
        /// </summary>
        /// <param name="profileChangePasswordDTO"> Contains the username , the old password and the new (wanted) password </param>
         /// <param name="userId">The id of the user that should be updated</param>
        /// <returns> StatusCode 204 if the change was a success, otherwise it returns Unauthorized</returns>
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpPut("user/{userId}/update_password")]
        [Authorize]
        public async Task<ActionResult<string>> UpdateUserPassword ([FromBody] ProfileChangePasswordDTO profileChangePasswordDTO, string userId)
        {
            StringValues tokenBase64;
            HttpContext.Request.Headers.TryGetValue("Authorization", out tokenBase64);
            var jwt = tokenBase64.ToArray()[0].Split(" ")[1];

            var handler = new JwtSecurityTokenHandler();
            var headerToken = handler.ReadJwtToken(jwt);
            var id = headerToken.Payload.ToArray()[5].Value.ToString();

            if (id != userId)
            {
                return StatusCode(403);
            }

            string username = profileChangePasswordDTO.Username;
            string oldpassword = profileChangePasswordDTO.Password;
            string newpassword = profileChangePasswordDTO.NewPassword;

            KeycloakAdminAccessAgent agent = new KeycloakAdminAccessAgent(_configuration);
            
            var token = await agent.GetUserToken(username, oldpassword);

            if (token == "401")
            {
                return Unauthorized();
            }
            else 
            {
                var changedPassword = await agent.ChangePassword(newpassword, token);
                if (changedPassword == "NoContent")
                {
                    return StatusCode(204);
                }
                else
                {
                    return StatusCode(500);
                }

            }

        }
        
        
        /// <summary>
        /// Deletes the user from keycloak and its profile from the SQL database.
        /// </summary>
       /// <param name="userId">The id of the user that should be deleted</param>
        /// <returns>Returns the users username if it was a success otherwise it returns the error </returns>
        [HttpDelete("user/{userId}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> DeleteUser(string userId)
        {
            StringValues tokenBase64;
            HttpContext.Request.Headers.TryGetValue("Authorization", out tokenBase64);
            var jwt = tokenBase64.ToArray()[0].Split(" ")[1];
            
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwt);
            var id = token.Payload.ToArray()[5].Value.ToString();
            var username= token.Payload.ToArray()[17].Value.ToString();

            bool authorized = false;

            if (token.Payload.ToArray()[14].ToString().Contains("mefit-admin"))
            {
                authorized = true;
                 id = userId;
            }

            if(id == userId)
            {
                authorized = true;
            }

            if(!authorized)
            {
                return StatusCode(403);
            }

            KeycloakAdminAccessAgent agent = new KeycloakAdminAccessAgent(_configuration);

            var responseFromKeyCloak = await agent.DeleteUser(id, username);

            if(responseFromKeyCloak == "NoContent")
            {

            var profile = _context.Profiles.Where(c => c.UserId == id).FirstOrDefault();
            var profile_id = profile.ProfileId;
            var profileThatWillBeDeleted = await _context.Profiles.FindAsync(profile_id);

            if (profile == null)
            {
                return NotFound();
            }
            _context.Profiles.Remove(profileThatWillBeDeleted);

            try
            {
                await _context.SaveChangesAsync();
            }

            catch
            {
                StatusCode(StatusCodes.Status500InternalServerError);
            }
                return NoContent();
            }

            else
            {
                return NotFound();
            }

        }

        /// <summary>
        /// Updates a user on keycloak and/or the profile in the database.
        /// </summary>
        /// <param name="profileUpdateUserDTO"></param>
        /// <returns>200OK if it was updated - otherwise Status500</returns>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpPatch("user/{userId}")]
        [Authorize]
        public async Task<ActionResult<ProfileUpdateUserDTO>> updateUser([FromBody] ProfileUpdateUserDTO profileUpdateUserDTO, string userId)
        {
            StringValues tokenBase64;
            HttpContext.Request.Headers.TryGetValue("Authorization", out tokenBase64);
            var jwttoken = tokenBase64.ToArray()[0].Split(" ")[1];
            
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwttoken);
            var id = token.Payload.ToArray()[5].Value.ToString();

            bool authorized = false;

            if (token.Payload.ToArray()[14].ToString().Contains("mefit-admin"))
            {
                authorized = true;
                 id = userId;
            }

            if (id == userId)
            {
                authorized = true;
            }

            if (!authorized)
            {
                return StatusCode(403);
            }

            KeycloakAdminAccessAgent agent = new KeycloakAdminAccessAgent(_configuration);

           await agent.UpdateUser(id, profileUpdateUserDTO.FirstName, profileUpdateUserDTO.LastName, profileUpdateUserDTO.Email);

            
            
            var newUpdatedUserProfile = _mapper.Map<Models.DTO.ProfileDTO.ProfileUpdateUserDTO, Models.Profile>(profileUpdateUserDTO);

            var oldUpdatedUserProfile = _context.Profiles.Where(profile => profile.UserId == id).FirstOrDefault();

            try
            {
                if (profileUpdateUserDTO.Height != null && profileUpdateUserDTO.Height != 0)
                {
                    oldUpdatedUserProfile.Height = profileUpdateUserDTO.Height;
                }
                if (profileUpdateUserDTO.Weight != null && profileUpdateUserDTO.Weight != 0)
                {
                    oldUpdatedUserProfile.Weight = profileUpdateUserDTO.Weight;
                }
                if (profileUpdateUserDTO.MedicalConditions != null && profileUpdateUserDTO.MedicalConditions != "string")
                {
                    oldUpdatedUserProfile.MedicalConditions = profileUpdateUserDTO.MedicalConditions;
                }
                if (profileUpdateUserDTO.Disabilities != null && profileUpdateUserDTO.Disabilities != "string")
                {
                    oldUpdatedUserProfile.Disabilities = profileUpdateUserDTO.Disabilities;
                }
                if (profileUpdateUserDTO.FitnessEvaluation != null && profileUpdateUserDTO.FitnessEvaluation != 0)
                {
                    oldUpdatedUserProfile.FitnessEvaluation = profileUpdateUserDTO.FitnessEvaluation;
                }

                _context.SaveChanges();

                 var newReturnFromDatabase = _context.Profiles.Where(profile => profile.UserId == id).FirstOrDefault();
                ProfileUpdateUserDTO returnDto = new ProfileUpdateUserDTO();
                if (profileUpdateUserDTO.FirstName != null && profileUpdateUserDTO.FirstName != "string"){
                    returnDto.FirstName = profileUpdateUserDTO.FirstName;
                }
                else
                {
                    returnDto.FirstName = profileUpdateUserDTO.FirstName;
                }
                if (profileUpdateUserDTO.LastName != null && profileUpdateUserDTO.LastName != "string")
                {
                    returnDto.LastName = profileUpdateUserDTO.LastName;
                }
                else
                {
                    returnDto.LastName  = token.Payload.ToArray()[18].Value.ToString();
                }
                if (profileUpdateUserDTO.Email != null && profileUpdateUserDTO.Email != "string")
                {
                    returnDto.Email = profileUpdateUserDTO.Email;
                }
                else
                {
                    returnDto.Email = token.Payload.ToArray()[19].Value.ToString();
                }
                returnDto.Height = newReturnFromDatabase.Height;
                returnDto.Weight = newReturnFromDatabase.Weight;
                returnDto.Disabilities = newReturnFromDatabase.Disabilities;
                returnDto.FitnessEvaluation = newReturnFromDatabase.FitnessEvaluation;
                returnDto.MedicalConditions = newReturnFromDatabase.MedicalConditions;


                return returnDto;
            }

            catch (Exception e)
            {
                return StatusCode(500);
            }
            
           
        }

    }

}
