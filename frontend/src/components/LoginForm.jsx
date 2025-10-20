import React, { useState } from "react";
import { supabase } from "../services/supabase";

export default function LoginForm({ setUser, setMensagens, setLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagens([]);
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setUser(data.user);
      setMensagens([{ type: "success", text: "Login realizado com sucesso!" }]);
    } catch (err) {
      setMensagens([{ type: "error", text: [err.message] }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="loginForm" className="auth-form active" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="loginEmail">Email:</label>
        <input
          id="loginEmail"
          type="email"
          required
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="loginPassword">Senha:</label>
        <input
          id="loginPassword"
          type="password"
          required
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Entrar</button>
    </form>
  );
}
