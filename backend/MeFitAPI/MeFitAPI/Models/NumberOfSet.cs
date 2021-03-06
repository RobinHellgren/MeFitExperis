using System;
using System.Collections.Generic;

#nullable disable

namespace MeFitAPI.Models
{
    public partial class NumberOfSet
    {
        public int SetId { get; set; }
        public byte? ExerciseRepititions { get; set; }
        public int? WorkoutId { get; set; }
        public int? ExerciseId { get; set; }
        public string OwnerId { get; set; }
        public virtual Exercise Exercise { get; set; }
        public virtual Workout Workout { get; set; }
    }
}
