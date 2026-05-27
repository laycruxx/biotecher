using System.ComponentModel.DataAnnotations;

namespace SistemaAcademico.Api.Server.DTOs;

public class ExameCreateDto
{
    [Required]
    public string Nome { get; set; } = string.Empty;

    public string Categoria { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public string Preparo { get; set; } = string.Empty;
}
