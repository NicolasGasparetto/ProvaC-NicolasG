// App.tsx
import React, { useState, useEffect } from 'react';
import CategoriaModel from './models/CategoriaModel';
import TarefaModel from './models/TarefaModel';

const App = () => {
  const [categorias, setCategorias] = useState<CategoriaModel[]>([]);
  const [tarefas, setTarefas] = useState<TarefaModel[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<number | null>(null);

  useEffect(() => {
    fetchCategorias();
    fetchTarefas();
  }, []);

  const fetchCategorias = async () => {
    const response = await fetch(`${apiUrl}/categoria/listar`);
    const categorias = await response.json();
    setCategorias(categorias);
  };

  const fetchTarefas = async () => {
    const response = await fetch(`${apiUrl}/tarefas/listar`);
    const tarefas = await response.json();
    setTarefas(tarefas);
  };

  const handleCategoriaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoria(parseInt(event.target.value, 10));
  };

  const handleTarefaSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const descricao = (event.target as HTMLFormElement).descricao.value;
    const categoriaId = selectedCategoria;
    const response = await fetch(`${apiUrl}/tarefas/cadastrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descricao, categoriaId }),
    });
    if (response.ok) {
      fetchTarefas();
    } else {
      console.error('Erro ao cadastrar tarefa');
    }
  };

  return (
    <div>
      <h1>Prova A1</h1>
      <section>
        <h2>Categorias</h2>
        <ul>
          {categorias.map((categoria) => (
            <li key={categoria.id}>{categoria.nome}</li>
          ))}
        </ul>
        <form>
          <label>
            Nome:
            <input type="text" name="nome" />
          </label>
          <button type="submit">Cadastrar Categoria</button>
        </form>
      </section>
      <section>
        <h2>Tarefas</h2>
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa.id}>{tarefa.descricao}</li>
          ))}
        </ul>
        <form onSubmit={handleTarefaSubmit}>
          <label>
            Descrição:
            <input type="text" name="descricao" />
          </label>
          <label>
            Categoria:
            <select value={selectedCategoria} onChange={handleCategoriaChange}>
              {categorias.map((categoria) => (
                <option value={categoria.id}>{categoria.nome}</option>
              ))}
            </select>
          </label>
          <button type="submit">Cadastrar Tarefa</button>
        </form>
      </section>
    </div>
  );
};

export default App;
