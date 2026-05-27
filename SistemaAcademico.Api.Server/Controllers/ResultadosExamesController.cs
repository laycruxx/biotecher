using Microsoft.AspNetCore.Mvc;
using SistemaAcademico.Api.Server.DTOs;
using SistemaAcademico.Api.Server.Models;
using SistemaAcademico.Api.Server.Repositories;

namespace SistemaAcademico.Api.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResultadosExamesController : ControllerBase
{
    private readonly IRepository<ResultadoExame> _resultados;
    private readonly IRepository<SolicitacaoExame> _solicitacoes;

    public ResultadosExamesController(
        IRepository<ResultadoExame> resultados,
        IRepository<SolicitacaoExame> solicitacoes)
    {
        _resultados = resultados;
        _solicitacoes = solicitacoes;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _resultados.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var resultado = await _resultados.GetByIdAsync(id);
        return resultado is null ? NotFound(new { mensagem = "Resultado nao encontrado" }) : Ok(resultado);
    }

    [HttpPost]
    public async Task<IActionResult> Create(ResultadoExameCreateDto dto)
    {
        var solicitacao = await _solicitacoes.GetByIdAsync(dto.SolicitacaoExameId);
        if (solicitacao is null)
            return NotFound(new { mensagem = "Solicitacao nao encontrada" });

        var resultado = new ResultadoExame
        {
            Observacao = dto.Observacao,
            ArquivoResultado = dto.ArquivoResultado,
            SolicitacaoExameId = dto.SolicitacaoExameId,
            DataLiberacao = DateTime.UtcNow
        };

        solicitacao.Status = "Resultado liberado";
        _solicitacoes.Update(solicitacao);

        await _resultados.AddAsync(resultado);
        await _resultados.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = resultado.Id }, resultado);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var resultado = await _resultados.GetByIdAsync(id);
        if (resultado is null)
            return NotFound(new { mensagem = "Resultado nao encontrado" });

        _resultados.Delete(resultado);
        await _resultados.SaveChangesAsync();

        return NoContent();
    }
}
