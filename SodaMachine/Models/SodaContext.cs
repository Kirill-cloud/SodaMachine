using Microsoft.EntityFrameworkCore;

namespace SodaMachine.Models
{
    public class SodaContext : DbContext
    {
        public DbSet<Position> Positions{ get; set; }

        public SodaContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=SodaMachineDB;Trusted_Connection=True;");
        }
    }
}
