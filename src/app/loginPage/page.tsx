"use client";
import React, { useEffect, useState } from 'react';
import TextInput from '../../components/textInput';
import GenericButton from '../../components/genericButton';
import ForgotPasswordLink from '../../components/forgotPasswordLink';
import '../../styles/loginPage.css';
import FormCard from '../../components/formCard';
import { useRouter } from 'next/navigation';
import { fazerLogin } from '@/api/user';
import { AxiosError } from 'axios';

export default function LoginPage() {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }, [router]);

  const handleLogin = () => {
    if (!matricula.trim() || !senha.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    fazerLogin(matricula, senha)
      .then((response: any) => {
        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          router.push('/');
        } else {
          setMessage('Login falhou: token não recebido.');
          alert('Falha no login. Tente novamente.');
        }
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          console.error('Erro do servidor:', error.response.status, error.response.data);
          setMessage('Usuário ou senha inválidos.');
          alert('Usuário ou senha inválidos.');
        } else if (error.request) {
          console.error('Sem resposta do servidor:', error.request);
          setMessage('Sem resposta do servidor.');
          alert('Erro de conexão. Tente novamente mais tarde.');
        } else {
          console.error('Erro na requisição:', error.message);
          setMessage(error.message);
          alert('Erro inesperado: ' + error.message);
        }
      });
  };

  return (
    <div className="login-page">
      <h1 className="app-title">Sistema de Controle Institucional</h1>
      <FormCard label="Login SCL">
        <TextInput
          label="Usuário"
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMatricula(e.target.value)}
        />
        <TextInput
          label="Senha"
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
        />
        <ForgotPasswordLink />
        {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
        <GenericButton name="Entrar" onClick={handleLogin} />
      </FormCard>
    </div>
  );
}