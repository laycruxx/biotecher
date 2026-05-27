using System.ComponentModel.DataAnnotations;

namespace SistemaAcademico.Api.Server.DTOs;

public class RegisterRequest
{
    [Required]
    public string Username { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;

    public string Role { get; set; } = "Admin";
}
