"use client"
import Header from "@/components/header";
import ListaDisciplinas from "@/components/listaDisciplina";
import GerenciamentoNotas from "@/components/gerenciamentoNotas";
import { useEffect, useState } from "react";
import '../../styles/professorPage.css';
import VincularAluno from "@/components/vincularAluno";
import { useRouter } from 'next/navigation';
import ModalEditarPerfil from "@/components/editarPerfil";



export default function ProfessorPage() {
    const router = useRouter();

    const handleLogout = () => {
    // 1. Remover o token de autenticação 
        localStorage.removeItem('token'); // Remove o token do Local Storage

    // 2. Redirecionar o usuário para a página de login
        router.push('/loginPage');
    };

    const [dadosProfessor, setDadosProfessor] = useState({ // GET dados do Professor
    nome: 'João',
    sobrenome: 'Souza',
    data_nascimento: '2000-03-22',
    email: 'souza.joao@gmail.com',
    telefone: '11999999999',
    });
    
    const [disciplinas, setDisciplinas] = useState([ //GET DISCIPLINAS
        { nome: 'Programação Web I', id: 'PW101', totalAlunos: 0 },
        { nome: 'Estrutura de Dados II', id: 'ED202', totalAlunos: 0 },
        { nome: 'Banco de Dados Relacionais', id: 'BD303', totalAlunos: 0 },
    ]);

    const [alunosPorDisciplina, setAlunosPorDisciplina] = useState({ //GET ALUNOS MATRICULADOS
        'PW101': [
            { id: 'S001', grade1: 8.5, grade2: 7.0 },
            { id: 'S002', grade1: 6.0, grade2: 9.0 },
        ],
        'ED202': [
            { id: 'S003', grade1: 7.2, grade2: 8.8 },
        ],
        'BD303': [],
    });

    const [todosAlunos, setTodosAlunos] = useState([ // GET ALUNOS
        { name: 'Maria Oliveira', id: 'S001' },
        { name: 'Carlos Santos', id: 'S002' },
        { name: 'Ana Paula', id: 'S003' },
        { name: 'Pedro Costa', id: 'S004' },
        { name: 'Juliana Lima', id: 'S005' },
        { name: 'Fernando Alves', id: 'S006' },
        { name: 'Gabriela Rocha', id: 'S007' },
    ]);

    const [idDisciplinaSelecionada, setIdDisciplinaSelecionada] = useState(null);
    const [mostrarModalVincularAluno, setMostrarModalVincularAluno] = useState(false);

    useEffect(() => {
        setDisciplinas(prevDisciplinas =>
            prevDisciplinas.map(disciplina => ({
                ...disciplina,
                totalAlunos: alunosPorDisciplina[disciplina.id]?.length || 0
            }))
        );
    }, [alunosPorDisciplina]);

    const handleSelecionarDisciplina = (id) => {
        setIdDisciplinaSelecionada(id);
    };

    const handleVoltarParaDisciplinas = () => {
        setIdDisciplinaSelecionada(null);
    };

    const handleAdicionarAlunoNaDisciplina = (idCurso, nomeAluno, idAluno) => {
        setAlunosPorDisciplina(prevState => {
            const alunosAtuais = prevState[idCurso] || [];
            if (alunosAtuais.some(aluno => aluno.id === idAluno)) {
                console.warn(`O aluno ${nomeAluno} (Matrícula: ${idAluno}) já está matriculado nesta disciplina.`);
                return prevState;
            }
            const novoAluno = { id: idAluno, grade1: 0.0, grade2: 0.0 };
            return {
                ...prevState,
                [idCurso]: [...alunosAtuais, novoAluno]
            };
        });
    };

    const handleAtualizarNotas = (idCurso, idAluno, campoNota, novaNota) => {
        setAlunosPorDisciplina(prevState => {
            const alunosAtualizados = prevState[idCurso].map(aluno =>
                aluno.id === idAluno ? { ...aluno, [campoNota]: novaNota } : aluno
            );
            return {
                ...prevState,
                [idCurso]: alunosAtualizados
            };
        });
    };

    const disciplinaAtualSelecionada = idDisciplinaSelecionada
        ? disciplinas.find(d => d.id === idDisciplinaSelecionada)
        : null;

    const alunosParaDisciplinaSelecionada = idDisciplinaSelecionada
        ? alunosPorDisciplina[idDisciplinaSelecionada] || []
        : [];


    const [mostrarModalEdicao, setMostrarModalEdicao] = useState(false);

    const handleSalvarDados = (novosDados) => {
        setDadosProfessor(prevDados => ({
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
        <div className="app-container">
            <Header titulo={'Página do Professor'} subtitulo={`Bem-vindo(a), Professor(a) ${dadosProfessor.nome + ' ' + dadosProfessor.sobrenome}.`} OnLogOut={handleLogout} onEditarPerfil={() => setMostrarModalEdicao(true)}/>
            <div className="main-content">
                {idDisciplinaSelecionada ? (
                    <GerenciamentoNotas
                        disciplinaSelecionada={disciplinaAtualSelecionada}
                        alunosNaDisciplina={alunosParaDisciplinaSelecionada}
                        onAtualizarNotas={handleAtualizarNotas}
                        onAdicionarAlunoNaDisciplina={handleAdicionarAlunoNaDisciplina}
                        onVoltarParaDisciplinas={handleVoltarParaDisciplinas}
                        onMostrarModalVincularAluno={() => setMostrarModalVincularAluno(true)}
                        todosAlunos={todosAlunos}
                    />
                ) : (
                    <ListaDisciplinas
                        disciplinas={disciplinas}
                        onSelecionarDisciplina={handleSelecionarDisciplina}
                    />
                )}
            </div>
            <VincularAluno
                mostrar={mostrarModalVincularAluno}
                onFechar={() => setMostrarModalVincularAluno(false)}
                todosAlunos={todosAlunos}
                alunosNaDisciplinaAtual={alunosParaDisciplinaSelecionada}
                onVincularAluno={handleAdicionarAlunoNaDisciplina}
                idDisciplinaSelecionada={idDisciplinaSelecionada}
            />
            <ModalEditarPerfil 
                mostrar={mostrarModalEdicao} 
                onFechar={() => setMostrarModalEdicao(false)} 
                dadosIniciais={{
                    nome: dadosProfessor.nome, 
                    sobrenome: dadosProfessor.sobrenome, 
                    data_nascimento: dadosProfessor.data_nascimento, 
                    email: dadosProfessor.email,
                    telefone: dadosProfessor.telefone
    
                }} 
                onSalvar={handleSalvarDados} 
            />
        </div>
    )
}