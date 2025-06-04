import * as React from 'react';

export type props = {
    label?: string;
    children?: React.ReactNode;
    name?: string;
    type?: string;
    url?: string;
    onChange?: any;
    onClick?: any;
    titulo?: any; 
    subtitulo?: any
    aluno?: any;
    addAluno?: any;
    professor?: any;
    addProfessor?: any;
    cursos?: any
    addCurso?: any;
    nomeProfessor?: any;
    disciplinas?: any;
    onSelecionarDisciplina?: any;
    mostrar?: any;
    onFechar?: any;
    todosAlunos?: any;
    alunosNaDisciplinaAtual?: any;
    onVincularAluno?: any;
    idDisciplinaSelecionada?: any;
    disciplinaSelecionada?: any;
    alunosNaDisciplina?: any;
    onAtualizarNotas?: any;
    onAdicionarAlunoNaDisciplina?: any;
    onVoltarParaDisciplinas?: any;
    onMostrarModalVincularAluno?: any;
    OnLogOut?: any;
}

export default props;