using ITI.Core.Dependency.LifeTimes;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Ejercicio1.Application.Services.Interfaces
{
    public interface IEjercicioService : ISingletonDependency
    {
        Task<int> ObtenerValor();

        Task<int> IncrementarValor();

    }
}
