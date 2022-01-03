using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Repository.Data;
using Services;
using Services.Interfaces;
using Services.Utilities;
using System.IO.Compression;
using Services.Extensions;

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

// Configure Compression
builder.Services.Configure<GzipCompressionProviderOptions>(options => { options.Level = CompressionLevel.Optimal; });
builder.Services.Configure<BrotliCompressionProviderOptions>(options => { options.Level = CompressionLevel.Optimal; });
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<GzipCompressionProvider>();
    options.Providers.Add<BrotliCompressionProvider>();
});

//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options => Configuration.Bind("JwtSettings", options))
//    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options => Configuration.Bind("CookieSettings", options));

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
//app.UseRouting();
//app.UseAuthorization();

// Response compression
app.UseResponseCompression();

// Configure CORS
var origins = builder.Configuration["CorsOrigins"];
app.UseCors(builder => builder
    .WithOrigins(origins)
    .AllowAnyHeader()
    .AllowAnyMethod()
    .SetPreflightMaxAge(TimeSpan.FromMinutes(10)));

app.MapControllers();

app.Run();
