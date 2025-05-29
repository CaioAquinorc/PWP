import api from "./api";

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

export const criarUsuario: any = ( 
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
            Authorization:'Bearer '+localStorage.getItem('token')
        },
        data
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}

export const getAluno: any = (matricula: string) => {

    api.get('/api/admin/alunos/'+matricula, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}

export const getAlunoList: any = () => {

    api.get('/api/admin/alunos', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}

export const atualizarAluno: any = ( matricula: string, aluno: Partial<alunoData>) => {

    const data: alunoData = {};

    for (const chave in aluno) {
        if (chave !== 'pessoa') {
            data[chave] = aluno[chave];
        }
    }

    if (aluno.pessoa) {
    data.pessoa = aluno.pessoa;
    }

    api.put('http://localhost:3000/api/admin/alunos/'+matricula, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
        data
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}

export const apagarAluno: any = ( matricula: string ) => {

    api.delete('/api/admin/alunos/'+matricula, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}

export const criarProfessor: any = ( 
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

    api.post('/api/admin/professores', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
        data
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}

export const getProfessor: any = ( matricula: string ) => {

    api.get('/api/admin/professores/'+matricula, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));

}

export const getProfessorList: any = () => {

    api.get('/api/admin/professores', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));

}

export const atualizarProfessor: any = ( matricula: string, professor: Partial<professorData>) => {

    const data: professorData = {};

    for (const chave in professor) {
        if (chave !== 'pessoa') {
            data[chave] = professor[chave];
        }
    }

    if (professor.pessoa) {
    data.pessoa = professor.pessoa;
    }

    api.put('http://localhost:3000/api/admin/professores/'+matricula, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
        data
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}

export const apagarProfessor: any = ( matricula: string ) => {

    api.delete('/api/admin/professores/'+matricula, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}

export const criarDisciplina: any = ( 
    id: string,
    nome: string,
    carga_horaria: string,
    professor: Partial<professorData>
    ) => {

    const data: diciplinaData =  {
        id,
        nome,
        carga_horaria,
        professor
    }

    api.post('/api/admin/disciplinas', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
        data
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}

export const getDiciplina: any = ( id: string ) => {

    api.get('/api/admin/disciplinas/'+id, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));

}

export const getDiciplinaList: any = () => {

    api.get('/api/admin/disciplinas', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));

}

export const atualizarDiciplina: any = ( id: string, diciplina: Partial<diciplinaData>) => {

    const data: diciplinaData = {};

    for (const chave in diciplina) {
        if (chave !== 'professor') {
            data[chave] = diciplina[chave];
        }
    }

    if (diciplina.professor) {
    data.professor = diciplina.professor;
    }

    api.put('/api/admin/disciplinas/'+id, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
        data
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}

export const apagarDiciplina: any = ( id: string ) => {

    api.delete('/api/admin/disciplinas/'+id, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}

export const vincularProfessorDiciplina: any = ( id: string, matricula: string ) => {

    const data = {
        disciplinaId: id,
        professorMatricula: "20250136812-02"
    }

    api.post('/api/admin/disciplinas/vincular-professor', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
        data
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}

export const desvincularProfessorDiciplina: any = ( id: string,) => {

    api.delete('/api/admin/disciplinas/'+id+'/desvincular-professor', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}

export const vincularAlunoDiciplina: any = ( 
    id: string,
    matricula: string,
    turno: string,
    data_inicio_semestre: string,
    data_termino_semestre: string
) => {

    const data = {
        alunoMatricula: matricula,
        disciplinaId: id,
        turno: turno,
        data_inicio_semestre: data_inicio_semestre,
        data_termino_semestre: data_termino_semestre
    }

    api.post('/api/admin/disciplinas/vincular-aluno', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
        data
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}

export const atualizarNotaAluno: any = ( id: string, matricula: string, nota_1: number, nota_2: number) => {

    const data = {
        nota_1: nota_1,
        nota_2: nota_2
    };

    api.put('/api/admin/disciplinas/'+id+'/atualizar-nota/'+matricula, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
        data
    })
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}