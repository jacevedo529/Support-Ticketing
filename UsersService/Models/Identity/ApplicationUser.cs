namespace Services.Models.Identity
{
    public class ApplicationUser
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime LastLoginDate { get; set; }
        public Role Role { get; set; } = Role.User;
    }
}
