using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Models.DTO.WorkoutDTO
{
    public class WorkoutDetailsDTO
    {
        public WorkoutDetailsDTO()
        {
            WorkoutSets = new HashSet<WorkoutSetDTO>();
            ProgramWorkouts = new HashSet<WorkoutProgramDTO>();
        }
    public int WorkoutId { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }

    public virtual ICollection<WorkoutSetDTO> WorkoutSets { get; set; }
    public virtual ICollection<WorkoutProgramDTO> ProgramWorkouts { get; set; }
}
}
