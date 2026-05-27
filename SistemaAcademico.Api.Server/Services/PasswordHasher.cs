using System.Security.Cryptography;
using System.Text;

namespace SistemaAcademico.Api.Server.Services;

public class PasswordHasher
{
    public string Hash(string password)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(password));
        return Convert.ToHexString(bytes);
    }

    public bool Verify(string password, string hash)
        => Hash(password).Equals(hash, StringComparison.OrdinalIgnoreCase);
}
