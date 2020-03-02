using ITI.Core.Authorization;
using ITI.Core.Startup;
using Ejercicio1.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using Ejercicio1.Application.Services.Interfaces;
using Ejercicio1.Application.Services.Implementations;

namespace Ejercicio1.Application.Identity
{
    public class IdentityRegistrar : IRegistrar
    {
        public void RegisterComponents(IServiceCollection services, IAssembliesProvider assembliesProvider)
        {
            services.AddScoped<IUserStore<User>, UserStore>();
            services.AddScoped<IRoleStore<Role>, RoleStore>();

            services.AddIdentityCore<User>().AddRoles<Role>().AddErrorDescriber<MultilanguageIdentityErrorDescriber>();
            services.AddScoped<IAuthorizationProvider, NullAuthorizationProvider>();

            services.AddSingleton<IEjercicioService, Ejercicio5En5Service>();
        }
    }
}
