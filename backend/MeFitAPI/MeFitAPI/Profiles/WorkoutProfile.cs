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
            CreateMap<Workout, Models.DTO.WorkoutDTO.WorkoutDetails.WorkoutDetailsDTO>()
                .ForMember(dto => dto.WorkoutSets,
                    opt => opt.MapFrom(workout => workout.NumberOfSets
                        .Select(set => set)))
                .ForMember(dto => dto.ProgramWorkouts,
                    opt => opt.MapFrom(workout => workout.ProgramWorkouts
                        .Select(program => new Models.DTO.WorkoutDTO.WorkoutDetails.WorkoutProgramDetailsDTO()
                        {
                            Name = program.Program.Name,
                            ProgramId = program.ProgramId
                        }
                        )
                    )
                 )
                .ReverseMap();

            CreateMap<NumberOfSet, Models.DTO.WorkoutDTO.WorkoutDetails.WorkoutSetDetailsDTO>();

            CreateMap<Exercise, Models.DTO.WorkoutDTO.WorkoutDetails.WorkoutExerciseDetailsDTO>();

            CreateMap<Models.DTO.WorkoutDTO.WorkoutAdd.AddWorkoutDTO, Workout>()
                .ForMember(workout => workout.NumberOfSets,
                    opt => opt.Ignore())
                .ForMember(workout => workout.ProgramWorkouts,
                    opt => opt.Ignore());

            CreateMap<Models.DTO.WorkoutDTO.WorkoutPatch.PatchWorkoutDTO, Workout>()
                .ForMember(workout => workout.NumberOfSets,
                    opt => opt.Ignore())
                .ForMember(workout => workout.ProgramWorkouts,
                    opt => opt.Ignore());

            CreateMap<Models.DTO.WorkoutDTO.WorkoutPatch.PatchWorkoutSetDTO, NumberOfSet>();
        }
    }
}
