using Microsoft.AspNetCore.Mvc;
using Repository.Models.Identity;

namespace REST_API.Controllers
{
    [ApiController]
    public abstract class ApiControllerBase : ControllerBase
    {
        public ApplicationUser CurrentUser => (ApplicationUser)HttpContext.Items["User"];
    }
}
