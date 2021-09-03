﻿using MeFitAPI.Models;
using MeFitAPI.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    

    public class ExerciseController : ControllerBase
    {
        private readonly meFitContext _context;

        public ExerciseController(meFitContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        public async Task<IEnumerable<Exercise>> GetAllExercises()
        {
  
            var exercises = _context.Exercises.ToList();
            KeycloakAdminAccessAgent agent = new KeycloakAdminAccessAgent();
            Console.WriteLine(await agent.GetToken());

            return exercises;
        }
        [HttpPost("Post")]
        public string PostExercise([FromBody] Exercise exercise)
        {
            try
            {
                _context.Exercises.Add(exercise);
                _context.SaveChanges();
            }

            catch
            {
                StatusCode(StatusCodes.Status500InternalServerError);
            }



            return "hej";
        }
    }
}
