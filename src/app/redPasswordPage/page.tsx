import React from 'react';
import TextInput from '../../components/textInput';
import GenericButton from '../../components/genericButton';
import '../../styles/loginPage.css';
import FormCard from '../../components/formCard';

export default function RePasswordPage() {
  return (
    <div className="login-page">
      <h1 className="app-title">Sistema de Controle Institucional</h1>
      <FormCard label='Redefinir Senha'>
        <TextInput label="Usuario" type="text" />
        <GenericButton name="Proximo" />
      </FormCard>
    </div>
  );
}