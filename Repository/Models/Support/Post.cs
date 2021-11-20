using Repository.Models.Support;

namespace Repository
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Text { get; set; } = default!;
        public Ticket Ticket { get; } = new Ticket();
    }
}