import React from 'react';
import TextInput from '../../components/textInput';
import GenericButton from '../../components/genericButton';
import '../../styles/loginPage.css';
import FormCard from '../../components/formCard';

export default function ChangePasswordPage() {
  return (
    <div className="login-page">
      <h1 className="app-title">Sistema de Controle Institucional</h1>
      <FormCard label='Alterar Senha'>
        <TextInput label="Nova Senha" type="password" />
        <TextInput label="Repita a Nova Senha" type="password" />
        <GenericButton name="Entrar" />
      </FormCard>
    </div>
  );
}