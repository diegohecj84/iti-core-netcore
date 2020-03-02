using Ejercicio1.Application.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Ejercicio1.Application.Services.Implementations
{
    public class EjercicioService : IEjercicioService
    {
        private int valor;

        public async Task<int> IncrementarValor()
        {
            valor = valor + 1;

            return await Task.FromResult(valor);
        }

        public async Task<int> ObtenerValor()
        {
            return await Task.FromResult(valor);
        }
    }
}
