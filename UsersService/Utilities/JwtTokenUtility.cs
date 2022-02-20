using IdentityModel;
using Microsoft.IdentityModel.Tokens;
using Repository.Models.Identity;
using Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Services.Utilities
{
    public class JwtTokenUtility : IJwtTokenUtility
    {
        public string GenerateJwtToken(ApplicationUser user)
        {
            // generate token that is valid for 30 mins
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Constants.TOKEN_SECRET);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] 
                {   
                    new Claim(JwtClaimTypes.Id, user.Id.ToString()),
                    new Claim(JwtClaimTypes.Role, user.Role.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}