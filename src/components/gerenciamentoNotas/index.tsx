import { useEffect, useState } from "react";
import { diciplinaData, alunosNaDisciplinaData } from "@/types/datatype";
import './gerenciamentoNotas.css';

interface GerenciamentoNotasProps {
    disciplinaSelecionada: diciplinaData;
    alunosNaDisciplina: alunosNaDisciplinaData[];
    onAtualizarNotas: (
        disciplinaId: string,
        alunoId: string,
        campoNota: 'nota_1' | 'nota_2',
        novaNota: number
    ) => void;
    onVoltarParaDisciplinas: () => void;
}

export default function GerenciamentoNotas({
    disciplinaSelecionada,
    alunosNaDisciplina,
    onAtualizarNotas,
    onVoltarParaDisciplinas
}: GerenciamentoNotasProps) {
    const [notasAlunosLocais, setNotasAlunosLocais] = useState<alunosNaDisciplinaData[]>([]);

    useEffect(() => {
        // Inicializa o estado local com os dados recebidos
        setNotasAlunosLocais(alunosNaDisciplina.map(aluno => ({ ...aluno })));
    }, [alunosNaDisciplina]);

    const handleMudancaNotaLocal = (matricula: string, campoNota: 'nota_1' | 'nota_2', valor: string) => {
        const valorNumerico = parseFloat(valor);
        setNotasAlunosLocais(prevNotas =>
            prevNotas.map(aluno =>
                aluno.matricula === matricula
                    ? { ...aluno, [campoNota]: isNaN(valorNumerico) ? 0 : valorNumerico }
                    : aluno
            )
        );
    };

    const handleSalvarNotas = (matricula: string) => {
        const alunoParaSalvar = notasAlunosLocais.find(a => a.matricula === matricula);
        if (alunoParaSalvar) {
            onAtualizarNotas(disciplinaSelecionada.id!, matricula, 'nota_1', alunoParaSalvar.nota_1 ?? 0);
            onAtualizarNotas(disciplinaSelecionada.id!, matricula, 'nota_2', alunoParaSalvar.nota_2 ?? 0);
        }
    };

    return (
        <section className="card section-col">
            <h2 className="section-title">
                Gerenciar Notas: {disciplinaSelecionada.nome}
            </h2>

            <div className="mb-8">
                <h3 className="form-subtitle">Notas dos Alunos</h3>
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead className="table-header">
                            <tr>
                                <th scope="col" className="rounded-tl-lg-th">Nome</th>
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
                                    <td colSpan={5} className="text-center py-4 text-gray-500">
                                        Nenhum aluno matriculado nesta disciplina.
                                    </td>
                                </tr>
                            ) : (
                                notasAlunosLocais.map((aluno) => (
                                    <tr key={aluno.matricula}>
                                        <td>{aluno.nome}</td>
                                        <td>{aluno.matricula}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={aluno.nota_1 ?? ''}
                                                step="0.1"
                                                min="0"
                                                max="10"
                                                className="input-field-small"
                                                onChange={(e) =>
                                                    handleMudancaNotaLocal(aluno.matricula, 'nota_1', e.target.value)
                                                }
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={aluno.nota_2 ?? ''}
                                                step="0.1"
                                                min="0"
                                                max="10"
                                                className="input-field-small"
                                                onChange={(e) =>
                                                    handleMudancaNotaLocal(aluno.matricula, 'nota_2', e.target.value)
                                                }
                                            />
                                        </td>
                                        <td>{(((aluno.nota_1 ?? 0) + (aluno.nota_2 ?? 0)) / 2).toFixed(1)}</td>
                                        <td>
                                            <button
                                                className="btn-primary btn-salvar-nota"
                                                onClick={() => handleSalvarNotas(aluno.matricula)}
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