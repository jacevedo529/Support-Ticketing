using Microsoft.EntityFrameworkCore;
using Repository.Models.Support;

namespace Repository
{
    public class SupportContext : DbContext
    {
        // null forgiving https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/null-forgiving
        public DbSet<Ticket> Ticket { get; set; } = null!;
        public DbSet<Post> Post { get; set; } = null!;

        public SupportContext(DbContextOptions<SupportContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ticket>(entity =>
            {
                entity.Property(e => e.Description).HasMaxLength(2000);
                entity.HasMany(t => t.Posts).WithOne(p => p.Ticket);
                entity.ToTable("Ticket");
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.Property(e => e.Text).HasMaxLength(2000);
                entity.ToTable("Post");
            });
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder modelConfigurationBuilder)
        {
            modelConfigurationBuilder.Properties<string>().HaveMaxLength(200);
        }
    }
}