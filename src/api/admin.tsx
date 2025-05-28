import api from "./api";

export type pessoaData = {
    nome: string, 
    sobrenome: string, 
    dataNascimento: string, 
    email: string,
    telefone:string,
    cpf:string
}

export type alunoData = {
    periodo?: string,
    pessoa?: pessoaData
}

export const registrarUsuario = ( 
    nome: string, 
    sobrenome: string, 
    dataNascimento: string, 
    email: string,
    telefone:string,
    cpf:string
) => {

    const data = {
        nome: nome,
        sobrenome: sobrenome,
        data_nascimento: dataNascimento,
        email: email,
        telefone: telefone,
        cpf: cpf
    };

    api.post('/api/admin/alunos', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('user')
        },
        data
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}

export const getAluno = (id: string) => {

    api.get('/api/admin/alunos/'+id, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('user')
        },
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}

export const getAlunoList = () => {

    api.get('/api/admin/alunos', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('user')
        },
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}

export const atualizarAluno = ( id: string, aluno: Partial<alunoData>) => {

    const data: alunoData = {};

    for (const chave in aluno) {
        if (chave !== 'pessoa') {
            data[chave] = aluno[chave];
        }
    }

    if (aluno.pessoa) {
    data.pessoa = aluno.pessoa;
    }

    api.get('http://localhost:3000/api/admin/alunos/'+id, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('user')
        },
        data
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}