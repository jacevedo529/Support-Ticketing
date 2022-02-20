using Repository.Models.Support;

namespace Services.Models.Support
{
    public class Ticket
    {
        public int Number { get; set; }
        public string Title { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        public Guid AuthorId { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid? OwnerId { get; set; }
        public Status Status { get; set; }
        public Priority Priority { get; set; }

        public List<Post>? Posts { get; }
    }
}
