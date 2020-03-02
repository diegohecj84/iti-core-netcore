using System;
using System.Collections.Generic;
using System.Text;

namespace EjercicioToken.Application.Authentication.Dtos
{
    public class LoginResultDto
    {
        public bool  Success { get; set; }

        public string Message { get; set; }

        public string Token { get; set; }


    }
}
