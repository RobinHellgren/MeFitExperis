using MeFitAPI.Models;
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
        public IEnumerable<Exercise> GetAllExercises()
        {
            var exercises = _context.Exercises.ToList();
            
            return exercises;
        }
    }
}
