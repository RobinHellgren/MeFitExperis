using MeFitAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

namespace MeFitAPI.Controllers
{
        [Authorize]
        [Route("/goals")]
        [ApiController]
    public class GoalController : Controller
    {
        private readonly MeFitAPI.Models.meFitContext _meFitContext;
        private readonly AutoMapper.IMapper _mapper;
        

        public GoalController(MeFitAPI.Models.meFitContext context, AutoMapper.IMapper mapper)
        {
            _meFitContext = context;
            _mapper = mapper;
        }
        /// <summary>
        /// Gets the current users active goals using the provided Authorization header.
        /// </summary>
        /// <returns>A JSON object containing the users uncompleted goals</returns>

        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetActiveGoals ()
        {
            StringValues tokenBase64;
            HttpContext.Request.Headers.TryGetValue("Authorization",out tokenBase64);
            var jwt = tokenBase64.ToArray()[0].Split(" ")[1];

            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(jwt);
            var tokenS = jsonToken as JwtSecurityToken;

            var userID = tokenS.Claims.ToArray()[5].Value;

            IEnumerable<Models.Goal> goals;
            try { 
                goals = _meFitContext.Goals
                    .Include(goal => goal.Profile)
                    .Include(goal => goal.Program)
                    .Include(goal => goal.GoalWorkouts)
                    .Where(goal => goal.Profile.UserId == userID && goal.Completed == false)
                    .ToArray();
            }
            catch
            {
                return StatusCode(500);
            }

            if (goals.ToArray().Length < 1)
            {
                return NotFound();
            }

            IEnumerable<Models.DTO.GoalDTO.UserProfileGoalDTO> goalsDTO = goals
                .Select(goal => _mapper.Map<Models.Goal, Models.DTO.GoalDTO.UserProfileGoalDTO>(goal));


            return Ok(goalsDTO);
        }

