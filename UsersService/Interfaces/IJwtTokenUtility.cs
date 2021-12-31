using Repository.Models.Identity;

namespace Services.Interfaces
{
    public interface IJwtTokenUtility
    {
        string GenerateJwtToken(ApplicationUser user);
    }
}
