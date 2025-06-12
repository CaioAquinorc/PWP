export type pessoaData = {
    matricula?: string,
    nome?: string, 
    sobrenome?: string, 
    data_nascimento?: string, 
    email?: string,
    telefone?:string,
    cpf?:string
}

export type alunoData = {
    periodo?: string,
    pessoa?: pessoaData,
    matriculasDisciplinas?: alunoDisciplinaData[];
}

export type professorData = {
    pessoa?: pessoaData,
    data_contrato?: string
    disciplinas?: diciplinaData[];
}

export type diciplinaData = {
    id?: string,
    nome?: string,
    carga_horaria?: string,
    professor?: professorData
}

export interface MyTokenPayload {
  sub: string;
  role: string;
  exp: number;
  iat: number;
}

export type alunoDisciplinaData = {
  alunoMatricula: string;
  disciplinaId: string;
  nota_1: number | null;
  nota_2: number | null;
  media: number | null;
  turno: string;
  data_inicio_semestre: string;
  data_termino_semestre: string;
}

export type alunosNaDisciplinaData = {
  matricula: string;
  nome: string;
  sobrenome: string;
  email: string;
  nota_1: number | null;
  nota_2: number | null;
  media: number | null;
}