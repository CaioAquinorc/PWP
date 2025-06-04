"use client"

import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import '../../styles/alunoPage.css';
import ResumoAcademico from "@/components/resumoAcademico";
import DisciplinasENotas from "@/components/disciplinasNotas";
import ModalEditarPerfil from "@/components/editarPerfil";


export default function AlunoPage() {
    const router = useRouter();

    const handleLogout = () => {
    // 1. Remover o token de autenticação 
        localStorage.removeItem('token'); // Remove o token do Local Storage

    // 2. Redirecionar o usuário para a página de login
        router.push('/loginPage');
    };

    const [dadosAluno, setDadosAluno] = useState({ // GET dados do aluno e Disciplinas associadas
        nome: 'Alice',
        sobrenome: 'Ferreira',
        data_nascimento: '1995-01-03',
        email: 'alice.ferreira@gmail.com',
        telefone: '11999999999',
        cursos: [
            { nome: 'Programação Web I', codigo: 'PW101', professor: 'Prof. Ana Silva', nota: '9.5', status: 'Aprovado' },
            { nome: 'Estrutura de Dados II', codigo: 'ED202', professor: 'Prof. João Souza', nota: '7.0', status: 'Em Andamento' },
            { nome: 'Banco de Dados Relacionais', codigo: 'BD303', professor: 'Prof. Maria Costa', nota: '8.2', status: 'Aprovado' },
            { nome: 'Cálculo I', codigo: 'CAL101', professor: 'Prof. Pedro Almeida', nota: '5.5', status: 'Reprovado' },
        ],
        resumo: {
            cursosAtivos: 0,
            mediaGeral: 'N/A',
            pendencias: 'Nenhuma'
        }
    });

    const [mostrarModalEdicao, setMostrarModalEdicao] = useState(false);

    useEffect(() => {
        // Calcula os dados do resumo
        const contagemCursosAtivos = dadosAluno.cursos.filter(c => c.status === 'Em Andamento' || c.status === 'Aprovado').length;
        const totalNotas = dadosAluno.cursos.reduce((soma, c) => soma + (parseFloat(c.nota) || 0), 0);
        const valorMediaGeral = dadosAluno.cursos.length > 0 ? (totalNotas / dadosAluno.cursos.length).toFixed(1) : 'N/A';

        setDadosAluno(prevDados => ({
            ...prevDados,
            resumo: {
                cursosAtivos: contagemCursosAtivos,
                mediaGeral: valorMediaGeral,
                pendencias: "Nenhuma" // Lógica mais complexa para pendências em um sistema real
            }
        }));
    }, [dadosAluno.cursos]); // Recalcula o resumo quando os cursos mudam

    const handleSalvarDadosAluno = (novosDados) => {
        setDadosAluno(prevDados => ({
            ...prevDados,
            nome: novosDados.nome,
            sobrenome: novosDados.sobrenome,
            data_nascimento: novosDados.data_nascmento,
            email: novosDados.email, 
            telefone: novosDados.telefone // Embora desabilitado no modal, a lógica de salvamento pode existir
        }));
        setMostrarModalEdicao(false); // Fecha o modal após salvar
    };

    return(
        <div className="app-container">
            <Header titulo={'Página do Aluno'} subtitulo={`Bem-vindo(a), ${dadosAluno.nome}.`} OnLogOut={handleLogout} onEditarPerfil={() => setMostrarModalEdicao(true)} />
            <div className="main-content">
                <ResumoAcademico cursosAtivos={dadosAluno.resumo.cursosAtivos} mediaGeral={dadosAluno.resumo.mediaGeral} pendencias={dadosAluno.resumo.pendencias} />
                <DisciplinasENotas cursos={dadosAluno.cursos}/>
            </div>
            <ModalEditarPerfil 
                mostrar={mostrarModalEdicao} 
                onFechar={() => setMostrarModalEdicao(false)} 
                dadosIniciais={{
                    nome: dadosAluno.nome, 
                    sobrenome: dadosAluno.sobrenome, 
                    data_nascimento: dadosAluno.data_nascimento, 
                    email: dadosAluno.email,
                    telefone: dadosAluno.telefone

                }} 
                onSalvar={handleSalvarDadosAluno} />
        </div>
    );
}