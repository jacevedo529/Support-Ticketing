using AutoMapper;
using Services.Models.Support;

namespace Services.Mappings
{
    public class SupportMapper : Profile
    {
        public SupportMapper()
        {
            CreateMap<Repository.Models.Support.Ticket, Ticket>();
            CreateMap<Repository.Models.Support.User, User>();
        }
    }
}
