using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Models.DTO.ProfileDTO
{
    public class ProfileChangePasswordDTO
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string NewPassword { get; set; }    

    }
}
