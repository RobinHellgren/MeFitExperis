using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeFitAPI.Models;
namespace MeFitAPI.Profiles
{
    public class WorkoutProfile : AutoMapper.Profile
    {
        public WorkoutProfile()
        {
            CreateMap<Workout, Models.DTO.WorkoutDTO.WorkoutDetailsDTO>()
                .ForMember(dto => dto.WorkoutSets,
                    opt => opt.MapFrom(workout => workout.NumberOfSets
                        .Select(set => new Models.DTO.WorkoutDTO.WorkoutSetDTO() 
                            { 
                                Exercise = set.Exercise, 
                                ExerciseRepititions = set.ExerciseRepititions 
                            })))
                .ForMember(dto => dto.ProgramWorkouts,
                    opt => opt.MapFrom(workout => workout.ProgramWorkouts
                        .Select(program => new Models.DTO.WorkoutDTO.WorkoutProgramDTO() 
                            { 
                                Name = program.Program.Name, 
                                ProgramId = program.ProgramId 
                            }
                        )
                    )
                 )
                .ReverseMap();
        }
    }
}
