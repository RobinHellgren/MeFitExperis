using System;
using System.Collections.Generic;

#nullable disable

namespace MeFitAPI.Models
{
    public partial class Profile
    {
        public Profile()
        {
            Goals = new HashSet<Goal>();
        }

        public int ProfileId { get; set; }
        public string UserId { get; set; }
        public byte? Weight { get; set; }
        public byte? Height { get; set; }
        public string MedicalConditions { get; set; }
        public string Disabilities { get; set; }
        public byte? FitnessEvaluation { get; set; }

        public virtual ICollection<Goal> Goals { get; set; }
    }
}
