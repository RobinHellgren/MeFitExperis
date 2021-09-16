using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Models.DTO.WorkoutDTO.WorkoutPatch
{
    public class PatchWorkoutDTO
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public virtual ICollection<PatchWorkoutSetDTO> NumberOfSets { get; set; }
    }
}

