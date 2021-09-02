using System;
using System.Collections.Generic;

#nullable disable

namespace MeFitAPI.Models
{
    public partial class Program
    {
        public Program()
        {
            Goals = new HashSet<Goal>();
            ProgramWorkouts = new HashSet<ProgramWorkout>();
        }

        public int ProgramId { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }

        public virtual ICollection<Goal> Goals { get; set; }
        public virtual ICollection<ProgramWorkout> ProgramWorkouts { get; set; }
    }
}
