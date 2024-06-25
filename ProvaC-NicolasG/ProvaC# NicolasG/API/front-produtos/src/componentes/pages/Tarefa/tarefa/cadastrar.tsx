// pages/tarefa/cadastrar.tsx
import React, { useState } from 'eact';
import axios from 'axios';

const TarefaCadastrarPage: React.FC = () => {
  const [descricao, setDescricao] = useState('');
  const [categoriaId, setCategoriaId] = useState(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/tarefas/cadastrar', { descricao, categoriaId });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Cadastrar Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Descrição:
          <input type="text" value={descricao} onChange={(event) => setDescricao(event.target.value)} />
        </label>
        <label>
          Categoria:
          <select value={categoriaId} onChange={(event) => setCategoriaId(Number(event.target.value))}>
          </select>
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default TarefaCadastrarPage;
