using System;
using System.Collections.Generic;

#nullable disable

namespace MeFitAPI.Models
{
    public partial class Exercise
    {
        public Exercise()
        {
            NumberOfSets = new HashSet<NumberOfSet>();
        }
        public int ExerciseId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string TargetMuscleGroup { get; set; }
        public string Image { get; set; }
        public string VidLink { get; set; }
        public string OwnerId { get; set; }

        public virtual ICollection<NumberOfSet> NumberOfSets { get; set; }

    }
}
