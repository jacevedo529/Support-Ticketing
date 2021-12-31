namespace Repository.Models.Support;

public class Ticket
{
    public Guid Id { get; set; }
    public int Number { get; set; }
    public string Title { get; set; } = String.Empty;
    public string Description { get; set; } = String.Empty;
    public Guid CreatedById { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid? OwnerId { get; set; }
    public Status Status { get; set; }
    public Priority Priority { get; set; }

    public List<Post>? Posts { get; }

}
