import React from "react";

export default function PlanoResultado({ plano, onVoltar }) {
  if (!plano) return null;
  return (
    <div className="resultado" id="resultado">
      <h2>📚 Plano de Aula Gerado</h2>
      <div id="conteudoPlano">
        <h3>🎯 Introdução Lúdica</h3>
        <p>{plano.introducao_ludica}</p>

        <h3>📋 Objetivo de Aprendizagem (BNCC)</h3>
        <p>
          <strong>Código BNCC:</strong> {plano.codigo_bncc || "N/A"}
        </p>
        <p>{plano.objetivo_bncc}</p>

        <h3>📝 Passo a Passo da Atividade</h3>
        {plano.passo_a_passo &&
          plano.passo_a_passo.map((passo, idx) => (
            <div className="passo" key={idx}>
              <div className="passo-header">
                {passo.numero}. {passo.titulo}{" "}
                {passo.duracao ? `(${passo.duracao})` : ""}
              </div>
              <p>{passo.descricao}</p>
              {passo.materiais && passo.materiais.length > 0 && (
                <p>
                  <strong>Materiais:</strong> {passo.materiais.join(", ")}
                </p>
              )}
            </div>
          ))}

        <h3>✅ Rubrica de Avaliação</h3>
        {plano.rubrica_avaliacao && plano.rubrica_avaliacao.criterios && (
          <table className="rubrica-table">
            <thead>
              <tr>
                <th>Critério</th>
                <th>Insuficiente</th>
                <th>Básico</th>
                <th>Proficiente</th>
                <th>Avançado</th>
              </tr>
            </thead>
            <tbody>
              {plano.rubrica_avaliacao.criterios.map((c, i) => (
                <tr key={i}>
                  <td>
                    <strong>{c.criterio}</strong>
                  </td>
                  <td>{c.insuficiente}</td>
                  <td>{c.basico}</td>
                  <td>{c.proficiente}</td>
                  <td>{c.avancado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button className="btn-voltar" onClick={onVoltar}>
        ← Criar Novo Plano
      </button>
    </div>
  );
}
