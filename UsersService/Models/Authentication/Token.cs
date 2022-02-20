namespace Services.Models.Authentication
{
    public class Token
    {
        public string Value { get; set; }
        public int ExpiresInMins { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
