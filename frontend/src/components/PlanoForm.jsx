import React, { useState } from "react";
import { API_URL } from "../config";

export default function PlanoForm({
  user,
  setMensagens,
  setLoading,
  setPlano,
}) {
  const [disciplina, setDisciplina] = useState("");
  const [anoEscolar, setAnoEscolar] = useState("");
  const [tema, setTema] = useState("");
  const [objetivoPrincipal, setObjetivoPrincipal] = useState("");
  const [duracao, setDuracao] = useState(50);
  const [nivelConhecimento, setNivelConhecimento] = useState("");
  const [materiais, setMateriais] = useState([]);
  const [tipoAtividade, setTipoAtividade] = useState("");

  const materiaisOptions = [
    "Quadro branco",
    "Computador",
    "Projetor",
    "Livro didático",
    "Material impresso",
    "Material concreto",
  ];

  const toggleMaterial = (value) => {
    setMateriais((prev) =>
      prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagens([]);
    if (materiais.length === 0) {
      setMensagens([
        {
          type: "error",
          text: ["Selecione pelo menos um material disponível"],
        },
      ]);
      return;
    }

    const dados = {
      professor_id: user.id,
      disciplina,
      ano_escolar: parseInt(anoEscolar, 10),
      tema,
      objetivo_principal: objetivoPrincipal,
      duracao_minutos: parseInt(duracao, 10),
      nivel_conhecimento: nivelConhecimento,
      materiais_disponiveis: materiais,
      tipo_atividade: tipoAtividade,
    };

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/gerar-plano`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.erro || "Erro ao gerar plano");
      setPlano(result.plano);
    } catch (err) {
      setMensagens([{ type: "error", text: [err.message] }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="formPlano" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="disciplina">Disciplina:</label>
        <select
          id="disciplina"
          required
          value={disciplina}
          onChange={(e) => setDisciplina(e.target.value)}
        >
          <option value="">Selecione...</option>
          <option value="Matemática">Matemática</option>
          <option value="Português">Português</option>
          <option value="Ciências">Ciências</option>
          <option value="História">História</option>
          <option value="Geografia">Geografia</option>
          <option value="Artes">Artes</option>
          <option value="Educação Física">Educação Física</option>
          <option value="Inglês">Inglês</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="anoEscolar">Ano Escolar:</label>
        <select
          id="anoEscolar"
          required
          value={anoEscolar}
          onChange={(e) => setAnoEscolar(e.target.value)}
        >
          <option value="">Selecione...</option>
          {Array.from({ length: 9 }).map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}º ano
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="tema">Tema da Aula:</label>
        <input
          id="tema"
          type="text"
          required
          placeholder="Ex: Frações, Sistema Solar, Verbos..."
          value={tema}
          onChange={(e) => setTema(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="objetivoPrincipal">Objetivo Principal:</label>
        <textarea
          id="objetivoPrincipal"
          required
          placeholder="O que os alunos devem aprender nesta aula?"
          value={objetivoPrincipal}
          onChange={(e) => setObjetivoPrincipal(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="duracao">Duração (minutos):</label>
        <input
          id="duracao"
          type="number"
          required
          min="10"
          max="180"
          placeholder="50"
          value={duracao}
          onChange={(e) => setDuracao(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="nivelConhecimento">
          Nível de Conhecimento dos Alunos:
        </label>
        <select
          id="nivelConhecimento"
          required
          value={nivelConhecimento}
          onChange={(e) => setNivelConhecimento(e.target.value)}
        >
          <option value="">Selecione...</option>
          <option value="básico">Básico</option>
          <option value="intermediário">Intermediário</option>
          <option value="avançado">Avançado</option>
        </select>
      </div>

      <div className="form-group">
        <label>Materiais Disponíveis:</label>
        <div className="checkbox-group">
          {materiaisOptions.map((m) => (
            <div className="checkbox-item" key={m}>
              <input
                type="checkbox"
                id={m}
                value={m}
                checked={materiais.includes(m)}
                onChange={() => toggleMaterial(m)}
              />
              <label htmlFor={m}>{m}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="tipoAtividade">Tipo de Atividade:</label>
        <select
          id="tipoAtividade"
          required
          value={tipoAtividade}
          onChange={(e) => setTipoAtividade(e.target.value)}
        >
          <option value="">Selecione...</option>
          <option value="Individual">Individual</option>
          <option value="Em duplas">Em duplas</option>
          <option value="Em grupos">Em grupos</option>
          <option value="Coletiva">Coletiva</option>
          <option value="Mista">Mista</option>
        </select>
      </div>

      <button type="submit">✨ Gerar Plano de Aula</button>
    </form>
  );
}
