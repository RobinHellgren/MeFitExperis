using MeFitAPI.Models.DTO.ProgramDTO;
using System.Linq;

namespace MeFitAPI.Profiles
{
    public class ProgramProfile : AutoMapper.Profile
    {
        public ProgramProfile()
        {

            CreateMap <MeFitAPI.Models.Program, ProgramReadAllDTO>();

            CreateMap<MeFitAPI.Models.Program, ProgramReadByIdDTO>()
                .ForMember(dto => dto.ProgramWorkouts,
                    opt => opt.MapFrom(program => program.ProgramWorkouts
                        .Select(workout => workout)
                            ));

            CreateMap<MeFitAPI.Models.ProgramWorkout, ProgramWorkoutDTO>();

            CreateMap<MeFitAPI.Models.Program, ProgramAddDTO>().ReverseMap();

            CreateMap<MeFitAPI.Models.Workout, ProgramWorkoutDetailsDTO>();
        }
    }
}
 