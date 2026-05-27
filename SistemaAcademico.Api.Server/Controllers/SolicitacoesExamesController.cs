using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaAcademico.Api.Server.Data;
using SistemaAcademico.Api.Server.DTOs;
using SistemaAcademico.Api.Server.Models;
using SistemaAcademico.Api.Server.Repositories;

namespace SistemaAcademico.Api.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SolicitacoesExamesController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IRepository<SolicitacaoExame> _solicitacoes;
    private readonly IRepository<Paciente> _pacientes;
    private readonly IRepository<Exame> _exames;

    public SolicitacoesExamesController(
        AppDbContext context,
        IRepository<SolicitacaoExame> solicitacoes,
        IRepository<Paciente> pacientes,
        IRepository<Exame> exames)
    {
        _context = context;
        _solicitacoes = solicitacoes;
        _pacientes = pacientes;
        _exames = exames;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var solicitacoes = await _context.SolicitacoesExames
            .Include(s => s.Paciente)
            .Include(s => s.Exame)
            .OrderByDescending(s => s.DataSolicitacao)
            .Select(s => new
            {
                s.Id,
                s.Protocolo,
                s.MedicoSolicitante,
                s.Status,
                s.DataSolicitacao,
                s.PacienteId,
                PacienteNome = s.Paciente != null ? s.Paciente.Nome : "Paciente não informado",
                s.ExameId,
                ExameNome = s.Exame != null ? s.Exame.Nome : "Exame não informado",
                ExameCategoria = s.Exame != null ? s.Exame.Categoria : "Sem categoria"
            })
            .ToListAsync();

        return Ok(solicitacoes);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var solicitacao = await _context.SolicitacoesExames
            .Include(s => s.Paciente)
            .Include(s => s.Exame)
            .Where(s => s.Id == id)
            .Select(s => new
            {
                s.Id,
                s.Protocolo,
                s.MedicoSolicitante,
                s.Status,
                s.DataSolicitacao,
                s.PacienteId,
                PacienteNome = s.Paciente != null ? s.Paciente.Nome : "Paciente não informado",
                s.ExameId,
                ExameNome = s.Exame != null ? s.Exame.Nome : "Exame não informado",
                ExameCategoria = s.Exame != null ? s.Exame.Categoria : "Sem categoria"
            })
            .FirstOrDefaultAsync();

        return solicitacao is null ? NotFound(new { mensagem = "Solicitação não encontrada" }) : Ok(solicitacao);
    }

    [HttpPost]
    public async Task<IActionResult> Create(SolicitacaoExameCreateDto dto)
    {
        var paciente = await _pacientes.GetByIdAsync(dto.PacienteId);
        if (paciente is null)
            return NotFound(new { mensagem = "Paciente não encontrado" });

        var exame = await _exames.GetByIdAsync(dto.ExameId);
        if (exame is null)
            return NotFound(new { mensagem = "Exame não encontrado" });

        var solicitacao = new SolicitacaoExame
        {
            Protocolo = dto.Protocolo,
            MedicoSolicitante = dto.MedicoSolicitante,
            Status = dto.Status,
            PacienteId = dto.PacienteId,
            ExameId = dto.ExameId,
            DataSolicitacao = DateTime.UtcNow
        };

        await _solicitacoes.AddAsync(solicitacao);
        await _solicitacoes.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = solicitacao.Id }, new
        {
            solicitacao.Id,
            solicitacao.Protocolo,
            solicitacao.MedicoSolicitante,
            solicitacao.Status,
            solicitacao.DataSolicitacao,
            solicitacao.PacienteId,
            PacienteNome = paciente.Nome,
            solicitacao.ExameId,
            ExameNome = exame.Nome,
            ExameCategoria = exame.Categoria
        });
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] StatusUpdateDto dto)
    {
        var solicitacao = await _solicitacoes.GetByIdAsync(id);
        if (solicitacao is null)
            return NotFound(new { mensagem = "Solicitação não encontrada" });

        solicitacao.Status = dto.Status;
        _solicitacoes.Update(solicitacao);
        await _solicitacoes.SaveChangesAsync();

        return Ok(new { mensagem = "Status atualizado", solicitacao.Id, solicitacao.Status });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var solicitacao = await _solicitacoes.GetByIdAsync(id);
        if (solicitacao is null)
            return NotFound(new { mensagem = "Solicitação não encontrada" });

        _solicitacoes.Delete(solicitacao);
        await _solicitacoes.SaveChangesAsync();

        return NoContent();
    }
}