"use client"

import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import '../../styles/alunoPage.css';
import ResumoAcademico from "@/components/resumoAcademico";
import DisciplinasENotas from "@/components/disciplinasNotas";
import ModalEditarPerfil from "@/components/editarPerfil";
import { getInfoAluno, atualizarAluno } from "@/api/aluno";
import { alunoData, alunoDisciplinaData, diciplinaData } from "@/types/datatype";
import { getDiciplinaList } from "@/api/admin"; // Importa a lista de disciplinas

export default function AlunoPage() {
    const router = useRouter();
    const [dadosAluno, setDadosAluno] = useState<alunoData | null>(null);
    const [mostrarModalEdicao, setMostrarModalEdicao] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/loginPage');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Busca os dados do aluno
                const response = await getInfoAluno();
                const aluno: alunoData = response.data;
                console.log(aluno);
                setDadosAluno(aluno);

            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                localStorage.removeItem('token');
                router.push('/loginPage');
            }
        };

        fetchData();
    }, [router]);

    const calcularResumo = () => {
        if (!dadosAluno?.matriculasDisciplinas) return { cursosAtivos: 0, mediaGeral: 'N/A', pendencias: 'Nenhuma' };

        const disciplinasAluno = dadosAluno.matriculasDisciplinas;

        const cursosAtivos = disciplinasAluno.length;

        const medias = disciplinasAluno.map(d => d.media ?? 0);
        const mediaGeral = medias.length
            ? (medias.reduce((a, b) => a + b, 0) / medias.length).toFixed(1)
            : 'N/A';

        return { cursosAtivos, mediaGeral, pendencias: 'Nenhuma' };
    };

    const montarCursosParaComponente = () => {
        if (!dadosAluno?.matriculasDisciplinas) return [];

        return dadosAluno.matriculasDisciplinas.map((disciplinaAluno) => {
            // Busca a disciplina pelo ID

            return {
                nome: disciplinaAluno.disciplinaId ? disciplinaAluno.disciplinaId : `ID: ${disciplinaAluno.disciplinaId}`,
                codigo: disciplinaAluno.disciplinaId,
                nota: disciplinaAluno.media ?? "0.0",
                status: disciplinaAluno.media != null ? (disciplinaAluno.media >= 6 ? 'Aprovado' : 'Reprovado') : 'Em Andamento',
            };
        });
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