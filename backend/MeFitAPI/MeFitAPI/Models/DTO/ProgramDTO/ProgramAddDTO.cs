using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeFitAPI.Models.DTO.ProgramDTO
{
    public class ProgramAddDTO
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public int? ProgramLevel { get; set; }

    }
}
