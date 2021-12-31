using Repository.Models.Support;

namespace Services.Interfaces
{
    public interface ISupportService
    {
        Task<IEnumerable<Ticket>> GetTicketsAsync(Guid? authorId, Guid? owner = null, Status? status = null);
        Task<Ticket?> GetTicketByNumberAsync(int ticketNumber);
    }
}
