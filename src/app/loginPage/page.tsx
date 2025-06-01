"use client"
import React, { useEffect, useState } from 'react';
import TextInput from '../../components/textInput';
import GenericButton from '../../components/genericButton';
import ForgotPasswordLink from '../../components/forgotPasswordLink';
import '../../styles/loginPage.css';
import FormCard from '../../components/formCard';
import { useRouter } from 'next/navigation';
import { fazerLogin } from '@/api/user';
import { error } from 'console';
import { AxiosError } from 'axios';

export default function LoginPage() {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      router.push('/')
    }
  }, [router])

  const handleLogin = () => {
  
    fazerLogin(matricula, senha)
    .then((response: any) => {

      if(response.data && response.data.token){
        localStorage.setItem('token', response.data.token);
        router.push('/');
      }

    })
    .catch((error: AxiosError) => {
      if (error.response) {
        // Erro vindo do servidor
        console.error('Erro do servidor:', error.response.status, error.response.data);
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        console.error('Sem resposta do servidor:', error.request);
      } else {
        // Erro ao configurar a requisição
        console.error('Erro na requisição:', error.message);
        setMessage(error.message);
      }
    });

  };

  return (
    <div className="login-page">
      <h1 className="app-title">Sistema de Controle Institucional</h1>
      <FormCard label='Login SCL'>
        <TextInput label="Usuario" type="text" onChange={(e:any) => setMatricula(e.target.value)} />
        <TextInput label="Senha" type="password" onChange={(e:any) => setSenha(e.target.value)} />
        <ForgotPasswordLink />
        <GenericButton name="Entrar" onClick={handleLogin}/>
        { message && <>{message}</>}
      </FormCard>
    </div>
  );
}