var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddCors();
//var policy = new Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicy();
//policy.Headers.Add("*");
//policy.Methods.Add("*");
//policy.Origins.Add("*");
//policy.SupportsCredentials = true;
//builder.Services.AddCors(x => x.AddPolicy("corsGlobalPolicy", policy));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

var app = builder.Build();

app.UseCors(x => x
.AllowAnyMethod()
.AllowAnyHeader()
.SetIsOriginAllowed(origin => true) // allow any origin
.AllowCredentials()); // allow credentials

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
