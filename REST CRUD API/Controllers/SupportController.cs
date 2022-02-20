using Microsoft.AspNetCore.Mvc;
using REST_API.Helpers;
using Services.Interfaces;
using Services.Models.Support;
using static Services.Models.Support.Enums;

namespace REST_API.Controllers
{
    [Authorize]
    [Route("api/v1/me/[controller]")]
    public class SupportController : ApiControllerBase
    {
        private readonly ISupportService _supportService;

        public SupportController(ISupportService supportService)
        {
            _supportService = supportService;
        }

        [HttpGet]
        public async Task<IEnumerable<Ticket>> Get([FromQuery] Guid? authorId = null, [FromQuery] Guid? ownerId = null, [FromQuery] Status[]? status = null)
        {
            var tickets = await _supportService.GetTicketsAsync(CurrentUser, authorId, ownerId, status);
            return tickets;
        }

        [HttpGet("{number}")]
        public async Task<Ticket> Get(int number)
        {
            var ticket = await _supportService.GetTicketByNumberAsync(CurrentUser, number);
            return ticket;
        }

        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

    }
}
