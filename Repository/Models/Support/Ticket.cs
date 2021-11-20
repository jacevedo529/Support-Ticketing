namespace Repository.Models.Support
{
    public class Ticket
    {
        public Guid Id { get; set; }
        public string Number { get; set; } = String.Empty;
        public string Title { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        public string CreatedBy { get; set; } = String.Empty;
        public DateTime CreatedDate { get; set; }
        public string Owner { get; set; } = String.Empty; // TODO: Create user type 
        public Status Status { get; set; }
        public Priority Priority { get; set; }

        public List<Post> Posts { get; } = new List<Post>();

    }
}
