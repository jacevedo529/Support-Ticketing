using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Repository.Data;
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

        public async Task<IEnumerable<Ticket>> GetTicketsAsync(Guid? authorId, Guid? ownerId = null, Status? status = null)
        {
            using var context = DbContext;

            // Tickets Query
            var query = context.Tickets.AsQueryable();

            // Filters
            if (authorId.HasValue)
                query =  query.Where(t => t.AuthorId == authorId);
            if (ownerId.HasValue)
                query = query.Where(t => t.OwnerId == ownerId);
            if (status.HasValue)
                query = query.Where(t => t.Status == status);

            // Execute query and return result
            return await query.AsNoTracking().ToListAsync();
        }

        public async Task<Ticket?> GetTicketByNumberAsync(int ticketNumber)
        {
            using var context = DbContext;

            var ticket = await context.Tickets.FirstOrDefaultAsync(t => t.Number == ticketNumber);

            return ticket;
        }
    }
}
