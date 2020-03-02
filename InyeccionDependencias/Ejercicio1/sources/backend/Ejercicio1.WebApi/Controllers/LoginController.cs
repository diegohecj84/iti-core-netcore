using Ejercicio1.Application.Authentication.Dtos;
using Ejercicio1.Application.Authentication.Services.Interfaces;
using Ejercicio1.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Ejercicio1.Api.Controllers
{
    /// <summary>
    /// Api para iniciar sesión en la aplicación
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class LoginController : ControllerBase
    {
        private IEjercicioService Service { get; set; }
        private ILoginService Loginservice { get; set; }

        /// <summary>
        /// Constructor 
        /// </summary>
        /// <param name="loginService"></param>
        public LoginController(ILoginService loginService, IEjercicioService service)
        {
            this.Service = service;
            this.Loginservice = loginService;
        }

        /// <summary>
        /// Valida las credenciales del usuario y genera un token.
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<LoginResultDto> Post([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
            {
                throw new InvalidOperationException();
            }

            return await this.Loginservice.IniciarSesion(dto);

        }

        [HttpGet]
        public async Task<int> Get()
        {
            return await this.Service.ObtenerValor();
        }

        [HttpPut]
        public async Task<int> Put()
        {
            return await this.Service.IncrementarValor();
        }
    }
}