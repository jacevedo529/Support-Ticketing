using Services.Models.Authentication;
using Services.Models.Identity;

namespace Services.Interfaces
{
    public interface IAuthenticationService
    {
        Task<ApplicationUser> GetApplicationUserByIdAsync(Guid id);
        Task<AuthenticateResponse> AuthenticateAsync(AuthenticateRequest request);
        Task<CreateAccountResponse> CreateAccountAsync(CreateAccountRequest request);
    }
}
