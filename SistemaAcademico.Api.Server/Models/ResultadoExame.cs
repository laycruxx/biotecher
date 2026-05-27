namespace SistemaAcademico.Api.Server.Models;

public class ResultadoExame
{
    public int Id { get; set; }
    public string Observacao { get; set; } = string.Empty;
    public string ArquivoResultado { get; set; } = string.Empty;
    public DateTime DataLiberacao { get; set; } = DateTime.UtcNow;

    public int SolicitacaoExameId { get; set; }
    public SolicitacaoExame? SolicitacaoExame { get; set; }
}
