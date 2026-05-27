using System.ComponentModel.DataAnnotations;

namespace SistemaAcademico.Api.Server.DTOs;

public class StatusUpdateDto
{
    [Required]
    public string Status { get; set; } = string.Empty;
}