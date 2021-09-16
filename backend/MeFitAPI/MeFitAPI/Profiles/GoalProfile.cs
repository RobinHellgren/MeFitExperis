using MeFitAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Profiles
{
    public class GoalProfile : AutoMapper.Profile
    {
        public GoalProfile()
        {
            CreateMap<Models.DTO.GoalWorkoutDTO.GoalRelationDTO, Models.GoalWorkout>()
                .ForMember(relation => relation.WorkoutId,
                    opt => opt.MapFrom(dto => dto.WorkoutId))
                .ForMember(relation => relation.Complete,
                    opt => opt.MapFrom(dto => dto.Complete))
                .ReverseMap();

            CreateMap<Goal, Models.DTO.GoalDTO.UserProfileGoalDTO>()
                .ForMember(dto => dto.GoalWorkouts,
                    opt => opt.MapFrom(goal => goal.GoalWorkouts
                        .Select(workout => new Models.DTO.GoalWorkoutDTO.GoalRelationDTO() {WorkoutId = workout.WorkoutId, Complete = workout.Complete}).ToArray()))
                .ForMember(dto => dto.ProfileId,
                    opt => opt.MapFrom(goal => goal.Profile.ProfileId))
                .ForMember(dto => dto.ProgramId,
                    opt => opt.MapFrom(goal => goal.Program.ProgramId));
            
            CreateMap<Models.DTO.GoalDTO.GoalAddDTO, Goal>()
                .ForMember(goal => goal.GoalWorkouts,
                    opt => opt.MapFrom(goal => goal.GoalWorkouts
                        .Select(workout => workout)));
            
            CreateMap<Models.DTO.GoalDTO.GoalUpdateDTO, Models.Goal>();
            
        }
    }
}