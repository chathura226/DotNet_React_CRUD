using backend.Models;
using Microsoft.EntityFrameworkCore;

//for cors
var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

//services
//for cors
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader(); //for example X-pagination
                      });
});


builder.Services.AddControllers();
string connectionString=builder.Configuration.GetConnectionString("Default")?? throw new ArgumentNullException("Connection string 'Default' not found.");
builder.Services.AddDbContext<AppDbContext>(op=>op.UseSqlite(connectionString));
var app = builder.Build();

//middlewares
app.UseCors(MyAllowSpecificOrigins); //cors 
// app.MapGet("/", () => "Hello World!");
app.MapControllers();

app.Run();
