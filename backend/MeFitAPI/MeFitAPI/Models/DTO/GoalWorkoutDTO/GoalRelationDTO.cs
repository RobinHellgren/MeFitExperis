using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Models.DTO.GoalWorkoutDTO
{
    public class GoalRelationDTO
    {
        public int GoalId { get; set; }
        public int WorkoutId { get; set; }
        public bool? Complete { get; set; }
    }
}
