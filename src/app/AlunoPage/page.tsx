"use client"

import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import '../../styles/alunoPage.css';
import ResumoAcademico from "@/components/resumoAcademico";
import DisciplinasENotas from "@/components/disciplinasNotas";
import ModalEditarPerfil from "@/components/editarPerfil";
import { getInfoAluno, atualizarAluno } from "@/api/aluno";
import { alunoData } from "@/types/datatype";

export default function AlunoPage() {
    const router = useRouter();
    const [dadosAluno, setDadosAluno] = useState<alunoData | null>(null);
    const [mostrarModalEdicao, setMostrarModalEdicao] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/loginPage');
    };

    useEffect(() => {
        const fetchDadosAluno = async () => {
            try {
                const response = await getInfoAluno();
                console.log(response);
                const aluno: alunoData = response.data;
                setDadosAluno(aluno);
            } catch (error) {
                console.error("Erro ao buscar dados do aluno:", error);
                router.push('/loginPage');
            }
        };

        fetchDadosAluno();
    }, [router]);

    const calcularResumo = () => {
        if (!dadosAluno?.alunoDiciplina) return { cursosAtivos: 0, mediaGeral: 'N/A', pendencias: 'Nenhuma' };

        const disciplinas = Array.isArray(dadosAluno.alunoDiciplina) ? dadosAluno.alunoDiciplina : [dadosAluno.alunoDiciplina];

        const cursosAtivos = disciplinas.length;

        const notasValidas = disciplinas.map(d => d.media ?? 0);
        const mediaGeral = notasValidas.length
            ? (notasValidas.reduce((a, b) => a + b, 0) / notasValidas.length).toFixed(1)
            : 'N/A';

        return { cursosAtivos, mediaGeral, pendencias: 'Nenhuma' };
    };

    const montarCursosParaComponente = () => {
        if (!dadosAluno?.alunoDiciplina) return [];

        const disciplinas = Array.isArray(dadosAluno.alunoDiciplina) ? dadosAluno.alunoDiciplina : [dadosAluno.alunoDiciplina];

        return disciplinas.map((disciplina) => ({
            nome: disciplina.disciplinaId, // Ajuste se você tiver nome da disciplina
            codigo: disciplina.disciplinaId,
            professor: "Desconhecido", // Precisa de ajuste se professor vier junto
            nota: disciplina.media?.toFixed(1) ?? "0.0",
            status: Number(disciplina.media) >= 6 ? 'Aprovado' : Number(disciplina.media) === 0 ? 'Em Andamento' : 'Reprovado',
        }));
    };

    const handleSalvarDadosAluno = async (novosDados: {
        nome: string;
        sobrenome: string;
        data_nascimento: string;
        email: string;
        telefone: string;
    }) => {
        try {
            await atualizarAluno({
                pessoa: {
                    nome: novosDados.nome,
                    sobrenome: novosDados.sobrenome,
                    data_nascimento: novosDados.data_nascimento,
                    email: novosDados.email,
                    telefone: novosDados.telefone,
                }
            });

            // Atualizar localmente após salvar
            setDadosAluno((prev) =>
                prev ? {
                    ...prev,
                    pessoa: {
                        ...prev.pessoa,
                        nome: novosDados.nome,
                        sobrenome: novosDados.sobrenome,
                        dataNascimento: novosDados.data_nascimento,
                        email: novosDados.email,
                        telefone: novosDados.telefone,
                    }
                } : prev
            );
        } catch (error) {
            console.error("Erro ao atualizar dados do aluno:", error);
        }

        setMostrarModalEdicao(false);
    };

    if (!dadosAluno || !dadosAluno.pessoa) return <div>Carregando dados do aluno...</div>;

    const resumo = calcularResumo();
    const cursos = montarCursosParaComponente();

    return (
        <div className="app-container">
            <Header
                titulo="Página do Aluno"
                subtitulo={`Bem-vindo(a), ${dadosAluno.pessoa.nome}`}
                OnLogOut={handleLogout}
                onEditarPerfil={() => setMostrarModalEdicao(true)}
            />
            <div className="main-content">
                <ResumoAcademico
                    cursosAtivos={resumo.cursosAtivos}
                    mediaGeral={resumo.mediaGeral}
                    pendencias={resumo.pendencias}
                />
                <DisciplinasENotas cursos={cursos} />
            </div>
            <ModalEditarPerfil
                mostrar={mostrarModalEdicao}
                onFechar={() => setMostrarModalEdicao(false)}
                dadosIniciais={{
                    nome: dadosAluno.pessoa.nome || '',
                    sobrenome: dadosAluno.pessoa.sobrenome || '',
                    data_nascimento: dadosAluno.pessoa.data_nascimento || '',
                    email: dadosAluno.pessoa.email || '',
                    telefone: dadosAluno.pessoa.telefone || ''
                }}
                onSalvar={handleSalvarDadosAluno}
            />
        </div>
    );
}