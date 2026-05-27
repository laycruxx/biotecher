using Microsoft.AspNetCore.Mvc;
using SistemaAcademico.Api.Server.DTOs;
using SistemaAcademico.Api.Server.Models;
using SistemaAcademico.Api.Server.Repositories;

namespace SistemaAcademico.Api.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExamesController : ControllerBase
{
    private readonly IRepository<Exame> _exames;

    public ExamesController(IRepository<Exame> exames)
    {
        _exames = exames;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _exames.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var exame = await _exames.GetByIdAsync(id);
        return exame is null ? NotFound(new { mensagem = "Exame nao encontrado" }) : Ok(exame);
    }

    [HttpPost]
    public async Task<IActionResult> Create(ExameCreateDto dto)
    {
        var exame = new Exame
        {
            Nome = dto.Nome,
            Categoria = dto.Categoria,
            Descricao = dto.Descricao,
            Preparo = dto.Preparo
        };

        await _exames.AddAsync(exame);
        await _exames.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = exame.Id }, exame);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, ExameCreateDto dto)
    {
        var exame = await _exames.GetByIdAsync(id);
        if (exame is null)
            return NotFound(new { mensagem = "Exame nao encontrado" });

        exame.Nome = dto.Nome;
        exame.Categoria = dto.Categoria;
        exame.Descricao = dto.Descricao;
        exame.Preparo = dto.Preparo;

        _exames.Update(exame);
        await _exames.SaveChangesAsync();

        return Ok(new { mensagem = "Exame atualizado" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var exame = await _exames.GetByIdAsync(id);
        if (exame is null)
            return NotFound(new { mensagem = "Exame nao encontrado" });

        _exames.Delete(exame);
        await _exames.SaveChangesAsync();

        return NoContent();
    }
}
