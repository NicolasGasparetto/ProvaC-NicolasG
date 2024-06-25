// pages/categoria/listar.tsx
import React, { useState, useEffect } from 'eact';
import axios from 'axios';
import CategoriaModel from '../../models/CategoriaModel';

const CategoriaListarPage: React.FC = () => {
  const [categorias, setCategorias] = useState<CategoriaModel[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await axios.get('/api/categorias');
      setCategorias(response.data);
    };
    fetchCategorias();
  }, []);

  return (
    <div>
      <h1>Listar Categorias</h1>
      <ul>
        {categorias.map((categoria) => (
