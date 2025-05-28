"use client"
import React, { useState } from 'react';
import TextInput from '../../components/textInput';
import GenericButton from '../../components/genericButton';
import ForgotPasswordLink from '../../components/forgotPasswordLink';
import '../../styles/loginPage.css';
import FormCard from '../../components/formCard';

export default function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <div className="login-page">
      <h1 className="app-title">Sistema de Controle Institucional</h1>
      <FormCard label='Login SCL'>
        <TextInput label="Usuario" type="text" onChange={(e:any) => setUsuario(e.target.value)} />
        <TextInput label="Senha" type="password" onChange={(e:any) => setSenha(e.target.value)} />
        <ForgotPasswordLink />
        <GenericButton name="Entrar"/>
      </FormCard>
    </div>
  );
}