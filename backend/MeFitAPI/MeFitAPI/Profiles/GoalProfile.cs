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
            CreateMap<Goal, Models.DTO.GoalDTO.UserProfileGoalDTO>();
            CreateMap<Models.DTO.GoalDTO.GoalAddDTO, Goal>()
                .ForMember(goal => goal.GoalWorkouts,
                    opt => opt.Ignore());
            CreateMap<Models.DTO.GoalDTO.GoalUpdateDTO, Models.Goal>();
        }
    }
}