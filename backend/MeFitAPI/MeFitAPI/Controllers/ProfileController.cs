using MeFitAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        [Authorize]
        [HttpPost("Post")]
        public  string PostProfile([FromBody] Profile profile)
        {
            try
            {
                _context.Profiles.Add(profile);
                _context.SaveChanges();
            }

            catch
            {
                StatusCode(StatusCodes.Status500InternalServerError);
            }

            

            return "hej";
        }

    }
}
