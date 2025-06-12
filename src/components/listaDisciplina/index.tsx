"use client";
import React from 'react';
import './listaDisciplina.css';
import { diciplinaData } from "@/types/datatype";

export type DisciplinaComTotal = diciplinaData & {
  totalAlunos: number;
};

export interface ListaDisciplinasProps {
  disciplinas: DisciplinaComTotal[];
  onSelecionarDisciplina: (id: string) => void;
}

export default function ListaDisciplinas({ disciplinas = [], onSelecionarDisciplina }: ListaDisciplinasProps) {
    return (
        <section className="card section-col">
            <h2 className="section-title">Minhas Disciplinas</h2>
            <div className="discipline-cards-container">
                {disciplinas.map((disciplina) => (
                    <div key={disciplina.id} className="discipline-card">
                        <div>
                            <h3 className="discipline-card-title">{disciplina.nome}</h3>
                            <p className="discipline-card-info">Código: <b>{disciplina.id}</b></p>
                            <p className="discipline-card-info">Total de Alunos: <b>{disciplina.totalAlunos ?? 0}</b></p>
                        </div>
                        <button
                            className="btn-secondary"
                            onClick={() => onSelecionarDisciplina(disciplina.id ?? "")}
                        >
                            Gerenciar Notas
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}