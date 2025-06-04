import props from "@/types/props";
import './resumoAcademico.css'


export default function ResumoAcademico({ cursosAtivos, mediaGeral, pendencias } : props) {
    return (
        <section className="card section-col-summary">
            <h2 className="section-title">Resumo Acadêmico</h2>
            <div className="summary-items">
                <div className="summary-item summary-item-blue">
                    <span className="summary-label">Cursos Ativos:</span>
                    <span className="summary-value">{cursosAtivos}</span>
                </div>
                <div className="summary-item summary-item-green">
                    <span className="summary-label">Média Geral:</span>
                    <span className="summary-value">{mediaGeral}</span>
                </div>
                <div className="summary-item summary-item-yellow">
                    <span className="summary-label">Pendências:</span>
                    <span className="summary-value">{pendencias}</span>
                </div>
            </div>
        </section>
    );
}