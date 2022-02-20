﻿using System.ComponentModel.DataAnnotations;

namespace Services.Models.Authentication
{
    public class CreateAccountRequest
    {
        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string FirstName { get; set; }
        
        [Required]

        public string LastName { get; set; }
    }
}