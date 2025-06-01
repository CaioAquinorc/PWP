export type pessoaData = {
    nome?: string, 
    sobrenome?: string, 
    dataNascimento?: string, 
    email?: string,
    telefone?:string,
    cpf?:string
}

export type alunoData = {
    matricula?: string,
    periodo?: string,
    pessoa?: pessoaData
}

export type professorData = {
    matricula?: string,
    pessoa?: pessoaData
}

export type diciplinaData = {
id?: string,
nome?: string,
carga_horaria?: string,
professor?: professorData
}