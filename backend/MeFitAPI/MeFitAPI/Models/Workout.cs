using System;
using System.Collections.Generic;

#nullable disable

namespace MeFitAPI.Models
{
    public partial class Workout
    {
        public Workout()
        {
            GoalWorkouts = new HashSet<GoalWorkout>();
            NumberOfSets = new HashSet<NumberOfSet>();
            ProgramWorkouts = new HashSet<ProgramWorkout>();
        }

        public int WorkoutId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int? WorkoutLevel { get; set; }
        public string OwnerId { get; set; }

        public virtual ICollection<GoalWorkout> GoalWorkouts { get; set; }
        public virtual ICollection<NumberOfSet> NumberOfSets { get; set; }
        public virtual ICollection<ProgramWorkout> ProgramWorkouts { get; set; }
    }
}
