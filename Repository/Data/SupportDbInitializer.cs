using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Repository.Models.Support;

namespace Repository.Data
{
    public static class SupportDbInitializer
    {
        public static void InitializeDatabase(IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices?.GetService<IServiceScopeFactory>()?.CreateScope();
            serviceScope?.ServiceProvider.GetRequiredService<SupportDbContext>();

            var context = serviceScope?.ServiceProvider.GetRequiredService<SupportDbContext>();

            if (context != null)
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                if (context.Tickets.Any())
                    return; // DB has been seeded

                var users = new User[]
                {
                    new User
                    {
                        Email = "test@test.com",
                        FirstName = "Test",
                        LastName = "User",
                        Role = Role.User
                    },
                    new User
                    {
                        Email = "test2@test.com",
                        FirstName = "Test",
                        LastName = "User",
                        Role = Role.User
                    },
                };

                context.AddRange(users);
                context.SaveChanges();

                var tickets = new Ticket[]
                {
                    new Ticket
                    {
                        Title = "Example Ticket",
                        Description = "This is the first ticket",
                        AuthorId = users.First().Id,
                        Status = Status.New,
                        Priority = Priority.Medium
                    },
                    new Ticket
                    {
                        Title = "Example Ticket with Post",
                        Description = "This is the second ticket with Posts",
                        AuthorId = users.First().Id,
                        OwnerId = users.First().Id,
                        Status = Status.New,
                        Priority = Priority.Medium
                    }
                };

                context.AddRange(tickets);
                context.SaveChanges();

                var posts = new Post[]
                {
                    new Post
                    {
                        Text = "First Post",
                        CreatedDate = DateTime.Now,
                        AuthorId = users.First().Id,
                        Ticket = tickets.Single(t => t.Number == 2)
                    }
                };

                context.AddRange(posts);
                context.SaveChanges();
            }
        }
    }
}
