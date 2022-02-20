using Services.Models.Identity;
using Services.Models.Support;

namespace Services.Interfaces
{
    public interface ISupportService
    {
        Task<IEnumerable<Ticket>> GetTicketsAsync(ApplicationUser currentUser, Guid? authorId, Guid? owner = null, Status[]? status = null);
        Task<Ticket?> GetTicketByNumberAsync(ApplicationUser currentUser, int ticketNumber);
    }
}
