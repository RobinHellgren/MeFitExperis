using AutoMapper;
using MeFitAPI.Models;
using MeFitAPI.Models.DTO.ProgramDTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Controllers
{
    public class ProgramController : ControllerBase
    {
        private readonly meFitContext _context;

        private readonly IMapper _mapper;

        public ProgramController(meFitContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// Gets all the programs from the database and sorts them by target_muscle_group.
        /// </summary>
        /// <returns>Returns a list of programs sorted by category</returns>
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [HttpGet]
        [Authorize]
        [Route("/programs")]
        public async Task<ActionResult<IEnumerable<ProgramReadAllDTO>>> GetAllPrograms()
        {
            var programList = await _context.Programs.ToListAsync();

            if (programList.Count == 0)
            {
                return NotFound();
            }

            List<ProgramReadAllDTO> dtoList = _mapper.Map<List<ProgramReadAllDTO>>(programList);

            List<ProgramReadAllDTO> SortedList = dtoList.OrderBy(o => o.Category).ToList();

            return Ok(SortedList);

        }

        /// <summary>
        /// Gets the program with the corresponding ID from the database.
        /// </summary>
        /// <param name="program_id">The ID of the program you want shown.</param>
        /// <returns>A DTO list containing all of the information of the program. </returns>
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [HttpGet]
        [Authorize]
        [Route("/programs/{program_id}")]
        public ProgramReadByIdDTO GetProgramById([FromRoute] int program_id)
        {
            var program = _context.Programs
                    .Include(program => program.ProgramWorkouts)
                    .ThenInclude(relation => relation.Workout)
                    .Where(program => program.ProgramId == program_id)
                    .FirstOrDefault();

            var dto = _mapper.Map<Models.Program, ProgramReadByIdDTO>(program);

            return dto;

        }
        /// <summary>
        /// Posts a new program to the database.
        /// </summary>
        /// <param name="dto">The attributes of the new program that will be created.</param>
        /// <returns>Returns the created program.</returns>
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [HttpPost]
        [Authorize(Roles = "mefit-contributor,mefit-admin")]
        [Route("/programs")]
        public async Task<ActionResult<IEnumerable<ProgramReadAllDTO>>> PostProgram([FromBody] ProgramAddDTO dto)
        {
            StringValues tokenBase64;
            HttpContext.Request.Headers.TryGetValue("Authorization", out tokenBase64);
            var jwttoken = tokenBase64.ToArray()[0].Split(" ")[1];

            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwttoken);
            
            string userid = token.Payload.ToArray()[5].Value.ToString();
           
            MeFitAPI.Models.Program program = _mapper.Map<MeFitAPI.Models.Program>(dto);
            program.OwnerId = userid;
            EntityEntry newEntry = _context.Programs.Add(program);

            try
            {
                await _context.SaveChangesAsync();
            }

            catch
            {
                StatusCode(StatusCodes.Status500InternalServerError);
            }

            ProgramReadAllDTO newProgram = _mapper.Map<ProgramReadAllDTO>(newEntry.Entity);

            return CreatedAtAction("PostProgram", new { id = newProgram.ProgramId }, newProgram);

        }

        /// <summary>
        /// Deletes a program and all its relations from the database.
        /// </summary>
        /// <param name="program_id">The ID of the program you want deleted.</param>
        /// <returns>The name of the deleted program</returns>
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpDelete]
        [Authorize(Roles = "mefit-contributor,mefit-admin")]
        [Route("/programs/{program_id}")]
        public async Task<ActionResult> DeleteProgram(int program_id)
        {
            StringValues tokenBase64;
            HttpContext.Request.Headers.TryGetValue("Authorization", out tokenBase64);
            var jwttoken = tokenBase64.ToArray()[0].Split(" ")[1];

            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwttoken);

            string userid = token.Payload.ToArray()[5].Value.ToString();
                        
            var program = this._context.Programs.Include(pw => pw.ProgramWorkouts).SingleOrDefault(p => p.ProgramId == program_id);

            var authorized = false;

            if (token.Payload.ToArray()[14].Value.ToString().Contains("mefit-admin"))
            {
                authorized = true;
            }

            if (program.OwnerId == userid)
            {

                authorized = true;
            }

            if (!authorized)
            {
                return StatusCode(403);
            }

            if (program == null)
            {
                return NotFound();
            }
            
            else {

                foreach (var deleteProgramWorkout in program.ProgramWorkouts
                    .Where(at => at.ProgramId == program_id))
                {
                    _context.ProgramWorkouts.Remove(deleteProgramWorkout);
                }
                try
                {
                        _context.Programs.Remove(program);
                        await _context.SaveChangesAsync();
                        return Ok();
                }

                catch
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }  
        }
        
        /// <summary>
        /// Updates the program with the id that is given.
        /// </summary>
        /// <param name="program_id">The id of the program that will be updated</param>
        /// <param name="dto">The attributes that will be updated </param>
        /// <returns>The updated object</returns>
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpPatch]
        [Authorize(Roles = "mefit-contributor,mefit-admin")]
        [Route ("programs/{program_id}")]
        public IActionResult UpdateProgram (int program_id, [FromBody] Models.DTO.ProgramDTO.ProgramAddDTO dto)
        {

            StringValues tokenBase64;
            HttpContext.Request.Headers.TryGetValue("Authorization", out tokenBase64);
            var jwttoken = tokenBase64.ToArray()[0].Split(" ")[1];

            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwttoken);

            string userid = token.Payload.ToArray()[5].Value.ToString();

            if (!_context.Programs.Any(program => program.ProgramId == program_id))
            {
                return NotFound();
            }

            var updateProgram = _mapper.Map<Models.DTO.ProgramDTO.ProgramAddDTO, Models.Program>(dto);

            var oldProgram = _context.Programs.Where(program => program.ProgramId == program_id).FirstOrDefault();

            var authorized = false;

            if (token.Payload.ToArray()[14].Value.ToString().Contains("mefit-admin"))
            {
                authorized = true;
            }

            if (oldProgram.OwnerId == userid)
            {

                authorized = true;
            }

            if (!authorized)
            {
                return StatusCode(403);
            }

            try
            {
                if (dto.Name != null)
                {
                    oldProgram.Name = dto.Name;
                }
                if (dto.ProgramLevel != null)
                {
                    oldProgram.ProgramLevel = dto.ProgramLevel;
                }
                if (dto.Category != null)
                {
                    oldProgram.Category = dto.Category;
                }

                _context.SaveChanges();
            }
            catch
            {
                return StatusCode(500);
            }


            return Ok(oldProgram);
        }
        /// <summary>
        /// Posts a relation between program and a workout
        /// </summary>
        /// <param name="dto">Contains the program id and the workout id</param>
        /// <returns>Ok</returns>
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpPost]
        [Authorize(Roles = "mefit-contributor,mefit-admin")]
        [Route("/programworkout")]
        public async Task<ActionResult> PostProgramWorkout([FromBody] ProgramWorkoutAddDTO dto)
        {
            StringValues tokenBase64;
            HttpContext.Request.Headers.TryGetValue("Authorization", out tokenBase64);
            var jwttoken = tokenBase64.ToArray()[0].Split(" ")[1];

            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwttoken);

            string userid = token.Payload.ToArray()[5].Value.ToString();
            var oldProgram = _context.Programs.Where(program => program.ProgramId == dto.ProgramId).FirstOrDefault();


            var authorized = false;

            if (token.Payload.ToArray()[14].Value.ToString().Contains("mefit-admin"))
            {
                authorized = true;
            }

            if (oldProgram.OwnerId == userid)
            {

                authorized = true;
            }

            if (!authorized)
            {
                return StatusCode(403);
            }
            else
              {
            MeFitAPI.Models.ProgramWorkout pw = _mapper.Map<MeFitAPI.Models.ProgramWorkout>(dto);
            EntityEntry newEntry = _context.ProgramWorkouts.Add(pw);
            try
            {
                await _context.SaveChangesAsync();
            }

            catch
            {
                StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok();
            }

        }

        /// <summary>
        /// Deletes the relation between a program and a workout.
        /// </summary>
        /// <param name="program_id">The id of the program containing the workout.</param>
        /// <param name="workout_id">The id of the workout that is to be removed from the relation.</param>
        /// <returns>Ok</returns>
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpDelete]
        [Authorize(Roles = "mefit-contributor,mefit-admin")]
        [Route("/programworkout")]
        public async Task<ActionResult> DeleteProgramWorkout(int program_id, int workout_id)
        {
            StringValues tokenBase64;
            HttpContext.Request.Headers.TryGetValue("Authorization", out tokenBase64);
            var jwttoken = tokenBase64.ToArray()[0].Split(" ")[1];

            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwttoken);

            string userid = token.Payload.ToArray()[5].Value.ToString();
            var oldProgram = _context.Programs.Where(program => program.ProgramId == program_id).FirstOrDefault();
            
            var programWorkouts = _context.ProgramWorkouts.Where(p => p.ProgramId == program_id && p.WorkoutId==workout_id).FirstOrDefault();
            
            var authorized = false;

            if (token.Payload.ToArray()[14].Value.ToString().Contains("mefit-admin"))
            {
                authorized = true;
            }

            if (oldProgram.OwnerId == userid)
            {

                authorized = true;
            }

            if (!authorized)
            {
                return StatusCode(403);
            }
            else
            {
                _context.ProgramWorkouts.Remove(programWorkouts);
                try
                {
                
                    await _context.SaveChangesAsync();
                }

                catch
                {
                    StatusCode(StatusCodes.Status500InternalServerError);
                }
            return Ok();
            }

        }
    }
}
