using Microsoft.EntityFrameworkCore;
using Repository.Models.Identity;

namespace Repository.Data
{
    public class IdentityDbContext : DbContext
    {
        public DbSet<ApplicationUser> Users { get; set; } = null!;

        public IdentityDbContext(DbContextOptions<IdentityDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ApplicationUser>(entity =>
            {
                entity.HasKey(au => au.Id);

                entity.Property(au => au.FirstName).IsRequired().HasMaxLength(100);
                entity.Property(au => au.LastName).IsRequired().HasMaxLength(100);
                entity.Property(au => au.Username).IsRequired().HasMaxLength(100);
                entity.Property(au => au.Email).IsRequired().HasMaxLength(100);
                entity.Property(au => au.Password).IsRequired().HasMaxLength(100);

                entity.Property(au => au.CreatedDate).IsRequired().HasDefaultValueSql("getdate()");
                entity.Property(au => au.LastLoginDate).IsRequired().HasDefaultValueSql("getdate()");

                entity.ToTable("User");
            });
        }
    }
}
