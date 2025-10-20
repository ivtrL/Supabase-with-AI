import React, { useState } from "react";
import { supabase } from "../services/supabase";

export default function RegisterForm({
  setMensagens,
  setLoading,
  onSwitchToLogin,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagens([]);
    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (authError) throw authError;

      // cria registro na tabela 'professores'
      const { error: dbError } = await supabase
        .from("professores")
        .insert({ id: authData.user.id, email, nome: name });
      if (dbError) throw dbError;

      setMensagens([
        {
          type: "success",
          text: "Conta criada com sucesso! Você pode fazer login agora.",
        },
      ]);
      setName("");
      setEmail("");
      setPassword("");
      if (onSwitchToLogin) onSwitchToLogin();
    } catch (err) {
      setMensagens([{ type: "error", text: [err.message] }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="registerForm" className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="registerName">Nome Completo:</label>
        <input
          id="registerName"
          type="text"
          required
          placeholder="Seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="registerEmail">Email:</label>
        <input
          id="registerEmail"
          type="email"
          required
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="registerPassword">Senha:</label>
        <input
          id="registerPassword"
          type="password"
          required
          placeholder="Mínimo 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Criar Conta</button>
    </form>
  );
}
