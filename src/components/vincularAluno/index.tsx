import props from "@/types/props";
import { useState } from "react";
import './vincularAluno.css'

export default function VincularAluno({
    mostrar,
    onFechar,
    todosAlunos,
    alunosNaDisciplinaAtual,
    onVincularAluno,
    idDisciplinaSelecionada
} : props) {
    const [alunoSelecionadoParaVincular, setAlunoSelecionadoParaVincular] = useState('');
    const [termoPesquisa, setTermoPesquisa] = useState('');

    const alunosDisponiveisFiltrados = todosAlunos.filter(
        (aluno) =>
            !alunosNaDisciplinaAtual.some((a) => a.id === aluno.id) &&
            (aluno.name.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
             aluno.id.toLowerCase().includes(termoPesquisa.toLowerCase()))
    );

    const handleVincular = () => {
        if (alunoSelecionadoParaVincular) {
            const alunoParaVincular = todosAlunos.find(a => a.id === alunoSelecionadoParaVincular);
            if (alunoParaVincular) {
                onVincularAluno(idDisciplinaSelecionada, alunoParaVincular.name, alunoParaVincular.id);
                setAlunoSelecionadoParaVincular('');
                setTermoPesquisa('');
                onFechar();
            }
        }
    };

    if (!mostrar) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 className="modal-title">Vincular Aluno Existente</h3>
                <div className="modal-body">
                    <div className="mb-4">
                        <label htmlFor="pesquisarAluno" className="label-text mb-2">Pesquisar por Nome ou Matrícula:</label>
                        <input
                            type="text"
                            id="pesquisarAluno"
                            className="input-field"
                            placeholder="Pesquisar aluno..."
                            value={termoPesquisa}
                            onChange={(e) => setTermoPesquisa(e.target.value)}
                        />
                    </div>

                    {alunosDisponiveisFiltrados.length === 0 && termoPesquisa !== '' ? (
                        <p className="text-gray-600">Nenhum aluno encontrado com a pesquisa.</p>
                    ) : alunosDisponiveisFiltrados.length === 0 && termoPesquisa === '' ? (
                        <p className="text-gray-600">Todos os alunos disponíveis já estão nesta disciplina ou não há alunos para vincular.</p>
                    ) : (
                        <>
                            <label htmlFor="selecionarAlunoVincular" className="label-text mb-2">Selecione um aluno:</label>
                            <select
                                id="selecionarAlunoVincular"
                                className="input-field"
                                value={alunoSelecionadoParaVincular}
                                onChange={(e) => setAlunoSelecionadoParaVincular(e.target.value)}
                            >
                                <option value="">-- Selecione --</option>
                                {alunosDisponiveisFiltrados.map((aluno) => (
                                    <option key={aluno.id} value={aluno.id}>
                                        {aluno.name} (Matrícula: {aluno.id})
                                    </option>
                                ))}
                            </select>
                        </>
                    )}
                </div>
                <div className="modal-footer">
                    <button className="btn-secondary" onClick={() => { onFechar(); setTermoPesquisa(''); setAlunoSelecionadoParaVincular(''); }}>Cancelar</button>
                    <button className="btn-primary" onClick={handleVincular} disabled={!alunoSelecionadoParaVincular || alunosDisponiveisFiltrados.length === 0}>
                        Vincular Aluno
                    </button>
                </div>
            </div>
        </div>
    );
}