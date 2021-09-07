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

namespace MeFitAPI.Controllers
{
    public class ProfileController : ControllerBase
    {
        private readonly meFitContext _context;

        public ProfileController(meFitContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        public IEnumerable<Profile> GetAllProfiles()
        {
            var profiles = _context.Profiles.ToList();

            return profiles;
        }
        [HttpPost("user")]
        public async Task PostNewUser([FromBody] Profile profile)
        {

            string user_id = "";
            
            KeycloakAdminAccessAgent agent = new KeycloakAdminAccessAgent();

            string firstName = "toasdasdbe";
            string lastName = "carlasfasdfsson";
            string email = "tcfdsdf@ds.se";
            string username = "tobbecsadasda123";

            user_id = await agent.PostUser(firstName, lastName, email, username);

            if (user_id == "alreadyexists")
            {
                StatusCode(StatusCodes.Status400BadRequest);
                Console.WriteLine("den fanns");
            }
            else
            {
                
                try
                {
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
