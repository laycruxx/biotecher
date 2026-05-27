using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaAcademico.Api.Server.Data;
using SistemaAcademico.Api.Server.DTOs;
using SistemaAcademico.Api.Server.Models;
using SistemaAcademico.Api.Server.Services;

namespace SistemaAcademico.Api.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly TokenService _tokenService;
    private readonly PasswordHasher _passwordHasher;

    public AuthController(AppDbContext context, TokenService tokenService, PasswordHasher passwordHasher)
    {
        _context = context;
        _tokenService = tokenService;
        _passwordHasher = passwordHasher;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var username = request.Username.Trim();

        if (username.Length < 3 || request.Password.Length < 4)
            return BadRequest(new { mensagem = "Informe um usuario e uma senha validos." });

        var exists = await _context.Usuarios.AnyAsync(u => u.Username == username);
        if (exists)
            return Conflict(new { mensagem = "Este usuario ja existe." });

        var usuario = new Usuario
        {
            Username = username,
            PasswordHash = _passwordHasher.Hash(request.Password),
            Role = string.IsNullOrWhiteSpace(request.Role) ? "Admin" : request.Role
        };

        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();

        return Created(string.Empty, new
        {
            usuario.Id,
            usuario.Username,
            usuario.Role
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest login)
    {
        var username = login.Username.Trim();
        var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Username == username);

        if (usuario is null && username == "admin" && login.Password == "admin123")
        {
            usuario = new Usuario
            {
                Username = "admin",
                PasswordHash = _passwordHasher.Hash("admin123"),
                Role = "Admin"
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
        }

        if (usuario is null || !_passwordHasher.Verify(login.Password, usuario.PasswordHash))
            return Unauthorized(new { mensagem = "Usuario ou senha invalidos." });

        var token = _tokenService.GenerateToken(usuario);

        return Ok(new
        {
            token,
            usuario = new
            {
                usuario.Id,
                usuario.Username,
                usuario.Role
            }
        });
    }
}
