"use client";
import { useState } from "react";
import { criarProfessor } from "@/api/admin";
import "./professorManagement.css";

export default function ProfessorManagement() {
  const [cpf, setCpf] = useState('');
  const [curso, setCurso] = useState('');
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState<'erro' | 'sucesso' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !sobrenome || !dataNascimento || !telefone || !cpf || !email) {
      setMensagem("Preencha todos os campos obrigatórios.");
      setTipoMensagem("erro");
      return;
    }

    try {
      await criarProfessor(
        nome.trim(),
        sobrenome.trim(),
        dataNascimento,
        email.trim(),
        telefone.trim(),
        cpf.trim()
      );

      setMensagem("Professor cadastrado com sucesso!");
      setTipoMensagem("sucesso");

      // Resetar campos
      setNome('');
      setSobrenome('');
      setDataNascimento('');
      setTelefone('');
      setCpf('');
      setCurso('');
      setEmail('');
    } catch (error) {
      console.error("Erro ao cadastrar professor:", error);
      setMensagem("Erro ao cadastrar professor. Verifique os dados ou tente novamente.");
      setTipoMensagem("erro");
    }
  };

  return (
    <section className="card section-col">
      <h2 className="section-title">Professores</h2>

      <div className="form-container mb-8">
        <h3 className="form-subtitle">Cadastrar Professor</h3>
        <form onSubmit={handleSubmit} className="form-space-y-4">
          <div>
            <label className="label-text">Nome</label>
            <input
              type="text"
              className="input-field"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Maria"
            />
          </div>
          <div>
            <label className="label-text">Sobrenome</label>
            <input
              type="text"
              className="input-field"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              placeholder="Ex: Oliveira"
            />
          </div>
          <div>
            <label className="label-text">Data de Nascimento</label>
            <input
              type="date"
              className="input-field"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
          </div>
          <div>
            <label className="label-text">Telefone</label>
            <input
              type="text"
              className="input-field"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Ex: (11) 91234-5678"
            />
          </div>
          <div>
            <label htmlFor="cpf" className="label-text">CPF do Professor</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              className="input-field"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Ex: 00000000000"
            />
          </div>
          <div>
            <label htmlFor="curso" className="label-text">Código do Curso</label>
            <input
              type="text"
              id="curso"
              name="curso"
              className="input-field"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              placeholder="Ex: CII-N-101"
            />
          </div>
          <div>
            <label htmlFor="email" className="label-text">E-mail do Professor</label>
            <input
              type="email"
              id="email"
              name="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: professor@email.com"
            />
          </div>
          <button type="submit" className="btn-primary w-full">Cadastrar Professor</button>
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