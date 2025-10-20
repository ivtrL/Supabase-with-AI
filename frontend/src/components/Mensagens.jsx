import React from "react";

export default function Mensagens({ mensagens }) {
  if (!mensagens || mensagens.length === 0) return null;
  return (
    <div id="mensagens">
      {mensagens.map((m, i) => (
        <div key={i} className={m.type === "error" ? "error" : "success"}>
          {m.type === "error" ? <strong>Erro:</strong> : <strong>✓</strong>}{" "}
          {Array.isArray(m.text) ? (
            <ul>
              {m.text.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          ) : (
            <span>{m.text}</span>
          )}
        </div>
      ))}
    </div>
  );
}
