using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using TestMultipleUpload.Api.Controllers.Dtos;

namespace TestMultipleUpload.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FamilyController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // POST api/values
        [HttpPost]
        [ProducesResponseType(typeof(ParentDto), (int)HttpStatusCode.OK)]
        public IActionResult Post(ParentDto dto)
        {
            Console.Write("Parent Name:" + dto.Name);
            if (dto.Files != null)
            {
                Console.Write("Parent files:" + dto.Files.Count());
            }
            if (dto.Children != null && dto.Children.Any())
                foreach (var child in dto.Children)
                {
                    Console.Write("Child Name:" + child.Name);
                    if (child.Files != null)
                    {
                        Console.Write("Child files:" + child.Files.Count());
                    }
                }
            return new ObjectResult(dto);
        }
    }
}
