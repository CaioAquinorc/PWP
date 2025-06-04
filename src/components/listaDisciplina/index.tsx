"use client"
import props from '@/types/props';
import React, { useState } from 'react';
import './listaDisciplina.css'

export default function ListaDisciplinas({ disciplinas = [], onSelecionarDisciplina } : props) {
    return (
        <section className="card section-col">
            <h2 className="section-title">Minhas Disciplinas</h2>
            <div className="discipline-cards-container">
                {disciplinas.map((disciplina) => (
                    <div key={disciplina.id} className="discipline-card">
                        <div>
                            <h3 className="discipline-card-title">{disciplina.nome}</h3>
                            <p className="discipline-card-info">Código: <b>{disciplina.id}</b></p>
                            <p className="discipline-card-info">Total de Alunos: <b>{disciplina.totalAlunos}</b></p>
                        </div>
                        <button
                            className="btn-secondary"
                            onClick={() => onSelecionarDisciplina(disciplina.id)}
                        >
                            Gerenciar Notas
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}