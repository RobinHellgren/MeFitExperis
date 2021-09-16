using AutoMapper;
using MeFitAPI.Models;
using MeFitAPI.Models.DTO.ProgramDTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
        [HttpGet]
        [Route ("/programs")]
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
        [HttpGet]
        [Route("/programs/{program_id}")]
        public async Task<ActionResult<IEnumerable<ProgramReadByIdDTO>>> GetProgramById([FromRoute] int program_id)
        {
            var program = _context.Programs
                    .Include(program => program.ProgramWorkouts)
                    .ThenInclude(relation => relation.Workout)
                    .Where(program => program.ProgramId == program_id)
                    .FirstOrDefault();

            var dto = _mapper.Map<Models.Program, ProgramReadByIdDTO>(program);

            return Ok(dto);



        }


    }
}
