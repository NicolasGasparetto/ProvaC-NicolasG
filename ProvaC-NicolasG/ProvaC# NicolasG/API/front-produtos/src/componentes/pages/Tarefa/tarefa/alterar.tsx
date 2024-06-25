// pages/tarefa/alterar.tsx
import React, { useState, useEffect } from 'eact';
import axios from 'axios';
import TarefaModel from '../../models/TarefaModel';

const TarefaAlterarPage: React.FC = () => {
  const [tarefa, setTarefa] = useState<TarefaModel | null>(null);

  useEffect(() => {
    const fetchTarefa = async () => {
      const response = await axios.get(`/api/tarefas/${id}`);
      setTarefa(response.data);
    };
    fetchTarefa();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.patch(`/api/tarefas/alterar-status/${tarefa.id}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Alterar Tarefa</h1>
      {tarefa && (
        <form onSubmit={handleSubmit}>
          <label>
            Status:
            <select value={tarefa.status} onChange={(event) => setTarefa({...tarefa, status: event.target.value })}>
              <option value="Não iniciada">Não iniciada</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluída">Concluída</option>
            </select>
          </label>
          <button type="submit">Alterar</button>
        </form>
      )}
    </div>
  );
};

export default TarefaAlterarPage;
