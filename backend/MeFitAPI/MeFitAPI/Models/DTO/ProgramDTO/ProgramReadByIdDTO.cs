
using System.Collections.Generic;


namespace MeFitAPI.Models.DTO.ProgramDTO
{
    public class ProgramReadByIdDTO
    {

        public int ProgramId { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public int? ProgramLevel { get; set; }

        public virtual ICollection<ProgramWorkoutDTO> ProgramWorkouts { get; set; }

    }
}
