

namespace MeFitAPI.Models.DTO.ProgramDTO
{
    public class ProgramWorkoutDTO
    {

        public int ProgramId { get; set; }
        public int WorkoutId { get; set; }

        public virtual ProgramWorkoutDetailsDTO Workout { get; set; }
    }
}
