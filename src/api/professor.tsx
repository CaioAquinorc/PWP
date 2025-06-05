import api from "./api";
import { professorData } from "@/types/datatype";

export const getInfoProfessor: any = async () => {

    return await api.get('/api/professor/infoprofessor', {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        },
    });

}

export const atualizarProfessor: any = async ( professor: Partial<professorData>) => {

    const data: professorData = {};

    for (const chave in professor) {
        if (chave !== 'pessoa') {
            data[chave] = professor[chave];
        }
    }

    if (professor.pessoa) {
    data.pessoa = professor.pessoa;
    }

    console.log(data);

    return await api.put('/api/professor/atualizaprofessor', data, {
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token')
        }
    });
}