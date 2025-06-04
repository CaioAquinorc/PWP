"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import AlunoManagement from '@/components/alunoManagement';
import CursoManagement from '@/components/cursoManagement';
import ProfessorManagement from '@/components/professorManagement';
import '../../styles/adminPage.css';
import ModalEditarPerfil from '@/components/editarPerfil';


export default function AdminPage() {
  const router = useRouter();

  const handleLogout = () => {
    // 1. Remover o token de autenticação 
    localStorage.removeItem('token'); // Remove o token do Local Storage

    // 2. Redirecionar o usuário para a página de login
    router.push('/loginPage');
  };

  const [dadosAdmin, setDadosAdmin] = useState({ // GET dados do ADM
          nome: 'Marina',
          sobrenome: 'Pereira',
          data_nascimento: '1980-06-04',
          email: 'marina.pereira@gmail.com',
          telefone: '11999999999',
      });
  
      const [mostrarModalEdicao, setMostrarModalEdicao] = useState(false);
  
      const handleSalvarDados = (novosDados: any) => {
          setDadosAdmin(prevDados => ({
              ...prevDados,
              nome: novosDados.nome,
              sobrenome: novosDados.sobrenome,
              data_nascimento: novosDados.data_nascmento,
              email: novosDados.email, 
              telefone: novosDados.telefone // Embora desabilitado no modal, a lógica de salvamento pode existir
          }));
          setMostrarModalEdicao(false); // Fecha o modal após salvar
      };

  return (
    <div className='app-container'>
        <Header titulo={'Controle Acadêmico'} subtitulo={'Gerencie Alunos, Professores e Cursos de forma inteligente.'} OnLogOut={handleLogout} onEditarPerfil={() => setMostrarModalEdicao(true)}/>
        <div className='main-content'>
            <AlunoManagement/>
            <ProfessorManagement/>
            <CursoManagement/>
        </div>
        <ModalEditarPerfil 
          mostrar={mostrarModalEdicao} 
          onFechar={() => setMostrarModalEdicao(false)} 
          dadosIniciais={{
              nome: dadosAdmin.nome, 
              sobrenome: dadosAdmin.sobrenome, 
              data_nascimento: dadosAdmin.data_nascimento, 
              email: dadosAdmin.email,
              telefone: dadosAdmin.telefone

          }} 
          onSalvar={handleSalvarDados} />
    </div>
    
  );
}