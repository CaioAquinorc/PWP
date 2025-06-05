"use client";

import { useEffect, useState } from "react";
import { criarDisciplina, getProfessorList } from "@/api/admin";
import { professorData } from "@/types/datatype";
import "./cursoManagement.css";

export default function DisciplinaManagement() {
  const [idDisciplina, setIdDisciplina] = useState('');
  const [nomeDisciplina, setNomeDisciplina] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [professorSelecionado, setProfessorSelecionado] = useState('');
  const [professores, setProfessores] = useState<professorData[]>([]);
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState<'erro' | 'sucesso' | ''>('');

  useEffect(() => {
    getProfessorList()
      .then(response => {
        setProfessores(response.data || []);
      })
      .catch(() => {
        setMensagem('Erro ao carregar a lista de professores.');
        setTipoMensagem('erro');
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idDisciplina || !nomeDisciplina || !cargaHoraria || !professorSelecionado) {
      setMensagem('Preencha todos os campos obrigatórios.');
      setTipoMensagem('erro');
      return;
    }

    const professor = professores.find(p => p.pessoa?.matricula === professorSelecionado);
    if (!professor) {
      setMensagem('Professor selecionado inválido.');
      setTipoMensagem('erro');
      return;
    }

    try {
      await criarDisciplina(idDisciplina, nomeDisciplina, cargaHoraria, professor);
      setMensagem('Disciplina cadastrada com sucesso!');
      setTipoMensagem('sucesso');

      setIdDisciplina('');
      setNomeDisciplina('');
      setCargaHoraria('');
      setProfessorSelecionado('');
    } catch (error) {
      console.error("Erro ao criar disciplina:", error);
      setMensagem('Erro ao cadastrar disciplina. Verifique os dados ou tente novamente.');
      setTipoMensagem('erro');
    }
  };

  return (
    <section className="card section-col">
      <h2 className="section-title">Disciplinas</h2>

      <div className="form-container mb-8">
        <h3 className="form-subtitle">Cadastrar Disciplina</h3>
        <form onSubmit={handleSubmit} className="form-space-y-4">
          <div>
            <label className="label-text">Código da Disciplina</label>
            <input
              type="text"
              className="input-field"
              value={idDisciplina}
              onChange={(e) => setIdDisciplina(e.target.value)}
              placeholder="Ex: CII-N-101"
            />
          </div>
          <div>
            <label className="label-text">Nome da Disciplina</label>
            <input
              type="text"
              className="input-field"
              value={nomeDisciplina}
              onChange={(e) => setNomeDisciplina(e.target.value)}
              placeholder="Ex: Cálculo II"
            />
          </div>
          <div>
            <label className="label-text">Carga Horária</label>
            <input
              type="text"
              className="input-field"
              value={cargaHoraria}
              onChange={(e) => setCargaHoraria(e.target.value)}
              placeholder="Ex: 60"
            />
          </div>
          <div>
            <label className="label-text">Professor</label>
            <select
              className="input-field"
              value={professorSelecionado}
              onChange={(e) => setProfessorSelecionado(e.target.value)}
            >
              <option value="">Selecione um professor</option>
              {professores.map((prof) => (
                <option key={prof.pessoa?.matricula} value={prof.pessoa?.matricula}>
                  {prof.pessoa?.nome} {prof.pessoa?.sobrenome}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-primary w-full">Cadastrar Disciplina</button>
        </form>

        {mensagem && (
          <p style={{
            marginTop: '1rem',
            color: tipoMensagem === 'erro' ? 'red' : 'green',
            fontWeight: 'bold'
          }}>
            {mensagem}
          </p>
        )}
      </div>
    </section>
  );
}
