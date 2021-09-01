using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Controllers
{
    [ApiController]
    [Route("test")]
    public class TestController : ControllerBase
    {
        private readonly ILogger<TestController> _logger;

        public TestController(ILogger<TestController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public String Get()
        {
            var rng = new Random();
            return "Something from the API server: " + rng.Next();
        }
    }
}
