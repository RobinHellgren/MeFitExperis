using MeFitAPI.Models;
using MeFitAPI.Models.DTO.ProfileDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Profiles
{
    public class ProfileProfile : AutoMapper.Profile
    {
        public ProfileProfile()
        {
            CreateMap<Models.Profile, ProfileReadDTO>()
              .ForMember(mdto => mdto.Goals,
                  opt => opt.MapFrom(c => c.Goals.ToArray()
                      .Select(c => c.GoalId).ToArray()));
            CreateMap<Models.DTO.ProfileDTO.ProfileUpdateUserDTO, Models.Profile>();

        }
    }
}

