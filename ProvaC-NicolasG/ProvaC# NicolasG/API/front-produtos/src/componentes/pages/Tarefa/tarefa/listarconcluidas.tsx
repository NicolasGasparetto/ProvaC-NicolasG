// pages/tarefa/listarconcluidas.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TarefaModel from '../../models/TarefaModel';

const TarefaListarConcluidasPage: React.FC = () => {
  const [tarefasConcluidas, setTarefasConcluidas] = useState<TarefaModel[]>([]);

  useEffect(() => {
    const fetchTarefasConcluidas = async () => {
      const response = await axios.get('/api/tarefas/concluidas');
      setTarefasConcluidas(response.data);
    };
    fetchTarefasConcluidas();
  }, []);

  return (
    <div>
      <h1>Listar Tarefas Concluídas</h1>
      <ul>
        {tarefasConcluidas.map((tarefa) => (
          <li key={tarefa.id}>
            {tarefa.descricao} ({tarefa.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TarefaListarConcluidasPage;
