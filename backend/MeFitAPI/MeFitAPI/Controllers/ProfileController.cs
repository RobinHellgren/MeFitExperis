using MeFitAPI.Models;
using MeFitAPI.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;


using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using AutoMapper;
using MeFitAPI.Models.DTO.ProfileDTO;

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
        [HttpPost("login")]
        public async Task<ActionResult<string>> UserLogin([FromBody] ProfileLoginDTO profileloginDTO)
        {
           
            string username = profileloginDTO.Username;
            string password = profileloginDTO.Password;

            KeycloakAdminAccessAgent agent = new KeycloakAdminAccessAgent();

            var token = await agent.GetUserToken(username, password);

            if (token == null)
            {
                return NotFound();
            }

                return Ok(token);
            
        }

    }
}
