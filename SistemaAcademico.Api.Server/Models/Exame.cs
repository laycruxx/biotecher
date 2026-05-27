namespace SistemaAcademico.Api.Server.Models;

public class Exame
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Categoria { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public string Preparo { get; set; } = string.Empty;

    public ICollection<SolicitacaoExame> Solicitacoes { get; set; } = new List<SolicitacaoExame>();
}
