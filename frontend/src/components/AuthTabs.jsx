import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthTabs({ setUser, setMensagens, setLoading }) {
  const [tab, setTab] = useState("login");

  return (
    <div id="authArea">
      <div className="auth-tabs">
        <button
          className={`auth-tab ${tab === "login" ? "active" : ""}`}
          onClick={() => setTab("login")}
        >
          Login
        </button>
        <button
          className={`auth-tab ${tab === "register" ? "active" : ""}`}
          onClick={() => setTab("register")}
        >
          Cadastro
        </button>
      </div>

      {tab === "login" ? (
        <LoginForm
          setUser={setUser}
          setMensagens={setMensagens}
          setLoading={setLoading}
        />
      ) : (
        <RegisterForm
          setMensagens={setMensagens}
          setLoading={setLoading}
          onSwitchToLogin={() => setTab("login")}
        />
      )}
    </div>
  );
}
