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

namespace MeFitAPI.Controllers
{
    public class ProfileController : ControllerBase
    {
        private readonly meFitContext _context;

        private readonly IMapper _mapper;

        public ProfileController(meFitContext context, IMapper mapper)
        {
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

            KeycloakAdminAccessAgent agent = new KeycloakAdminAccessAgent();

            string firstName = profileaddDTO.FirstName;
            string lastName = profileaddDTO.LastName;
            string email = profileaddDTO.Email;
            string username = profileaddDTO.Username;
            string password = profileaddDTO.Password;

            user_id = await agent.PostUser(firstName, lastName, email, username, password);

            if (user_id == "alreadyexists")
            {
                Console.WriteLine("den fanns");
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
                    Console.WriteLine("den skapdes");

                }

                catch (Exception e)
                {
                    Console.WriteLine(e);
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
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost("login")]
        public async Task<ActionResult<string>> UserLogin([FromBody] ProfileLoginDTO profileloginDTO)
        {

            string username = profileloginDTO.Username;
            string password = profileloginDTO.Password;
            KeycloakAdminAccessAgent agent = new KeycloakAdminAccessAgent();

            var token = await agent.GetUserToken(username, password);
            string authHeader = this.HttpContext.Request.Headers["preferred_username"];
            Console.WriteLine(authHeader);
            if (token == null)
            {
                return NotFound();
            }
            if (token == "bad")
            {
                return BadRequest();
            }

            return Ok(token);

        }

        /// <summary>
        /// Gets all the information from keycloak pertaining the user and the profile from the sql database.
        /// </summary>
        /// <param name="jwttoken">the authentication token </param>
        /// <returns>Returns a ProfileDTO with all the information on the user</returns>
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [Authorize]
        [HttpGet("login")]
        public async Task<ActionResult<IEnumerable<ProfileReadDTO>>> GetUserProfile(string jwttoken)
        {
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwttoken);

            string sid = token.Payload.ToArray()[14].Value.ToString();
            string email_verified = token.Payload.ToArray()[15].Value.ToString();
            string fullname = token.Payload.ToArray()[16].Value.ToString();
            string username = token.Payload.ToArray()[17].Value.ToString();
            string firstname = token.Payload.ToArray()[18].Value.ToString();
            string lastname = token.Payload.ToArray()[19].Value.ToString();
            string email = token.Payload.ToArray()[20].Value.ToString();
           
            
            var profileList = await _context.Profiles.Include(m => m.Goals).Where(c => c.UserId == sid).ToListAsync();
            
            if (profileList.Count == 0)
            {
                return NotFound();
            }

            List<ProfileReadDTO> dtoList = _mapper.Map<List<ProfileReadDTO>>(profileList);

            dtoList[0].FirstName = firstname;
            dtoList[0].LastName = lastname;
            dtoList[0].FullName = fullname;
            dtoList[0].Username = username;
            dtoList[0].Email = email;
            dtoList[0].EmailVerified = email_verified;
            dtoList[0].Token = jwttoken;

            return Ok(dtoList);
        }


    }

}
