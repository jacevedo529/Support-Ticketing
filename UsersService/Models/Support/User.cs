namespace Services.Models.Support
{
    public class User
    {
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
