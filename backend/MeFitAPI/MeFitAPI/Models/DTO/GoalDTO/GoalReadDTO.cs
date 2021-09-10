using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Models.DTO.GoalDTO
{
    public class GoalReadDTO
    {
  
        public int GoalId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? Completed { get; set; }
        public int? ProgramId { get; set; }
        public int? ProfileId { get; set; }


    }
}
