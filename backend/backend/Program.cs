using backend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//services
builder.Services.AddControllers();
string connectionString=builder.Configuration.GetConnectionString("Default")?? throw new ArgumentNullException("Connection string 'Default' not found.");
builder.Services.AddDbContext<AppDbContext>(op=>op.UseSqlite(connectionString));
var app = builder.Build();

//middlewares
// app.MapGet("/", () => "Hello World!");
app.MapControllers();


app.Run();
