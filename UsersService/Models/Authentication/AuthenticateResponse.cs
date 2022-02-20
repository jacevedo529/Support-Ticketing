namespace Services.Models.Authentication
{
    public class AuthenticateResponse
    {
        public Guid UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public Token Token { get; set; }
    }
}
