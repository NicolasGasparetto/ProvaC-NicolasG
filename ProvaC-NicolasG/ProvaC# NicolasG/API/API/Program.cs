using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

var app = builder.Build();

app.MapGet("/", () => "Prova A1");

//GET: http://localhost:5273/categoria/listar
app.MapGet("/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5273/categoria/cadastrar
app.MapPost("/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

//GET: http://localhost:5273/tarefas/listar
app.MapGet("/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5273/tarefas/cadastrar
app.MapPost("/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }
    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

// PATCH: http://localhost:5273/tarefa/alterar/{id}
app.MapPatch("/tarefas/alterar/{id}", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa, [FromRoute] string id) =>
{
    Tarefa? task = ctx.Tarefas.Find(id);

    if (task is null)
    {
        return Results.NotFound("Tarefa não encontrada");
    }

    if (task.Status == "Não iniciada")
    {
        task.Status = "Em andamento";
    }
    else if (task.Status == "Em andamento")
    {
        task.Status = "Concluído";
    }

    ctx.Tarefas.Update(task);
    ctx.SaveChanges();

    return Results.Ok("Status alterado com sucesso");
});

//GET: http://localhost:5273/tarefas/naoconcluidas
app.MapGet("/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
    var tasks = ctx.Tarefas.Where(t => t.Status == "Não iniciada" || t.Status == "Em andamento").ToList();

    if (tasks.Any())
    {
        return Results.Ok(tasks);
    }
    return Results.NotFound("Nenhuma tarefa não concluída foi encontrada");
});

//GET: http://localhost:5273/tarefas/concluidas
app.MapGet("/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
    var tasks = ctx.Tarefas.Where(t => t.Status == "Concluído").ToList();

    if (tasks.Any())
    {
        return Results.Ok(tasks);
    }
    return Results.NotFound("Nenhuma tarefa concluída foi encontrada");
});

app.Run();
