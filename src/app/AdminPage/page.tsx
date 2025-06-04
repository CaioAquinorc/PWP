"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import AlunoManagement from '@/components/alunoManagement';
import CursoManagement from '@/components/cursoManagement';
import ProfessorManagement from '@/components/professorManagement';
import '../../styles/aDashboard.css';


export default function AdminPage() {
  const router = useRouter();

  const handleLogout = () => {
    // 1. Remover o token de autenticação 
    localStorage.removeItem('token'); // Remove o token do Local Storage

    // 2. Redirecionar o usuário para a página de login
    router.push('/loginPage');
  };

  return (
    <div className='app-container'>
        <Header titulo={'Controle Acadêmico'} subtitulo={'Gerencie Alunos, Professores e Cursos de forma inteligente.'} OnLogOut={handleLogout}/>
        <div className='main-content'>
            <AlunoManagement/>
            <ProfessorManagement/>
            <CursoManagement/>
        </div>
        
    </div>
    
  );
}