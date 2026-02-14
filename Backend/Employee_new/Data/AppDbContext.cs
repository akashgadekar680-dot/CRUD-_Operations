using Employee_new.models;
using Microsoft.EntityFrameworkCore;

namespace Employee_new.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options) 
        {
            
        }
        public DbSet<Employee> Employee { get; set; }
    }
}
