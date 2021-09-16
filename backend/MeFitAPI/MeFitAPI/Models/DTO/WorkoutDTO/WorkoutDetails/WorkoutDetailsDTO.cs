using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Models.DTO.WorkoutDTO.WorkoutDetails
{
    public class WorkoutDetailsDTO
    {
        public WorkoutDetailsDTO()
        {
            WorkoutSets = new HashSet<WorkoutSetDetailsDTO>();
            ProgramWorkouts = new HashSet<WorkoutProgramDetailsDTO>();
        }
    public int WorkoutId { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public int? WorkoutLevel { get; set; }

    public virtual ICollection<WorkoutSetDetailsDTO> WorkoutSets { get; set; }
    public virtual ICollection<WorkoutProgramDetailsDTO> ProgramWorkouts { get; set; }
}
}
