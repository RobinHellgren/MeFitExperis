using MeFitAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Controllers
{
    [Route("/workouts")]
    [ApiController]
    /*[Authorize]*/
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

            StringValues tokenBase64;
            HttpContext.Request.Headers.TryGetValue("Authorization", out tokenBase64);
            var jwttoken = tokenBase64.ToArray()[0].Split(" ")[1];

            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwttoken);

            string userid = token.Payload.ToArray()[5].Value.ToString();

            var newWorkout = _mapper.Map<Models.DTO.WorkoutDTO.WorkoutAdd.AddWorkoutDTO, Workout>(dto);

            newWorkout.OwnerId = userid;

            try
            {
                _context.Workouts.Add(newWorkout);
                _context.SaveChanges();
                _context.Attach(newWorkout);
                
                var sets = dto.NumberOfSets.Select(set => new NumberOfSet() { ExerciseId = set.ExerciseId, WorkoutId = newWorkout.WorkoutId, ExerciseRepititions = set.ExerciseRepititions });
                var programs = dto.ProgramWorkouts.Select(program => new ProgramWorkout() { ProgramId = program.ProgramId, WorkoutId = newWorkout.WorkoutId });

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
        /// <summary>
        /// Deletes the specified workout and it's relationships with program and number of sets.
        /// </summary>
        /// <param name="workoutId">Id of the workout to delete</param>
        /// <returns>No content HTTP status code</returns>
        [HttpDelete]
        [Route("/workouts/{workoutId}")]
        [Authorize(Roles = "mefit-contributor,mefit-admin")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult DeleteWorkout(int workoutId)
        {

            StringValues tokenBase64;
            HttpContext.Request.Headers.TryGetValue("Authorization", out tokenBase64);
            var jwttoken = tokenBase64.ToArray()[0].Split(" ")[1];

            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwttoken);

            string userid = token.Payload.ToArray()[5].Value.ToString();

            var foundWorkout = new List<Workout>();

            try
            {
                foundWorkout = _context.Workouts
                    .Include(workout => workout.NumberOfSets)
                    .ThenInclude(set => set.Exercise)
                    .Include(workout => workout.ProgramWorkouts)
                    .ThenInclude(relation => relation.Program)
                    .Where(workout => workout.WorkoutId == workoutId)
                    .ToList();

                if(foundWorkout.Count < 1)
                {
                    return NotFound();
                }
            }
            catch
            {
                return StatusCode(500);
            }

            if ( foundWorkout[0].OwnerId != userid)
            {
                return Unauthorized(401);
            }

            try
            {
                var deletedWorkout = foundWorkout.FirstOrDefault();
                _context.Attach(deletedWorkout);
                var deletedProgramRelations = deletedWorkout.ProgramWorkouts;
                var deletedSetRelations = deletedWorkout.NumberOfSets;
                _context.ProgramWorkouts.RemoveRange(deletedProgramRelations);
                _context.NumberOfSets.RemoveRange(deletedSetRelations);
                _context.SaveChanges();
                _context.Remove(deletedWorkout);
                _context.SaveChanges();
                return NoContent();
            }
            catch
            {
                return StatusCode(500);
            }
        }
        /// <summary>
        /// Updates the specified workout and it's relation to NumberOfSets, excluded fields in the input JSON will be ignored
        /// </summary>
        /// <param name="workoutId">Id of the modified workout</param>
        /// <param name="dto">Definition of the new state of the workout</param>
        /// <returns>204 Nocontent</returns>
        [HttpPatch]
        [Route("/workouts/{workoutId}")]
        [Authorize(Roles = "mefit-contributor,mefit-admin")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult UpdateWorkout(int workoutId, [FromBody] Models.DTO.WorkoutDTO.WorkoutPatch.PatchWorkoutDTO dto)
        {
            StringValues tokenBase64;
            HttpContext.Request.Headers.TryGetValue("Authorization", out tokenBase64);
            var jwttoken = tokenBase64.ToArray()[0].Split(" ")[1];

            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwttoken);

            string userid = token.Payload.ToArray()[5].Value.ToString();

            if (!_context.Workouts.Any(workout => workout.WorkoutId == workoutId))
            {
                return NotFound();
            }


            var oldWorkout = _context.Workouts
                .Include(workout => workout.NumberOfSets)
                .Where(workout => workout.WorkoutId == workoutId)
                .FirstOrDefault();

            if (oldWorkout.OwnerId != userid)
            {
                return Unauthorized(401);
            }

            try
            {
                if (dto.Name != null)
                {
                    oldWorkout.Name= dto.Name;
                }
                if (dto.Type != null)
                {
                    oldWorkout.Type = dto.Type;
                }
                
                if(dto.NumberOfSets != null)
                {
                    var addedSets = dto.NumberOfSets.Select(set => _mapper.Map<Models.DTO.WorkoutDTO.WorkoutPatch.PatchWorkoutSetDTO, NumberOfSet>(set)).ToList().Except(oldWorkout.NumberOfSets).ToList();
                    var deletedSets = oldWorkout.NumberOfSets.Except(dto.NumberOfSets.Select(set => _mapper.Map<Models.DTO.WorkoutDTO.WorkoutPatch.PatchWorkoutSetDTO, NumberOfSet>(set)).ToList()).ToList();

                    addedSets.ForEach(set => Console.WriteLine(set.ExerciseId));

                    if (addedSets.Count > 0)
                    {
                        addedSets.ForEach(set => {
                            _context.NumberOfSets.Add(set);
                            oldWorkout.NumberOfSets.Add(set);
                        });
                    }
                    if (deletedSets.Count > 0)
                    {
                        deletedSets.ForEach(set =>
                        {
                            _context.NumberOfSets.Remove(set);
                            oldWorkout.NumberOfSets.Remove(set);
                        });
                    }
                }
                _context.SaveChanges();
            }
            catch(Exception e)
            {
                Console.Error.WriteLine(e);
                return StatusCode(500);
            }

            return NoContent();
        }
    }
}
