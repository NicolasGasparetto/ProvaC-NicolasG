// pages/tarefa/listar.tsx
import React, { useState, useEffect } from 'eact';
import axios from 'axios';
import TarefaModel from '../../models/TarefaModel';

const TarefaListarPage: React.FC = () => {
  const [tarefas, setTarefas] = useState<TarefaModel[]>([]);

  useEffect(() => {
    const fetchTarefas = async () => {
      const response = await axios.get('/api/tarefas');
      setTarefas(response.data);
    };
    fetchTarefas();
  }, []);

  return (
    <div>
      <h1>Listar Tarefas</h1>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            {tarefa.descricao} ({tarefa.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TarefaListarPage;
