using EjercicioToken.Application.Authentication.Dtos;
using ITI.Core.Dependency.LifeTimes;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EjercicioToken.Application.Authentication.Services.Interfaces
{
    public interface ILoginService : ITransientDependency
    {
        Task<LoginResultDto> IniciarSesion(LoginDto dto);
    }
}
