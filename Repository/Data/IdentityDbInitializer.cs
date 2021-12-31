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
                        FirstName = "Jose",
                        LastName = "Acevedo",
                        CreatedDate = DateTime.Now,
                        Username = "Admin",
                        Email = "test@test.com",
                        Password = "Password"
                    }
                };

                context.Users.AddRange(users);
                context.SaveChanges();
            }
        }
    }
}
