using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Models.DTO.GoalDTO
{
    public class GoalUpdateDTO
    {
        public DateTime? EndDate { get; set; }
        public bool? Completed { get; set; }
        public int? ProgramId { get; set; }
        public int? ProfileId { get; set; }
        public virtual ICollection<GoalWorkoutDTO.GoalRelationDTO> GoalWorkouts { get; set; }
    }
}
