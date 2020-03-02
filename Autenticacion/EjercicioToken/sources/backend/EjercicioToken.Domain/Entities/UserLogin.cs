using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace EjercicioToken.Domain.Entities
{
    public class UserLogin : IdentityUserLogin<int>
    {
        public int Id { get; set; }

    }
}
