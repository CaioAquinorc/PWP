"use client"
import React, { useEffect, useState } from 'react';
import TextInput from '../../components/textInput';
import GenericButton from '../../components/genericButton';
import ForgotPasswordLink from '../../components/forgotPasswordLink';
import '../../styles/loginPage.css';
import FormCard from '../../components/formCard';
import { useRouter } from 'next/navigation';
import { loginUsuario } from '@/api/user';

export default function LoginPage() {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      router.push('/')
    }
  }, [router])

  const handleLogin = async (event: React.FormEvent) => {
    event .preventDefault();

    try{
      const response = await loginUsuario(matricula, senha);

      console.log('Login realizado com sucesso', response);

      if(response && response.token){
        localStorage.setItem('token', response.token)
        router.push('/');
      } else {
        console.log('Erro: Token não recebido na resposta do login.');
      }
    } catch(error) {
      console.error('Erro ao fazer login:', error);
    }
  }

  return (
    <div className="login-page">
      <h1 className="app-title">Sistema de Controle Institucional</h1>
      <FormCard label='Login SCL'>
        <TextInput label="Usuario" type="text" onChange={(e:any) => setMatricula(e.target.value)} />
        <TextInput label="Senha" type="password" onChange={(e:any) => setSenha(e.target.value)} />
        <ForgotPasswordLink />
        <GenericButton name="Entrar" onClick={handleLogin}/>
      </FormCard>
    </div>
  );
}