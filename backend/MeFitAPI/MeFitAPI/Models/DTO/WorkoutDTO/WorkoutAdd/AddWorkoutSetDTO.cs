using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Models.DTO.WorkoutDTO.WorkoutAdd
{
    public class AddWorkoutSetDTO
    {
        public byte? ExerciseRepititions { get; set; }
        public int? ExerciseId { get; set; }
        public int? WorkoutId { get; set; }
    }
}
