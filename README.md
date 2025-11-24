# DotNet_React_CRUD


```
dotnet new sln -o backend
cd backend
dotnet new web -o backend
dotnet sln add backend/backend.csproj backend/backend.csproj
```


```
dotnet new gitignore
```
### Entity Framework Core tools
If havent installed, use following with appropriate version to install ef tools globally 
```
dotnet tool install --global dotnet-ef --version 9.0.11
```
### In the directory with csptoj file,
```
dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version "9.0.9"
dotnet add package Microsoft.EntityFrameworkCore.Design --version "9.0.9"
```


### Microsoft.EntityFrameworkCore.Sqlite
This package is the Entity Framework Core provider for SQLite.

It lets your .NET application use SQLite as the database engine with full EF Core features.

✔ What it enables
```
Creating and querying SQLite databases
Running EF Core migrations on SQLite
Mapping your C# models into SQLite tables
Using LINQ queries with SQLite
Handling SQLite-specific behaviors (data types, functions, etc.)
```
If you want to use EF Core + SQLite, this package is required.

### Microsoft.EntityFrameworkCore.Design 
This package contains design-time components used by EF Core tools, mainly:

✔ Enables dotnet ef commands such as:
```
dotnet ef migrations add
dotnet ef migrations remove
dotnet ef database update
dotnet ef dbcontext scaffold
```
✔ Provides design-time services

These help EF Core:
```
Generate migrations
Build DbContext at design time
Scaffold models from an existing database
```
You almost always need this package when using EF Core with migrations.


### Creating db
```
dotnet ef migrations add <name>
dotnet ef database update # will execute latest migrations
```