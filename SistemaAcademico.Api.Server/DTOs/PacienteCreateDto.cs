using System.ComponentModel.DataAnnotations;

namespace SistemaAcademico.Api.Server.DTOs;

public class PacienteCreateDto
{
    [Required]
    public string Nome { get; set; } = string.Empty;

    [Required]
    public string Cpf { get; set; } = string.Empty;

    public string Telefone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public DateTime DataNascimento { get; set; }
}
