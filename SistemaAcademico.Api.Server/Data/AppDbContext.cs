using Microsoft.EntityFrameworkCore;
using SistemaAcademico.Api.Server.Models;

namespace SistemaAcademico.Api.Server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Usuario> Usuarios => Set<Usuario>();
    public DbSet<Paciente> Pacientes => Set<Paciente>();
    public DbSet<Exame> Exames => Set<Exame>();
    public DbSet<SolicitacaoExame> SolicitacoesExames => Set<SolicitacaoExame>();
    public DbSet<ResultadoExame> ResultadosExames => Set<ResultadoExame>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Paciente>()
            .HasIndex(p => p.Cpf)
            .IsUnique();

        modelBuilder.Entity<Paciente>()
            .HasMany(p => p.Solicitacoes)
            .WithOne(s => s.Paciente)
            .HasForeignKey(s => s.PacienteId);

        modelBuilder.Entity<Exame>()
            .HasMany(e => e.Solicitacoes)
            .WithOne(s => s.Exame)
            .HasForeignKey(s => s.ExameId);

        modelBuilder.Entity<SolicitacaoExame>()
            .HasIndex(s => s.Protocolo)
            .IsUnique();

        modelBuilder.Entity<SolicitacaoExame>()
            .HasOne(s => s.Resultado)
            .WithOne(r => r.SolicitacaoExame)
            .HasForeignKey<ResultadoExame>(r => r.SolicitacaoExameId);
    }
}
