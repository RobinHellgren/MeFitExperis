using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Models.DTO.WorkoutDTO.WorkoutPatch
{
    public class PatchWorkoutSetDTO
    {
        public byte? ExerciseRepititions { get; set; }
        public int? ExerciseId { get; set; }
    }
}
