using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Exceptions;
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
        [HttpPost("Login")]
        public async Task<IActionResult> Authenticate(LoginRequest request)
        {
            //LoginResponse? response = default;

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

            var response = await _authService.LoginAsync(request);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        // TODO: Handle exceptions
        [HttpPost("Register")]
        public async Task<IActionResult> CreateAccountAsync(CreateAccountRequest request)
        {
            CreateAccountResponse? response = default;

            try
            {
                response = await _authService.CreateAccountAsync(request);
            }
            catch (ApplicationException ex)
            {
                return BadRequest();
            }
            catch (DuplicateAccountException ex)
            {
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            //var response = _authService.CreateAccount(request);

            //if (response == null)
            //    return BadRequest(new { message = "Unable to create account" });

            return Ok(response);
        }


    }
}
