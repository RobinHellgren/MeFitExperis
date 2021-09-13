using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Profiles
{
    public class GoalWorkoutProfile : AutoMapper.Profile
    {
        public GoalWorkoutProfile()
        {
            CreateMap<Models.DTO.GoalWorkoutDTO.GoalRelationDTO, Models.GoalWorkout>()
                .ForMember(relation => relation.GoalId,
                    opt => opt.MapFrom(dto => dto.GoalId))
                .ForMember(relation => relation.WorkoutId,
                    opt => opt.MapFrom(dto => dto.WorkoutId))
                .ForMember(relation => relation.Complete,
                    opt => opt.MapFrom(dto => dto.Complete));
        }
    }
}
