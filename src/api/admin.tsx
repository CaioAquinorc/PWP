import api from "./api";
import { alunoData, professorData, diciplinaData } from "@/types/datatype";

export const criarUsuario = async ( 
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

    return await api.post('/api/admin/alunos',data, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        }
    });
}

export const getAluno = async (matricula: string) => {

    return await api.get('/api/admin/alunos/'+matricula, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    });
}

export const getAlunoList = async () => {

    return await api.get('/api/admin/alunos', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    });
}

export const atualizarAluno = async ( matricula: string, aluno: Partial<alunoData>) => {

    const data: alunoData = {};

    for (const chave in aluno) {
        if (chave !== 'pessoa') {
            data[chave] = aluno[chave];
        }
    }

    if (aluno.pessoa) {
    data.pessoa = aluno.pessoa;
    }

    return await api.put('/api/admin/alunos/'+matricula, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
        data
    });
}

export const apagarAluno = async ( matricula: string ) => {

    return await api.delete('/api/admin/alunos/'+matricula, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    });
}

export const criarProfessor =  async ( 
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

    return await api.post('/api/admin/professores', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
        data
    });
}

export const getProfessor = async ( matricula: string ) => {

    return await api.get('/api/admin/professores/'+matricula, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    });

}

export const getProfessorList = async () => {

    return await api.get('/api/admin/professores', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    });

}

export const atualizarProfessor = async ( matricula: string, professor: Partial<professorData>) => {

    const data: professorData = {};

    for (const chave in professor) {
        if (chave !== 'pessoa') {
            data[chave] = professor[chave];
        }
    }

    if (professor.pessoa) {
    data.pessoa = professor.pessoa;
    }

    return await api.put('/api/admin/professores/'+matricula, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
        data
    });
}

export const apagarProfessor = async ( matricula: string ) => {

    return await api.delete('/api/admin/professores/'+matricula, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    });
}

export const criarDisciplina = async ( 
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

    return await api.post('/api/admin/disciplinas', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
        data
    });
}

export const getDiciplina = async ( id: string ) => {

    return await api.get('/api/admin/disciplinas/'+id, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    });

}

export const getDiciplinaList = async () => {

    return await api.get('/api/admin/disciplinas', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    });

}

export const atualizarDiciplina = async ( id: string, diciplina: Partial<diciplinaData>) => {

    const data: diciplinaData = {};

    for (const chave in diciplina) {
        if (chave !== 'professor') {
            data[chave] = diciplina[chave];
        }
    }

    if (diciplina.professor) {
    data.professor = diciplina.professor;
    }

    return await api.put('/api/admin/disciplinas/'+id, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
        data
    });
}

export const apagarDiciplina = async ( id: string ) => {

    return await api.delete('/api/admin/disciplinas/'+id, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    });
}

export const vincularProfessorDiciplina = async ( id: string, matricula: string ) => {

    const data = {
        disciplinaId: id,
        professorMatricula: matricula
    }

    return await api.post('/api/admin/disciplinas/vincular-professor', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
        data
    });
}

export const desvincularProfessorDiciplina = async ( id: string,) => {

    return await api.delete('/api/admin/disciplinas/'+id+'/desvincular-professor', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    });
}

export const vincularAlunoDiciplina = async ( 
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

    return await api.post('/api/admin/disciplinas/vincular-aluno', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
        data
    });
}

export const atualizarNotaAluno = async ( id: string, matricula: string, nota_1: number, nota_2: number) => {

    const data = {
        nota_1: nota_1,
        nota_2: nota_2
    };

    return await api.put('/api/admin/disciplinas/'+id+'/atualizar-nota/'+matricula, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
        data
    });
}