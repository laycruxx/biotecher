using System.ComponentModel.DataAnnotations;

namespace SistemaAcademico.Api.Server.DTOs;

public class SolicitacaoExameCreateDto
{
    [Required]
    public string Protocolo { get; set; } = string.Empty;

    [Required]
    public string MedicoSolicitante { get; set; } = string.Empty;

    public string Status { get; set; } = "Solicitado";
    public int PacienteId { get; set; }
    public int ExameId { get; set; }
}
