'use client';
import { useEffect, useState } from 'react';
import './editarPerfil.css';

interface ModalEditarPerfilProps {
  mostrar: boolean;
  onFechar: () => void;
  dadosIniciais: {
    nome: string;
    sobrenome: string;
    data_nascimento: string;
    email: string;
    telefone: string;
  };
  onSalvar: (dados: {
    nome: string;
    sobrenome: string;
    data_nascimento: string;
    email: string;
    telefone: string;
  }) => void;
}

export default function ModalEditarPerfil({
  mostrar,
  onFechar,
  dadosIniciais,
  onSalvar
}: ModalEditarPerfilProps) {
  const [nome, setNome] = useState(dadosIniciais.nome);
  const [sobrenome, setSobrenome] = useState(dadosIniciais.sobrenome);
  const [data_nascimento, setDataNascimento] = useState(dadosIniciais.data_nascimento);
  const [email, setEmail] = useState(dadosIniciais.email);
  const [telefone, setTelefone] = useState(dadosIniciais.telefone);

  useEffect(() => {
    setNome(dadosIniciais.nome);
    setSobrenome(dadosIniciais.sobrenome);
    setDataNascimento(dadosIniciais.data_nascimento);
    setEmail(dadosIniciais.email);
    setTelefone(dadosIniciais.telefone);
  }, [dadosIniciais]);

  const handleSalvar = () => {
    onSalvar({ nome, sobrenome, data_nascimento, email, telefone });
    onFechar();
  };

  if (!mostrar) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Editar Dados do Administrador</h3>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="editNome" className="label-text">Nome:</label>
            <input
              type="text"
              id="editNome"
              className="input-field"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editSobrenome" className="label-text">Sobrenome:</label>
            <input
              type="text"
              id="editSobrenome"
              className="input-field"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editNascimento" className="label-text">Data de Nascimento:</label>
            <input
              type="date"
              id="editNascimento"
              className="input-field"
              value={data_nascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editEmail" className="label-text">E-mail:</label>
            <input
              type="email"
              id="editEmail"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editTelefone" className="label-text">Telefone:</label>
            <input
              type="text"
              id="editTelefone"
              className="input-field"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onFechar}>Cancelar</button>
          <button className="btn-primary" onClick={handleSalvar}>Salvar</button>
        </div>
      </div>
    </div>
  );
}