import axios, { AxiosError } from 'axios';
import api from './api';

export const fazerLogin = async (matricula: string, senha: string) => {

  const credentials = {
    matricula,
    senha
  };

  return await api.post('/api/usuario/login', credentials );
}