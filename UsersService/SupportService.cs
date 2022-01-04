using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Repository.Data;
using Repository.Models.Identity;
using Repository.Models.Support;
using Services.Interfaces;

namespace Services
{
    public class SupportService : ISupportService
    {
        private readonly IServiceProvider _serviceProvider;
        public SupportService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        SupportDbContext DbContext
        {
            get
            {
                var dbOptions = _serviceProvider.GetService<DbContextOptionsBuilder<SupportDbContext>>();
                return new SupportDbContext(dbOptions?.Options);
            }
        }

        public async Task<IEnumerable<Ticket>> GetTicketsAsync(ApplicationUser currentUser, Guid? authorId = null, Guid? ownerId = null, Status[]? status = null)
        {
            using var context = DbContext;

            // Tickets Query
            var query = context.Tickets.AsQueryable();

            // Scenarios
            // 1. CurrentUser is Admin and wants to see all tickets (currentUser = admin, authorId and ownerId are null)
            // 2. CurrentUser is Admin and wants to see their tickets (currentUser = admin, ownerId = currentUserId)
            // 2. CurrentUser is User and can only retrieve their own tickets (currentUser = user, author = currentUserId)

            if (currentUser.Role == Role.User && currentUser.Id != authorId)
                throw new InvalidOperationException();

            // Filters
            if (authorId.HasValue)
                query =  query.Where(t => t.AuthorId == authorId);
            if (ownerId.HasValue)
                query = query.Where(t => t.OwnerId == ownerId);
            if (status?.Length > 0)
                query = query.Where(t => status.Contains(t.Status));

            // Execute query and return result
            return await query.AsNoTracking().ToListAsync();
        }

        public async Task<Ticket?> GetTicketByNumberAsync(ApplicationUser currentUser, int ticketNumber)
        {
            // Scenario
            // 1. CurrentUser is Admin and wants to see this ticket details
            // 2. CurrentUser is User and is Author and wants to see their ticket details

            using var context = DbContext;

            var ticket = await context.Tickets.FirstOrDefaultAsync(t => t.Number == ticketNumber);

            return ticket;
        }
    }
}
