using System;
using System.Collections.Generic;

#nullable disable

namespace MeFitAPI.Models
{
    public partial class Goal
    {
        public Goal()
        {
            GoalWorkouts = new HashSet<GoalWorkout>();
        }

        public int GoalId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? Completed { get; set; }
        public int? ProgramId { get; set; }
        public int? ProfileId { get; set; }

        public virtual Profile Profile { get; set; }
        public virtual Program Program { get; set; }
        public virtual ICollection<GoalWorkout> GoalWorkouts { get; set; }
    }
}
