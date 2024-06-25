// pages/tarefa/listarnaoconcluidas.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TarefaModel from '../../models/TarefaModel';

const TarefaListarNaoConcluidasPage: React.FC = () => {
  const [tarefasNaoConcluidas, setTarefasNaoConcluidas] = useState<TarefaModel[]>([]);

  useEffect(() => {
    const fetchTarefasNaoConcluidas = async () => {
      const response = await axios.get('/api/tarefas/nao-concluidas');
      setTarefasNaoConcluidas(response.data);
    };
    fetchTarefasNaoConcluidas();
  }, []);

  return (
    <div>
      <h1>Listar Tarefas Não Concluídas</h1>
      <ul>
        {tarefasNaoConcluidas.map((tarefa) => (
          <li key={tarefa.id}>
            {tarefa.descricao} ({tarefa.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TarefaListarNaoConcluidasPage;
