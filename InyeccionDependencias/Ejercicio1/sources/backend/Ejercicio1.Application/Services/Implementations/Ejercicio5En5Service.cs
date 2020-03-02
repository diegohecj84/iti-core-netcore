using Ejercicio1.Application.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Ejercicio1.Application.Services.Implementations
{
    public class Ejercicio5En5Service : IEjercicioService
    {
        private int valor;

        public async Task<int> IncrementarValor()
        {
            valor = valor + 5;

            return await Task.FromResult(valor);
        }

        public async Task<int> ObtenerValor()
        {
            return await Task.FromResult(valor);
        }
    }
}
