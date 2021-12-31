using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Services.Models;

namespace REST_CRUD_API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : ApiControllerBase
    {
        private readonly IAuthenticationService _authService;

        public AuthController(IAuthenticationService authenticationService)
        {
            _authService = authenticationService;
        }

        // TODO: Handle exceptions
        [HttpPost]
        public IActionResult Authenticate(LoginRequest request)
        {
            LoginResponse? response = default;

            //try
            //{
            //    response = _authService.Login(request);
            //}
            //catch (AuthenticationException ex)
            //{

            //}
            //catch (Exception ex)
            //{

            //    throw;
            //}

            response = _authService.Login(request);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }


    }
}
