import props from "@/types/props";
import { useEffect, useState } from "react";
import './gerenciamentoNotas.css'

export default function GerenciamentoNotas({
    disciplinaSelecionada,
    alunosNaDisciplina,
    onAtualizarNotas,
    onAdicionarAlunoNaDisciplina,
    onVoltarParaDisciplinas,
    onMostrarModalVincularAluno,
    todosAlunos
} : props) {
    const [notasAlunosLocais, setNotasAlunosLocais] = useState([]);

    useEffect(() => {
        setNotasAlunosLocais(alunosNaDisciplina.map(aluno => ({ ...aluno })));
    }, [alunosNaDisciplina]);

    const handleMudancaNotaLocal = (idAluno, campoNota, valor) => {
        setNotasAlunosLocais(prevNotas =>
            prevNotas.map(aluno =>
                aluno.id === idAluno ? { ...aluno, [campoNota]: parseFloat(valor) || 0 } : aluno
            )
        );
    };

    const handleSalvarNotas = (idAluno) => {
        const alunoParaSalvar = notasAlunosLocais.find(a => a.id === idAluno);
        if (alunoParaSalvar) {
            onAtualizarNotas(disciplinaSelecionada.id, idAluno, 'grade1', alunoParaSalvar.grade1);
            onAtualizarNotas(disciplinaSelecionada.id, idAluno, 'grade2', alunoParaSalvar.grade2);
            // console.log(`Notas de ${alunoParaSalvar.id} salvas!`);
        }
    };

    return (
        <section className="card section-col">
            <h2 className="section-title">Gerenciar Notas: {disciplinaSelecionada.nome}</h2>

            <div className="form-container mb-8">
                <button className="btn-primary w-full" onClick={onMostrarModalVincularAluno}>
                    Vincular Aluno Existente
                </button>
            </div>

            <div className="mb-8">
                <h3 className="form-subtitle">Notas dos Alunos em {disciplinaSelecionada.id}</h3>
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead className="table-header">
                            <tr>
                                <th scope="col" className="rounded-tl-lg-th">Matrícula</th>
                                <th scope="col">Nota 1</th>
                                <th scope="col">Nota 2</th>
                                <th scope="col">Média</th>
                                <th scope="col" className="rounded-tr-lg-th">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {notasAlunosLocais.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-500">Nenhum aluno matriculado nesta disciplina.</td>
                                </tr>
                            ) : (
                                notasAlunosLocais.map((aluno) => (
                                    <tr key={aluno.id}>
                                        <td>{aluno.id}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={aluno.grade1}
                                                step="0.1"
                                                min="0"
                                                max="10"
                                                className="input-field-small"
                                                onChange={(e) => handleMudancaNotaLocal(aluno.id, 'grade1', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={aluno.grade2}
                                                step="0.1"
                                                min="0"
                                                max="10"
                                                className="input-field-small"
                                                onChange={(e) => handleMudancaNotaLocal(aluno.id, 'grade2', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            {((aluno.grade1 + aluno.grade2) / 2).toFixed(1)}
                                        </td>
                                        <td>
                                            <button
                                                className="btn-primary btn-salvar-nota"
                                                onClick={() => handleSalvarNotas(aluno.id)}
                                            >
                                                Salvar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <button className="btn-secondary" onClick={onVoltarParaDisciplinas}>
                Voltar para Disciplinas
            </button>
        </section>
    );
}