using Services.Models;

namespace Services.Interfaces
{
    public interface IAuthenticationService
    {
        Task<LoginResponse> LoginAsync(LoginRequest request);
        Task<CreateAccountResponse> CreateAccountAsync(CreateAccountRequest request);
    }
}
