import api from "./api";
import { alunoData } from "@/types/datatype";

export const getInfoAluno: any = async () => {

    return await api.get('/api/aluno/infoaluno', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    });
}

export const atualizarAluno: any = async ( aluno: Partial<alunoData> ) => {

    const data: alunoData = {};

    for (const chave in aluno) {
        if (chave !== 'pessoa') {
            data[chave] = aluno[chave];
        }
    }

    if (aluno.pessoa) {
    data.pessoa = aluno.pessoa;
    }

    return await api.put('/api/aluno/atualizaaluno', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
        data
    });
}