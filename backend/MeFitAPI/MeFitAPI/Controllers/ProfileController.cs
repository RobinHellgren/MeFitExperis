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
        [HttpPost("user")]
        public async Task PostNewUser([FromBody] ProfileAddDTO profileaddDTO)
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
                StatusCode(StatusCodes.Status400BadRequest);
                Console.WriteLine("den fanns");
               
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
                    StatusCode(StatusCodes.Status500InternalServerError);

                    Console.WriteLine(e);
                }
            }
        }


    }
}
