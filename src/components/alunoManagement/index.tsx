"use client";
import { useState } from "react";
import { criarUsuario } from "@/api/admin";
import "./alunoManagement.css";

export default function AlunoManagement() {
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState<'erro' | 'sucesso' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples
    if (!cpf || !email || !nome || !sobrenome || !dataNascimento || !telefone) {
      setMensagem('Preencha todos os campos obrigatórios.');
      setTipoMensagem('erro');
      return;
    }

    try {
      await criarUsuario(nome, sobrenome, dataNascimento, email, telefone, cpf);
      setMensagem('Aluno matriculado com sucesso!');
      setTipoMensagem('sucesso');

      // Limpar os campos
      setCpf('');
      setEmail('');
      setNome('');
      setSobrenome('');
      setDataNascimento('');
      setTelefone('');
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
      setMensagem('Erro ao matricular aluno. Verifique os dados ou tente novamente.');
      setTipoMensagem('erro');
    }
  };

  return (
    <section className="card section-col">
      <h2 className="section-title">Alunos</h2>

      <div className="form-container mb-8">
        <h3 className="form-subtitle">Matricular Aluno</h3>
        <form onSubmit={handleSubmit} className="form-space-y-4">
          <div>
            <label className="label-text">Nome</label>
            <input
              type="text"
              className="input-field"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: João"
            />
          </div>
          <div>
            <label className="label-text">Sobrenome</label>
            <input
              type="text"
              className="input-field"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              placeholder="Ex: Silva"
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
            <label htmlFor="cpf" className="label-text">CPF do Aluno</label>
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
            <label htmlFor="email" className="label-text">E-mail do Aluno</label>
            <input
              type="email"
              id="email"
              name="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: aluno@email.com"
            />
          </div>
          <button type="submit" className="btn-primary w-full-primary">Matricular Aluno</button>
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