using System;
using System.Collections.Generic;

#nullable disable

namespace MeFitAPI.Models
{
    public partial class ProgramWorkout
    {
        public int ProgramId { get; set; }
        public int WorkoutId { get; set; }

        public virtual Program Program { get; set; }
        public virtual Workout Workout { get; set; }
    }
}
