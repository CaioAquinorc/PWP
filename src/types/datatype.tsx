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
    matricula?: string,
    periodo?: string,
    pessoa?: pessoaData,
    alunoDiciplina?: AlunoDisciplinaData;
}

export type professorData = {
    pessoa?: pessoaData,
    data_contrato?: string
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

export type AlunoDisciplinaData = {
  alunoMatricula: string;
  disciplinaId: string;
  nota_1: number | null;
  nota_2: number | null;
  media: number | null;
  turno: string;
  data_inicio_semestre: string;
  data_termino_semestre: string;
}