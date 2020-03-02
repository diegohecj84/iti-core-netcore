using EjercicioToken.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EjercicioToken.Persistence.EntityFramework
{
    public static class DbInitializer
    {
        public static void Initialize(ITICoreTemplateDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Usuarios.Any())
            {
                return;   // DB has been seeded
            }

            var user = new User
            {
                UserName = "demo123",
                Email = "example1@gmail.com",
                PhoneNumber ="66247789",
                NormalizedUserName = "DEMO123",
                PasswordHash = GetHashedPwd(),
                SecurityStamp = Guid.NewGuid().ToString()
            };

            context.Usuarios.Add(user);

            context.SaveChanges();
        }

        private static string GetHashedPwd()
        {
            return "AQAAAAEAACcQAAAAEIfFGi9vde94Gchb2MxHpL9JzkOTVXnw5ApSM8IAEH33SyMFSg1YpcecKjlf7EhPnw==";
        }
    }
}
