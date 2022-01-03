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
                        Email = "test@test.com",
                        Password = "password"
                    },
                    new ApplicationUser
                    {
                        Id = Guid.NewGuid(),
                        FirstName = "Test2",
                        LastName = "User2",
                        CreatedDate = DateTime.Now,
                        Email = "test2@test.com",
                        Password = "password"
                    }
                };

                context.Users.AddRange(users);
                context.SaveChanges();
            }
        }
    }
}
