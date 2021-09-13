using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Models.DTO.GoalDTO
{
    public class UserProfileGoalDTO
    {
        public int GoalId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? Completed { get; set; }
        public virtual int Profile { get; set; }
        public virtual int Program { get; set; }
        public virtual ICollection<GoalWorkoutDTO.GoalRelationDTO> GoalWorkouts { get; set; }
    }
}
