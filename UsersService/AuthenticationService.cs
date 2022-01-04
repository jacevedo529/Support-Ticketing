using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Repository.Data;
using Repository.Models.Identity;
using Services.Exceptions;
using Services.Interfaces;
using Services.Models;

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

        public async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            using var context = DbContext;
            
            // Verify User exists
            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == request.Email && u.Password == request.Password);
            if (user == null) throw new AccountNotFoundException($"Could not find the user {request.Email}");

            // Generate jwt token
            var token = _jwtTokenUtility.GenerateJwtToken(user);

            return new LoginResponse()
            {
                UserId = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = new Token()
                {
                    Value = token,
                    ExpiresIn = 30 // TODO: Use config
                }
            };
        }

        public async Task<CreateAccountResponse> CreateAccountAsync(CreateAccountRequest request)
        {
            using var context = DbContext;

            // Verify User doesn't already exist with email and return exception
            var user = await GetApplicationUserByEmailAsync(request.Email);

            if (user != null)
                throw new DuplicateAccountException($"Account with email {request.Email} already exists");

            // Create the User
            var newUser = new ApplicationUser
            {
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Password = request.Password //TODO: HASH
            };
            
            // Add User to DB
            context.Users.Add(newUser);
            await context.SaveChangesAsync();

            // Verify user has been added
            var appUser = await GetApplicationUserByEmailAsync(request.Email);

            if (appUser == null)
                throw new ApplicationException($"Unable to create an account with email: {request.Email}");

            return new CreateAccountResponse()
            {
                Email = appUser.Email
            };
        }

        public async Task<ApplicationUser> GetApplicationUserByEmailAsync(string email)
        {
            var context = DbContext;
            return await context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<ApplicationUser> GetApplicationUserByIdAsync(Guid id)
        {
            var context = DbContext;
            return await context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}
