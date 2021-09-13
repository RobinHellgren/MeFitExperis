using MeFitAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Controllers
{
    [Authorize]
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
