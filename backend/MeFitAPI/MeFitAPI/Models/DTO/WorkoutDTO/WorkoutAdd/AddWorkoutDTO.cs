using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Models.DTO.WorkoutDTO.WorkoutAdd
{
    public class AddWorkoutDTO
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public virtual ICollection<AddWorkoutSetDTO> NumberOfSets { get; set; }
        public virtual ICollection<AddWorkoutProgramDTO> ProgramWorkouts { get; set; }
    }
}

