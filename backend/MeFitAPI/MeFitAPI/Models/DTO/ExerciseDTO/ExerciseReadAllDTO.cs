using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Models.DTO.ExerciseDTO
{
    public class ExerciseReadAllDTO
    {
        public int ExerciseId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string TargetMuscleGroup { get; set; }

    }
}
