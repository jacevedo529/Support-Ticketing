using Microsoft.EntityFrameworkCore;
using Repository.Models.Support;

namespace Repository.Data
{
    public class SupportDbContext : DbContext
    {
        public DbSet<Ticket> Tickets { get; set; } = null!;
        public DbSet<Post> Posts { get; set; } = null!;

        public SupportDbContext(DbContextOptions<SupportDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ticket>(entity =>
            {
                entity.HasKey(t => t.Id);

                entity.Property(t => t.Number).IsRequired().ValueGeneratedOnAdd().HasMaxLength(7);
                entity.Property(t => t.Title).IsRequired().HasMaxLength(250);
                entity.Property(t => t.Description).IsRequired().HasMaxLength(2000);
                entity.Property(t => t.CreatedById).IsRequired();
                entity.Property(t => t.CreatedDate).IsRequired().HasDefaultValueSql("getdate()");
                entity.Property(t => t.OwnerId);
                entity.Property(t => t.Status).IsRequired();
                entity.Property(t => t.Priority).IsRequired();

                entity.HasMany(t => t.Posts).WithOne(p => p.Ticket);
                
                entity.ToTable("Ticket");
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.HasKey(p => p.Id);

                entity.Property(p => p.Text).IsRequired().HasMaxLength(2000);
                entity.Property(p => p.CreatedById).IsRequired();
                entity.Property(p => p.CreatedDate).IsRequired().HasDefaultValueSql("getdate()");

                entity.HasOne(p => p.Ticket).WithMany(p => p.Posts);

                entity.ToTable("Post");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(p => p.Id);

                entity.Property(p => p.FirstName).IsRequired().HasMaxLength(100);
                entity.Property(p => p.LastName).IsRequired().HasMaxLength(100);
                entity.Property(p => p.Email).IsRequired().HasMaxLength(100);
                entity.Property(p => p.CreatedDate).IsRequired().HasDefaultValueSql("getdate()");

                entity.ToTable("User");
            });

            //modelBuilder.Entity<Ticket>().ToTable("Ticket");
            //modelBuilder.Entity<Post>().ToTable("Post");
            //modelBuilder.Entity<User>().ToTable("User");
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder modelConfigurationBuilder)
        {
             //modelConfigurationBuilder.Properties<string>().HaveMaxLength(200);
        }
    }
}