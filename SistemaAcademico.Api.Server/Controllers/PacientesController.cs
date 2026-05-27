using Microsoft.AspNetCore.Mvc;
using SistemaAcademico.Api.Server.DTOs;
using SistemaAcademico.Api.Server.Models;
using SistemaAcademico.Api.Server.Repositories;

namespace SistemaAcademico.Api.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PacientesController : ControllerBase
{
    private readonly IRepository<Paciente> _pacientes;

    public PacientesController(IRepository<Paciente> pacientes)
    {
        _pacientes = pacientes;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _pacientes.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var paciente = await _pacientes.GetByIdAsync(id);
        return paciente is null ? NotFound(new { mensagem = "Paciente nao encontrado" }) : Ok(paciente);
    }

    [HttpPost]
    public async Task<IActionResult> Create(PacienteCreateDto dto)
    {
        var paciente = new Paciente
        {
            Nome = dto.Nome,
            Cpf = dto.Cpf,
            Telefone = dto.Telefone,
            Email = dto.Email,
            DataNascimento = dto.DataNascimento
        };

        await _pacientes.AddAsync(paciente);
        await _pacientes.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = paciente.Id }, paciente);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, PacienteCreateDto dto)
    {
        var paciente = await _pacientes.GetByIdAsync(id);
        if (paciente is null)
            return NotFound(new { mensagem = "Paciente nao encontrado" });

        paciente.Nome = dto.Nome;
        paciente.Cpf = dto.Cpf;
        paciente.Telefone = dto.Telefone;
        paciente.Email = dto.Email;
        paciente.DataNascimento = dto.DataNascimento;

        _pacientes.Update(paciente);
        await _pacientes.SaveChangesAsync();

        return Ok(new { mensagem = "Paciente atualizado" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var paciente = await _pacientes.GetByIdAsync(id);
        if (paciente is null)
            return NotFound(new { mensagem = "Paciente nao encontrado" });

        _pacientes.Delete(paciente);
        await _pacientes.SaveChangesAsync();

        return NoContent();
    }
}
