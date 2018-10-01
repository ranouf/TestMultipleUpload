using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TestMultipleUpload.Api.Controllers.Dtos
{
    public class ParentDto
    {
        [Required]
        public string Name { get; set; }
        public IEnumerable<IFormFile> Files { get; set; }
        public IEnumerable<ChildDto> Children { get; set; }
    }

    public class ChildDto
    {
        [Required]
        public string Name { get; set; }
        public IEnumerable<IFormFile> Files { get; set; }
    }
}
