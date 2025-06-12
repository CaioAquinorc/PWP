"use client"
import Header from "@/components/header";
import ListaDisciplinas from "@/components/listaDisciplina";
import GerenciamentoNotas from "@/components/gerenciamentoNotas";
import ModalEditarPerfil from "@/components/editarPerfil";
import '../../styles/professorPage.css';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { getInfoProfessor, atualizarProfessor, getAlunosDiciplinas, getAtribuirNotas } from "@/api/professor";
import { professorData, diciplinaData, alunosNaDisciplinaData } from "@/types/datatype";
import { DisciplinaComTotal } from "@/components/listaDisciplina";

export default function ProfessorPage() {
    const router = useRouter();

    const [dadosProfessor, setDadosProfessor] = useState<professorData | null>(null);
    const [disciplinas, setDisciplinas] = useState<diciplinaData[]>([]);
    const [alunosPorDisciplina, setAlunosPorDisciplina] = useState<Record<string, alunosNaDisciplinaData[]>>({});
    const [idDisciplinaSelecionada, setIdDisciplinaSelecionada] = useState<string | null>(null);
    const [mostrarModalEdicao, setMostrarModalEdicao] = useState(false);

    const disciplinasComTotalAlunos: DisciplinaComTotal[] = disciplinas.map((disciplina) => ({
    ...disciplina,
    totalAlunos: alunosPorDisciplina[disciplina.id ?? '']?.length ?? 0
    }));

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/loginPage');
    };

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const response = await getInfoProfessor();
                const professor: professorData = response.data;
                setDadosProfessor(professor);
                setDisciplinas(professor.disciplinas ?? []);

                const alunosResponse = await getAlunosDiciplinas();
                const alunosData: { disciplina: diciplinaData; alunos: alunosNaDisciplinaData[] }[] = alunosResponse.data;

                const mapAlunosPorDisciplina: Record<string, alunosNaDisciplinaData[]> = {};
                alunosData.forEach((item) => {
                    if (item.disciplina.id) {
                        mapAlunosPorDisciplina[item.disciplina.id] = item.alunos;
                    }
                });

                setAlunosPorDisciplina(mapAlunosPorDisciplina);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                localStorage.removeItem('token');
                router.push('/loginPage');
            }
        };

        carregarDados();
    }, []);

    const handleAtualizarNotas = async (
        disciplinaId: string,
        alunoId: string,
        campoNota: 'nota_1' | 'nota_2',
        novaNota: number
    ) => {
        setAlunosPorDisciplina(prev => {
            const atualizados = prev[disciplinaId]?.map(aluno => {
                if (aluno.matricula === alunoId) {
                    return { ...aluno, [campoNota]: novaNota };
                }
                return aluno;
            }) || [];

            return { ...prev, [disciplinaId]: atualizados };
        });

        const aluno = alunosPorDisciplina[disciplinaId]?.find(a => a.matricula === alunoId);
        if (aluno) {
            try {
                await getAtribuirNotas(
                    alunoId,
                    disciplinaId,
                    (campoNota === "nota_1" ? novaNota : aluno.nota_1 ?? 0).toString(),
                    (campoNota === "nota_2" ? novaNota : aluno.nota_2 ?? 0).toString()
                );
            } catch (error) {
                console.error("Erro ao salvar notas:", error);
            }
        }
    };

    const handleSalvarDados = async (novosDados: {
        nome: string;
        sobrenome: string;
        data_nascimento: string;
        email: string;
        telefone: string;
    }) => {
        if (!dadosProfessor) return;

        const novosDadosProfessor: professorData = {
            pessoa: {
                ...dadosProfessor.pessoa,
                nome: novosDados.nome,
                sobrenome: novosDados.sobrenome,
                data_nascimento: novosDados.data_nascimento,
                email: novosDados.email,
                telefone: novosDados.telefone
            },
            data_contrato: dadosProfessor.data_contrato,
            disciplinas: dadosProfessor.disciplinas
        };

        try {
            await atualizarProfessor(novosDadosProfessor);
            setDadosProfessor(novosDadosProfessor);
            setMostrarModalEdicao(false);
        } catch (error) {
            console.error("Erro ao atualizar dados do professor:", error);
        }
    };

    const disciplinaAtual = disciplinas.find(d => d.id === idDisciplinaSelecionada);
    const alunosNaDisciplina = idDisciplinaSelecionada ? alunosPorDisciplina[idDisciplinaSelecionada] ?? [] : [];

    return (
        <div className="app-container">
            <Header
                titulo="Página do Professor"
                subtitulo={`Bem-vindo(a), ${dadosProfessor?.pessoa?.nome ?? ''} ${dadosProfessor?.pessoa?.sobrenome ?? ''}`}
                OnLogOut={handleLogout}
                onEditarPerfil={() => setMostrarModalEdicao(true)}
            />

            <div className="main-content">
                {idDisciplinaSelecionada ? (
                    <GerenciamentoNotas
                        disciplinaSelecionada={disciplinaAtual!}
                        alunosNaDisciplina={alunosNaDisciplina}
                        onAtualizarNotas={handleAtualizarNotas}
                        onVoltarParaDisciplinas={() => setIdDisciplinaSelecionada(null)}
                    />
                ) : (
                    <ListaDisciplinas
                        disciplinas={disciplinasComTotalAlunos}
                        onSelecionarDisciplina={setIdDisciplinaSelecionada}
                    />
                )}
            </div>

            <ModalEditarPerfil
                mostrar={mostrarModalEdicao}
                onFechar={() => setMostrarModalEdicao(false)}
                dadosIniciais={{
                    nome: dadosProfessor?.pessoa?.nome ?? '',
                    sobrenome: dadosProfessor?.pessoa?.sobrenome ?? '',
                    data_nascimento: dadosProfessor?.pessoa?.data_nascimento ?? '',
                    email: dadosProfessor?.pessoa?.email ?? '',
                    telefone: dadosProfessor?.pessoa?.telefone ?? ''
                }}
                onSalvar={handleSalvarDados}
            />  
        </div>
    );
}