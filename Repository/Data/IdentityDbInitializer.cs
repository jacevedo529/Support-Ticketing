using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Repository.Models.Identity;

namespace Repository.Data
{
    public static class IdentityDbInitializer
    {
        public static void InitializeDatabase(IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices?.GetService<IServiceScopeFactory>()?.CreateScope();
            serviceScope?.ServiceProvider.GetRequiredService<IdentityDbContext>();

            var context = serviceScope?.ServiceProvider.GetRequiredService<IdentityDbContext>();

            if (context != null)
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                if (context.Users.Any())
                    return; // DB has been seeded

                var users = new ApplicationUser[]
                {
                    new ApplicationUser
                    {
                        Id = Guid.NewGuid(),
                        FirstName = "Test",
                        LastName = "User",
                        CreatedDate = DateTime.Now,
                        Email = "user@support.com",
                        Password = "password",
                        Role = Role.User
                    },
                    new ApplicationUser
                    {
                        Id = Guid.NewGuid(),
                        FirstName = "Test2",
                        LastName = "User2",
                        CreatedDate = DateTime.Now,
                        Email = "admin@support.com",
                        Password = "password",
                        Role= Role.Admin
                    }
                };

                context.Users.AddRange(users);
                context.SaveChanges();
            }
        }
    }
}
