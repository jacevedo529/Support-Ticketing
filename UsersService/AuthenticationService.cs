using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Repository.Data;
using Services.Interfaces;
using Services.Models;
using System.Security.Authentication;

namespace Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IJwtTokenUtility _jwtTokenUtility;

        public AuthenticationService(IJwtTokenUtility jwtTokenUtility, IServiceProvider serviceProvider)
        {
            _jwtTokenUtility = jwtTokenUtility;
            _serviceProvider = serviceProvider;
        }

        IdentityDbContext DbContext
        {
            get
            {
                var dbOptions = _serviceProvider.GetService<DbContextOptionsBuilder<IdentityDbContext>>();
                return new IdentityDbContext(dbOptions?.Options);
            }
        }

        public LoginResponse Login(LoginRequest request)
        {
            using var context = DbContext;
            
            // Verify User exists
            var user = context.Users.FirstOrDefault(u => u.Username == request.Username && u.Password == request.Password);
            if (user == null) throw new AuthenticationException($"Could not find the user {request.Username}");

            // Generate jwt token
            var token = _jwtTokenUtility.GenerateJwtToken(user);

            return new LoginResponse()
            {
                Username = request.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Id = user.Id,
                Token = token
            };
        }

        public bool Logout(LogoutRequest request)
        {
            throw new NotImplementedException();
        }


    }
}
