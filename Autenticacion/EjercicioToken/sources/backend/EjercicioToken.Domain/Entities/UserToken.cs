﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace EjercicioToken.Domain.Entities
{
    public class UserToken : IdentityUserToken<int>
    {
        public int Id { get; set; }

    }
}
