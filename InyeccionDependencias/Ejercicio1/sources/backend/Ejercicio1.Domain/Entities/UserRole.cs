using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ejercicio1.Domain.Entities
{
    public class UserRole : IdentityUserRole<int>
    {
        public int Id { get; set; }

        public User User { get; set; }

        public Role Role { get; set; }

    }
}
