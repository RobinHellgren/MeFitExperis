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

namespace MeFitAPI.Controllers
{
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
        [HttpGet]
        public IActionResult GetGoals ()
        {
            StringValues tokenBase64;
            HttpContext.Request.Headers.TryGetValue("Authorization",out tokenBase64);
            var jwt = tokenBase64.ToArray()[0].Split(" ")[1];

            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(jwt);
            var tokenS = jsonToken as JwtSecurityToken;

            var userID = tokenS.Claims.ToArray()[17].Value;

            IEnumerable<Models.Goal> goals = _meFitContext.Goals
                .Include(goal => goal.Profile)
                .Include(goal => goal.Program)
                .Include(goal => goal.GoalWorkouts)
                .Where(goal => goal.Profile.UserId == userID && goal.Completed == false);

            IEnumerable<Models.DTO.GoalDTO.UserProfileGoalDTO> goalsDTO = goals
                .Select(goal => _mapper.Map<Models.Goal, Models.DTO.GoalDTO.UserProfileGoalDTO>(goal));
            
            return Ok(goalsDTO);
        }
    }
}
