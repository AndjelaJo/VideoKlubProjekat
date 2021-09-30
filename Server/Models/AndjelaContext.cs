using Microsoft.EntityFrameworkCore;

namespace Server.Models
{
    public class AndjelaContext : DbContext
    {

        public DbSet<Klub> Klubovi { get; set; }

        public DbSet<Red> Redovi { get; set; }

        public DbSet<Film> Filmovi { get; set; }

        public AndjelaContext(DbContextOptions options) : base(options)
        {

        }
    }
}