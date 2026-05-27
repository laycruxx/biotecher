namespace SistemaAcademico.Api.Server.Models;

public class SolicitacaoExame
{
    public int Id { get; set; }
    public string Protocolo { get; set; } = string.Empty;
    public string MedicoSolicitante { get; set; } = string.Empty;
    public string Status { get; set; } = "Solicitado";
    public DateTime DataSolicitacao { get; set; } = DateTime.UtcNow;

    public int PacienteId { get; set; }
    public Paciente? Paciente { get; set; }

    public int ExameId { get; set; }
    public Exame? Exame { get; set; }

    public ResultadoExame? Resultado { get; set; }
}
