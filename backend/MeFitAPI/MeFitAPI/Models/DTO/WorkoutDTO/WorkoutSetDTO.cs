using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Models.DTO.WorkoutDTO
{
    public class WorkoutSetDTO
    {
        public virtual Exercise Exercise { get; set; }
        public byte? ExerciseRepititions { get; set; }
    }
}
