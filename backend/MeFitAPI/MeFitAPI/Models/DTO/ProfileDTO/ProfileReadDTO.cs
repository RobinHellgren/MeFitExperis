using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Models.DTO.ProfileDTO
{
    public class ProfileReadDTO
    {
        public string ProfileId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string FullName { get; set; }
        public string Token { get; set; }

        public byte? Weight { get; set; }
        public byte? Height { get; set; }
        public string MedicalConditions { get; set; }
        public string Disabilities { get; set; }
        public byte? FitnessEvaluation { get; set; }


        public List<int> Goals { get; set; }
    }
}
