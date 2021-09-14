using MeFitAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Controllers
{
    [Route("/workouts")]
    [ApiController]
    [Authorize]
    public class WorkoutController : ControllerBase
    {
        private readonly meFitContext _context;
        private readonly AutoMapper.IMapper _mapper;
        public WorkoutController(meFitContext context, AutoMapper.IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        /// <summary>
        /// Returns details about the specified workout as json
        /// </summary>
        /// <param name="workoutId">ID of the fetched workout</param>
        /// <returns>WorkoutDetailsDTO as JSON</returns>
        [HttpGet]
        [Route("/workouts/{workoutId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetWorkout(int workoutId)
        {
            var workout = new List<Workout>();
            try
            {
            workout = _context.Workouts
                .Include(workout => workout.NumberOfSets)
                .Include(workout => workout.ProgramWorkouts)
                .ThenInclude(relation => relation.Program)
                .Where(workout => workout.WorkoutId == workoutId)
                .ToList();
            }
            catch
            {
                return StatusCode(500);
            }

            if(workout.ToArray().Length < 1)
            {
                return NotFound();
            }

            var workoutDTO = _mapper.Map<Workout, Models.DTO.WorkoutDTO.WorkoutDetailsDTO>(workout.FirstOrDefault());

            return Ok(workoutDTO);
        }
    }
}
