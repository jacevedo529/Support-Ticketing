using Microsoft.EntityFrameworkCore;
using Repository.Data;
using Services;
using Services.Interfaces;
using Services.Utilities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DI
builder.Services.AddSingleton<IJwtTokenUtility, JwtTokenUtility>();
builder.Services.AddTransient<IAuthenticationService, AuthenticationService>();
builder.Services.AddTransient<ISupportService, SupportService>();
//builder.Services.AddTransient<IUserService, UserService>();

// Entity Framework configuration
// Support
builder.Services.AddDbContext<SupportDbContext>(optionsAction =>
    optionsAction.UseSqlServer(builder.Configuration.GetConnectionString("SupportContext")));
builder.Services.AddSingleton(ctx => SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder<SupportDbContext>(),
        builder.Configuration.GetConnectionString("SupportContext")));
// Identity
builder.Services.AddDbContext<IdentityDbContext>(optionsAction =>
    optionsAction.UseSqlServer(builder.Configuration.GetConnectionString("IdentityContext")));
builder.Services.AddSingleton(ctx => SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder<IdentityDbContext>(),
        builder.Configuration.GetConnectionString("IdentityContext")));


// EntityFramework diagnostics
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
}

// Seed Data
SupportDbInitializer.InitializeDatabase(app);
IdentityDbInitializer.InitializeDatabase(app);

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

var origins = builder.Configuration["CorsOrigins"];
app.UseCors(builder => builder
    .WithOrigins(origins)
    .AllowAnyHeader()
    .AllowAnyMethod()
    .SetPreflightMaxAge(TimeSpan.FromMinutes(10)));

app.MapControllers();

app.Run();
