using EjercicioToken.Application.Authentication.Dtos;
using EjercicioToken.Application.Authentication.Services.Interfaces;
using EjercicioToken.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace EjercicioToken.Application.Authentication.Services.Implementations
{
    public class LoginService : ILoginService
    {
        private readonly UserManager<User> _userManager;

        private IConfiguration Config { get; set; }


        public LoginService(UserManager<User> userManager, IConfiguration config)
        {
            this._userManager = userManager;
            this.Config = config;
        }
        public async Task<LoginResultDto> IniciarSesion(LoginDto dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException("dto");
            }

            var user = await _userManager.FindByNameAsync(dto.UserName);

            if (user == null)
            {
                return new LoginResultDto() { Success = false, Message = "Usuario o contraseña incorrecto" };
            }

            if (!await _userManager.CheckPasswordAsync(user, dto.Pwd))
            {
                return new LoginResultDto() { Success = false, Message = "Usuario o contraseña incorrecto" };
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


            List<Claim> claims = new List<Claim>() {
                        new Claim(ClaimTypes.NameIdentifier, user.NormalizedUserName),
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim("PhoneNumber", user.PhoneNumber)
                    };

            var roles = await _userManager.GetRolesAsync(user);

            foreach (var rol in roles)
            {

                claims.Add(new Claim(ClaimTypes.Role, rol));

            }

            JwtSecurityToken token = new JwtSecurityToken(Config["Jwt:Issuer"],
              Config["Jwt:Issuer"], claims.ToArray(),
              expires: DateTime.Now.AddMinutes(30),
              signingCredentials: creds);

            string encodedJwt = new JwtSecurityTokenHandler().WriteToken(token);

            return new LoginResultDto() { Success = true, Token = encodedJwt };

        }
    }
}
