using AutoMapper;
using Services.Models.Identity;

namespace Services.Mappings
{
    public class AuthenticationMapper: Profile
    {
        public AuthenticationMapper()
        {
            CreateMap<Repository.Models.Identity.ApplicationUser, ApplicationUser>();
            CreateMap<ApplicationUser, Repository.Models.Identity.ApplicationUser>();
        }
    }
}
