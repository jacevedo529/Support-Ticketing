using Microsoft.AspNetCore.Mvc;
using Repository.Models.Support;

namespace REST_CRUD_API.Controllers
{
    [Route("[controller]")]
    public class SupportController : ApiControllerBase
    {
        [HttpGet]
        public Ticket Get(string id)
        {
            var ticket = new Ticket()
            {
                Title = "test",
                Description = "test"
            };

            return ticket;
        }

        [HttpPost] 
        public Ticket Post(Ticket ticket)
        {
            //Ticket ticket = new Ticket()
            //{
            //    Id = ticket.Id
            //};

            return ticket;
        }

    }
}
