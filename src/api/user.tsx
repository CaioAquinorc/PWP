import api from "./api";

export const loginUsuario = ( matricula: string, senha: string ) => {

    const data = {
        matricula: matricula,
        senha: senha
    };

    api.post('/api/usuario/login', data)
    .then((res) => {return res.data})
    .catch((err) => console.error(err));
}