        /// <summary>
        /// Gets the current users completed goals using the provided Authorization header.
        /// </summary>
        /// <returns>A JSON object containing the users completed goals</returns>
        [HttpGet]
        [Authorize]
        [Route("/goals/completed")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetAllGoals()
        {
            StringValues tokenBase64;
            HttpContext.Request.Headers.TryGetValue("Authorization", out tokenBase64);
            var jwt = tokenBase64.ToArray()[0].Split(" ")[1];

            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(jwt);
            var tokenS = jsonToken as JwtSecurityToken;

            var userID = tokenS.Claims.ToArray()[5].Value;

            IEnumerable<Models.Goal> goals;
            try
            {
                goals = _meFitContext.Goals
                    .Include(goal => goal.Profile)
                    .Include(goal => goal.Program)
                    .Include(goal => goal.GoalWorkouts)
                    .Where(goal => goal.Profile.UserId == userID && goal.Completed == true);
            }
            catch
            {
                return StatusCode(500);
            }

            if (goals.ToArray().Length < 1)
            {
                return NotFound();
            }
            IEnumerable<Models.DTO.GoalDTO.UserProfileGoalDTO> goalsDTO = goals
                .Select(goal => _mapper.Map<Models.Goal, Models.DTO.GoalDTO.UserProfileGoalDTO>(goal));

            return Ok(goalsDTO);
        }

        /// <summary>
        /// Posts the given goal to the database and returns the new created row
        /// </summary>
        /// <param name="dto">The new goal that should be added to the database</param>
        /// <returns>The goal that was created as JSON</returns>
        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult PostGoal([FromBody] Models.DTO.GoalDTO.GoalAddDTO dto)
        {
            Goal newGoal = _mapper.Map<Models.DTO.GoalDTO.GoalAddDTO, Models.Goal>(dto);
            List<int> workoutsFromProgram = new List<int>();
            if(newGoal.ProgramId != null)
            {
                try
                {
                    var workoutIds = _meFitContext.ProgramWorkouts.Where(relation => relation.ProgramId == newGoal.ProgramId).Select(relation => relation.WorkoutId).ToList();
                    workoutsFromProgram.AddRange(workoutIds);
                }
                catch
                {
                    return StatusCode(500);
                }
            }
            try
            {
                _meFitContext.Add(newGoal);
                _meFitContext.SaveChanges();
                _meFitContext.Attach(newGoal);
            }
            catch
            {
                return StatusCode(500);
            }

            try
            {
                workoutsFromProgram.ForEach(workoutId => _meFitContext.GoalWorkouts.Add(new GoalWorkout() 
                { 
                    GoalId = newGoal.GoalId, 
                    WorkoutId = workoutId, 
                    Complete = false 
                }));
                
                _meFitContext.SaveChanges();
            }
            catch
            {
                return StatusCode(500);
            }
            var createdGoal = _mapper.Map<Models.DTO.GoalDTO.UserProfileGoalDTO>(newGoal);

            return Created("/goals", createdGoal);
        }
        /// <summary>
        /// Removed the goal with the given ID from the database
        /// </summary>
        /// <param name="goalId">Id of the goal that should be removed</param>
        /// <returns>No content if successful, otherwise error code</returns>
        [HttpDelete]
        [Authorize(Roles ="mefit-contributor,mefit-admin")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("/goals/{goalId}")]
        public IActionResult deleteGoal(int goalId)
        {
            StringValues tokenBase64;
            HttpContext.Request.Headers.TryGetValue("Authorization", out tokenBase64);
            var jwt = tokenBase64.ToArray()[0].Split(" ")[1];

            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(jwt);
            var tokenS = jsonToken as JwtSecurityToken;

            var userID = tokenS.Claims.ToArray()[5].Value;
            var deletedGoal = _meFitContext.Goals.Where(goal => goal.GoalId == goalId).First();

            var authorized = false;

            if (tokenS.Payload.ToArray()[14].Value.ToString().Contains("mefit-admin"))
            {
                authorized = true;
            }

            if (deletedGoal.Profile.UserId == userID)
            {

                authorized = true;
            }

            if (!authorized)
            {
                return StatusCode(403);
            }
            try
            {
                if (deletedGoal != null)
                {
                _meFitContext.Attach(deletedGoal);
                _meFitContext.RemoveRange(deletedGoal.GoalWorkouts);
                _meFitContext.Remove(deletedGoal);
                _meFitContext.SaveChanges();
                return NoContent();
                }
                else
                {
                    return NotFound();
                }
            }
            catch
            {
                return StatusCode(500);
            }
        }
        /// <summary>
        /// Updates the goal in the database with the values specified in the request body, only changes values specified
        /// </summary>
        /// <param name="goalId">Id of the goal that should be updated</param>
        /// <param name="dto">Properties of the goal that should be updated</param>
        /// <returns>The modified row as JSON</returns>
        [HttpPatch]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Route("/goals/{goalId}")]
        public IActionResult updateGoal(int goalId, [FromBody] Models.DTO.GoalDTO.GoalUpdateDTO dto)
        {
            StringValues tokenBase64;
            HttpContext.Request.Headers.TryGetValue("Authorization", out tokenBase64);
            var jwt = tokenBase64.ToArray()[0].Split(" ")[1];

            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(jwt);
            var tokenS = jsonToken as JwtSecurityToken;

            var userID = tokenS.Claims.ToArray()[5].Value;

            if (!_meFitContext.Goals.Any(goal => goal.GoalId == goalId))
            {
                return NotFound();
            }

            Goal oldGoal = _meFitContext.Goals
                .Where(goal => goal.GoalId == goalId)
                .Include(goal => goal.GoalWorkouts)
                .Include(goal => goal.Profile)
                .FirstOrDefault();

            var authorized = false;

            if (tokenS.Payload.ToArray()[14].Value.ToString().Contains("mefit-admin"))
            {
                authorized = true;
            }

            if (oldGoal.Profile.UserId == userID)
            {

                authorized = true;
            }

            if (!authorized)
            {
                return StatusCode(403);
            }

            try
            { 
                if(dto.Completed != null)
                {
                    oldGoal.Completed = dto.Completed;
                }
                if (dto.EndDate != null)
                {
                    oldGoal.EndDate = dto.EndDate;
                }
                if (dto.GoalWorkouts != null)
                {
                    oldGoal.GoalWorkouts = dto.GoalWorkouts
                        .Select(relation => 
                        _mapper.Map<Models.DTO.GoalWorkoutDTO.GoalRelationDTO,GoalWorkout>(relation))
                        .ToList();
                }
                if (dto.ProfileId != null)
                {
                    oldGoal.ProfileId = dto.ProfileId;
                }
                if (dto.ProgramId != null)
                {
                    oldGoal.ProgramId = dto.ProgramId;
                }
                _meFitContext.Entry(oldGoal).State = EntityState.Modified;
                _meFitContext.SaveChanges();
            }
            catch
            {
                return StatusCode(500);
            }


            var updatedGoal = _mapper.Map<Goal,Models.DTO.GoalDTO.UserProfileGoalDTO>(oldGoal);

            return Ok(updatedGoal);
        }
    }
}
