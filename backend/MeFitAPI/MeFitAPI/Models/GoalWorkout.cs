using System;
using System.Collections.Generic;

#nullable disable

namespace MeFitAPI.Models
{
    public partial class GoalWorkout
    {
        public int GoalId { get; set; }
        public int WorkoutId { get; set; }
        public bool? Complete { get; set; }

        public virtual Goal Goal { get; set; }
        public virtual Workout Workout { get; set; }
    }
}
