using System.ComponentModel.DataAnnotations;

namespace SistemaAcademico.Api.Server.DTOs;

public class ResultadoExameCreateDto
{
    [Required]
    public string Observacao { get; set; } = string.Empty;

    public string ArquivoResultado { get; set; } = string.Empty;
    public int SolicitacaoExameId { get; set; }
}
