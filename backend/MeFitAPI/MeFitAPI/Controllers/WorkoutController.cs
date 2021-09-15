using MeFitAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
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
                    .ThenInclude(set => set.Exercise)
                    
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

            var workoutDTO = _mapper.Map<Workout, Models.DTO.WorkoutDTO.WorkoutDetails.WorkoutDetailsDTO>(workout.FirstOrDefault());

            return Ok(workoutDTO);
        }
        /// <summary>
        /// Adds a new Workout to the database, with the realtionships specified in the input dto
        /// </summary>
        /// <param name="dto">DTO containing the specification for the new Workout and it's relationships</param>
        /// <returns>201 status code with the URI to the new Workout and a DTO containing the Details of the new Workout</returns>
        [HttpPost]
        [Authorize(Roles = "mefit-contributor,mefit-admin")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult PostWorkout([FromBody] Models.DTO.WorkoutDTO.WorkoutAdd.AddWorkoutDTO dto )
        {
            var newWorkout = _mapper.Map<Models.DTO.WorkoutDTO.WorkoutAdd.AddWorkoutDTO, Workout>(dto);
            try
            {
                _context.Workouts.Add(newWorkout);
                _context.SaveChanges();
                _context.Attach(newWorkout);
                
                var sets = dto.NumberOfSets.Select(set => new NumberOfSet() { ExerciseId = set.ExerciseId, WorkoutId = newWorkout.WorkoutId, ExerciseRepititions = set.ExerciseRepititions });
                var programs = dto.ProgramWorkouts.Select(program => new ProgramWorkout() { ProgramId = program.ProgramId, WorkoutId = newWorkout.WorkoutId });

                try
                {

                }
                catch
                {

                }
                _context.NumberOfSets.AddRange(sets);
                _context.ProgramWorkouts.AddRange(programs);

                _context.SaveChanges();
            }
            catch
            {
                return StatusCode(500);
            }
            var workout = new List<Workout>();
            try
            {
                workout = _context.Workouts
                    .Include(workout => workout.NumberOfSets)
                    .ThenInclude(set => set.Exercise)
                    .Include(workout => workout.ProgramWorkouts)
                    .ThenInclude(relation => relation.Program)
                    .Where(workout => workout.WorkoutId == newWorkout.WorkoutId)
                    .ToList();
            }
            catch
            {
                return StatusCode(500);
            }
            var addedWorkout = _mapper.Map<Workout, Models.DTO.WorkoutDTO.WorkoutDetails.WorkoutDetailsDTO>(workout.FirstOrDefault());
            return Created("/workouts/" + newWorkout.WorkoutId, addedWorkout);
        }
    }
}
