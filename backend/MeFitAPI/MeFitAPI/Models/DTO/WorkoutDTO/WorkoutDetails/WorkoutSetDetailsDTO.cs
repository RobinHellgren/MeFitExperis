using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Models.DTO.WorkoutDTO.WorkoutDetails
{
    public class WorkoutSetDetailsDTO
    {
        public virtual WorkoutExerciseDetailsDTO Exercise { get; set; }
        public byte? ExerciseRepititions { get; set; }
    }
}
