using MeFitAPI.Models;
using MeFitAPI.Models.DTO.ExerciseDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Profiles
{
    public class ExerciseProfile : AutoMapper.Profile
    {

        public ExerciseProfile()
        {
            CreateMap<Exercise, ExerciseReadAllDTO>();

            CreateMap<Exercise, ExerciseReadByIdDTO>();

            CreateMap<Exercise, ExerciseAddDTO>().ReverseMap();

            CreateMap<Exercise, ExerciseUpdateDTO>().ReverseMap();

        }

    }
}
