'use client';
import React, { useEffect, useState } from 'react';
import {
  vincularAlunoDiciplina,
  getDiciplinaList,
  getAlunoList,
} from '@/api/admin';
import { diciplinaData, alunoData } from '@/types/datatype';

const VincularAlunoForm = () => {
  const [disciplinas, setDisciplinas] = useState<diciplinaData[]>([]);
  const [alunos, setAlunos] = useState<alunoData[]>([]);

  const [disciplinaId, setDisciplinaId] = useState('');
  const [matriculaAluno, setMatriculaAluno] = useState('');
  const [turno, setTurno] = useState<'manha' | 'noite'>('manha');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [disciplinasRes, alunosRes] = await Promise.all([
          getDiciplinaList(),
          getAlunoList(),
        ]);
        setDisciplinas(disciplinasRes.data);
        setAlunos(alunosRes.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao carregar disciplinas ou alunos.');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await vincularAlunoDiciplina(disciplinaId, matriculaAluno, turno, inicio, fim);
      alert('Aluno vinculado com sucesso!');
      setDisciplinaId('');
      setMatriculaAluno('');
      setInicio('');
      setFim('');
    } catch (error) {
      console.error(error);
      alert('Erro ao vincular aluno à disciplina.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md w-[300px] flex flex-col gap-3"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-2">Vincular Aluno</h3>

      <div>
        <label className="text-sm font-semibold text-gray-700">Disciplina</label>
        <select
          value={disciplinaId}
          onChange={(e) => setDisciplinaId(e.target.value)}
          required
          className="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg outline-none"
        >
          <option value="">Selecione uma disciplina</option>
          {disciplinas.map((disciplina) => (
            <option key={disciplina.id} value={disciplina.id}>
              {disciplina.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">Aluno</label>
        <select
          value={matriculaAluno}
          onChange={(e) => setMatriculaAluno(e.target.value)}
          required
          className="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg outline-none"
        >
          <option value="">Selecione um aluno</option>
          {alunos.map((aluno) => (
            <option key={aluno.pessoa?.matricula} value={aluno.pessoa?.matricula}>
              {aluno.pessoa?.nome} ({aluno.pessoa?.matricula})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">Turno</label>
        <div className="flex gap-4 mt-2 mb-2">
          {['manha', 'noite'].map((opcao) => (
            <label
              key={opcao}
              className="flex items-center text-sm font-medium text-gray-700 cursor-pointer"
            >
              <input
                type="radio"
                name="turno"
                value={opcao}
                checked={turno === opcao}
                onChange={() => setTurno(opcao as 'manha' | 'noite')}
                className="peer hidden"
              />
              <span className="w-5 h-5 mr-2 rounded-full border-2 border-gray-400 flex items-center justify-center peer-checked:border-blue-700 peer-focus:ring-2 peer-focus:ring-blue-300">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-1000 peer-checked:block hidden"></span>
              </span>
              {opcao.charAt(0).toUpperCase() + opcao.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">Início do Semestre</label>
        <input
          type="date"
          value={inicio}
          onChange={(e) => setInicio(e.target.value)}
          required
          className="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg outline-none"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">Término do Semestre</label>
        <input
          type="date"
          value={fim}
          onChange={(e) => setFim(e.target.value)}
          required
          className="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg outline-none"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
      >
        Vincular Aluno
      </button>
    </form>
  );
};

export default VincularAlunoForm;