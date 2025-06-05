"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import AlunoManagement from '@/components/alunoManagement';
import CursoManagement from '@/components/cursoManagement';
import ProfessorManagement from '@/components/professorManagement';
import '../../styles/adminPage.css';
import ModalEditarPerfil from '@/components/editarPerfil';
import { jwtDecode } from "jwt-decode";
import { MyTokenPayload } from "@/types/datatype";
import { getAdmin, atualizarAdmin } from '@/api/admin'; // Importar a nova função

export default function AdminPage() {
  const router = useRouter();
  const [dadosAdmin, setDadosAdmin] = useState<any>(null);
  const [matricula, setMatricula] = useState<string>('');
  const [mostrarModalEdicao, setMostrarModalEdicao] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decode = jwtDecode<MyTokenPayload>(token);
      const matriculaUsuario = decode.role;
      setMatricula(matriculaUsuario);

      getAdmin(matriculaUsuario)
        .then((response: any) => {
          const admin = response.data;
          setDadosAdmin({
            nome: admin.pessoa.nome,
            sobrenome: admin.pessoa.sobrenome,
            data_nascimento: admin.pessoa.data_nascimento,
            email: admin.pessoa.email,
            telefone: admin.pessoa.telefone,
          });
        })
        .catch((error: any) => {
          if (error.response) {
            console.error('Erro do servidor:', error.response.status, error.response.data);
            alert('Usuário incorreto.');
            localStorage.removeItem('token');
            router.push('/loginPage');
          } else if (error.request) {
            console.error('Sem resposta do servidor:', error.request);
            alert('Erro de conexão. Tente novamente mais tarde.');
          } else {
            console.error('Erro na requisição:', error.message);
            alert('Erro inesperado: ' + error.message);
          }
        });
    } else {
      console.error('Token inválido ou null');
      router.push('/loginPage');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/loginPage');
  };

  const handleSalvarDados = async (novosDados: any) => {

    const dados = {
      pessoa: novosDados
    }

    try {
      await atualizarAdmin(matricula, dados);
      setDadosAdmin(novosDados);
      setMostrarModalEdicao(false);
    } catch (err: any) {
      console.error('Erro ao atualizar dados:', err);
      alert('Erro ao salvar dados. Tente novamente.');
    }
  };

  if (!dadosAdmin) return <div>Carregando dados do administrador...</div>;

  return (
    <div className='app-container'>
      <Header 
        titulo={'Controle Acadêmico'} 
        subtitulo={'Gerencie Alunos, Professores e Cursos de forma inteligente.'} 
        OnLogOut={handleLogout} 
        onEditarPerfil={() => setMostrarModalEdicao(true)} 
      />
      <div className='main-content'>
        <AlunoManagement />
        <ProfessorManagement />
        <CursoManagement />
      </div>
      <ModalEditarPerfil 
        mostrar={mostrarModalEdicao} 
        onFechar={() => setMostrarModalEdicao(false)} 
        dadosIniciais={dadosAdmin}
        onSalvar={handleSalvarDados} 
      />
    </div>
  );
}