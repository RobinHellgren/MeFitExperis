﻿using AutoMapper;
using MeFitAPI.Models;
using MeFitAPI.Models.DTO.ExerciseDTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Primitives;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Controllers
{
    public class ExerciseController : ControllerBase
    {
        private readonly meFitContext _context;

        private readonly IMapper _mapper;

        public ExerciseController(meFitContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        class GFG : IComparer<string>
        {
            public int Compare(string x, string y)
            {

                if (x == null || y == null)
                {
                    return 0;
                }

                // "CompareTo()" method
                return x.CompareTo(y);

            }
        }

        /// <summary>
        /// Gets all the exercises from the database and sorts them by target_muscle_group.
        /// </summary>
        /// <returns>Returns a list of exercises sorted by target_muscle_group</returns>
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet("exercises")]
        public async Task<ActionResult<IEnumerable<ExerciseReadAllDTO>>> GetAllExercises()
        {
            var exerciseList = await _context.Exercises.ToListAsync();

            if(exerciseList.Count == 0)
            {
                return NotFound();
            }

            List<ExerciseReadAllDTO> dtoList = _mapper.Map<List<ExerciseReadAllDTO>>(exerciseList);

            List<ExerciseReadAllDTO> SortedList = dtoList.OrderBy(o => o.TargetMuscleGroup).ToList();

            return Ok(SortedList);

        }

        /// <summary>
        /// Gets the exercise with the corresponding ID from the database.
        /// </summary>
        /// <param name="exercise_id">The ID of the exercise you want shown.</param>
        /// <returns>A DTO list containing all of the information of the exercise. </returns>
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet]
        [Route("/exercises/{exercise_id}")]
        public async Task<ActionResult<IEnumerable<ExerciseReadByIdDTO>>> GetExerciseById([FromRoute] int exercise_id)
        {
            var exerciseList = await _context.Exercises.Where(c => c.ExerciseId == exercise_id).ToListAsync();

            if (exerciseList.Count == 0)
            {
                return NotFound();
            }

            List<ExerciseReadByIdDTO> dtoList = _mapper.Map<List<ExerciseReadByIdDTO>>(exerciseList);

            return Ok(dtoList[0]);

        }

        /// <summary>
        /// Creates a new exercise in the database.
        /// </summary>
        /// <param name="addDTO"> Contains all the information that an exercise can hold.</param>
        /// <returns>Returns the created exercise as a DTO list </returns>
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpPost]
        [Route("/exercises")]
        public async Task<ActionResult<ExerciseReadByIdDTO>> AddExercise([FromBody] ExerciseAddDTO addDTO)
        {
            Exercise exercise = _mapper.Map<Exercise>(addDTO);
            EntityEntry newEntry = _context.Exercises.Add(exercise);

            try
            {
                await _context.SaveChangesAsync();
            }

            catch
            {
                StatusCode(StatusCodes.Status500InternalServerError);
            }

            ExerciseReadByIdDTO newExercise = _mapper.Map<ExerciseReadByIdDTO>(newEntry.Entity);

            return CreatedAtAction("AddExercise", new { id = newExercise.ExerciseId }, newExercise);
        }

        /// <summary>
        /// Updates the specified exercise in the database
        /// </summary>
        /// <param name="exerciseId">Id of the exercise that is being updated</param>
        /// <param name="updatedExercise">DTO containing the new values for the exercise</param>
        /// <returns></returns>
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpPut]
        [Route("/exercise/{exercise_id}")]
        public IActionResult updateExerciseById(int exercise_id, [FromBody] ExerciseUpdateDTO dto)
        {
            if (!_context.Exercises.Any(exercise => exercise.ExerciseId == exercise_id))
            {
                return NotFound();
            }

            var newExercise = _mapper.Map<ExerciseUpdateDTO, Exercise>(dto);

            var oldExercise = _context.Exercises.Where(exercise => exercise.ExerciseId  == exercise_id).FirstOrDefault();

            try
            {
                if (dto.Description != null && dto.Description != "string")
                {
                    oldExercise.Description = dto.Description;
                }
                if (dto.Image != null && dto.Image !="string")
                {
                    oldExercise.Image = dto.Image;
                }
                if (dto.VidLink != null && dto.VidLink != "string")
                {
                    oldExercise.VidLink = dto.VidLink;
                }
                if (dto.Name != null && dto.Name != "string")
                {
                    oldExercise.Name = dto.Name;
                }
                if (dto.TargetMuscleGroup != null && dto.TargetMuscleGroup != "string")
                {
                    oldExercise.TargetMuscleGroup = dto.TargetMuscleGroup;
                }


                _context.SaveChanges();
            }
            catch
            {
                return StatusCode(500);
            }


            return Ok(oldExercise);
        }

        /// <summary>
        /// Removes the specified exercise from the database.
        /// </summary>
        /// <param name="exercise_id">Id of the exercise that is removed from the database</param>
        /// <returns>NoContent</returns>
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpDelete]
        [Route("/exercise/{exercise_id}")]
        public async Task<ActionResult> DeleteExercise([FromRoute] int exercise_id)
        {
            var exercise = await _context.Exercises.FindAsync(exercise_id);
            if (exercise == null)
            {
                return NotFound();
            }
            _context.Exercises.Remove(exercise);
            try
            {
                await _context.SaveChangesAsync();
            }

            catch
            {
                StatusCode(StatusCodes.Status500InternalServerError);
            }

            return NoContent();
        }

    }
}
