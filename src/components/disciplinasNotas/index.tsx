import props from "@/types/props";

export default function DisciplinasENotas({ cursos } : props) {
    return (
        <section className="card section-col-courses">
            <h2 className="section-title">Minhas Disciplinas e Notas</h2>
            <div className="table-container">
                <table className="data-table">
                    <thead className="table-header">
                        <tr>
                            <th>Disciplina</th>
                            <th>Código</th>
                            <th>Professor</th>
                            <th>Nota</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {cursos.map((curso, index) => {
                            let classeCorStatus = '';
                            if (curso.status === 'Aprovado') {
                                classeCorStatus = 'status-approved';
                            } else if (curso.status === 'Em Andamento') {
                                classeCorStatus = 'status-in-progress';
                            } else if (curso.status === 'Reprovado') {
                                classeCorStatus = 'status-failed';
                            }
                            return (
                                <tr key={index}>
                                    <td>{curso.nome}</td>
                                    <td>{curso.codigo}</td>
                                    <td>{curso.professor}</td>
                                    <td>{curso.nota}</td>
                                    <td className={`font-semibold ${classeCorStatus}`}>{curso.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}