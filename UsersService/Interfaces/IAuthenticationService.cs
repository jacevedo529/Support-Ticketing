using Repository.Models.Identity;
using Services.Models;

namespace Services.Interfaces
{
    public interface IAuthenticationService
    {
        Task<ApplicationUser> GetApplicationUserByIdAsync(Guid id);
        Task<LoginResponse> LoginAsync(LoginRequest request);
        Task<CreateAccountResponse> CreateAccountAsync(CreateAccountRequest request);
    }
}
