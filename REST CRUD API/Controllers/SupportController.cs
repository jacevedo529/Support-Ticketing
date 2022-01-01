using Microsoft.AspNetCore.Mvc;
using Repository.Models.Support;
using Services.Interfaces;

namespace REST_CRUD_API.Controllers
{
    [Route("[controller]")]
    public class SupportController : ApiControllerBase
    {
        private readonly ISupportService _supportService;

        public SupportController(ISupportService supportService)
        {
            _supportService = supportService;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<IEnumerable<Ticket>> Get([FromQuery] Guid authorId, [FromQuery] Guid? owner, [FromQuery] Status? status)
        {
            var tickets = await _supportService.GetTicketsAsync(authorId, owner, status);
            return tickets;
        }

        // GET api/<ValuesController>/5
        [HttpGet("{number}")]
        public async Task<Ticket> Get(int number)
        {
            var ticket = await _supportService.GetTicketByNumberAsync(number);
            return ticket;
        }

        // POST api/<ValuesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

    }
}
