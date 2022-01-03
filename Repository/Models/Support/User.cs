namespace Repository.Models.Support
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public Role Role { get; set; } = Role.User;
    }
}
