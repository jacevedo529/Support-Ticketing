using Repository.Models.Support;

namespace Repository
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Text { get; set; } = default!;
        public Guid CreatedById { get; set; }
        public DateTime CreatedDate { get; set; }

        public Ticket Ticket { get; set; } = new Ticket();
    }
}