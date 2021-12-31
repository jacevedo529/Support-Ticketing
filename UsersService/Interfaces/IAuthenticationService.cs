using Services.Models;

namespace Services.Interfaces
{
    public interface IAuthenticationService
    {
        LoginResponse Login(LoginRequest request);
        bool Logout(LogoutRequest request);
    }
}
