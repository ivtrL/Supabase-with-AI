import React from "react";

export default function UserInfo({ user, onLogout }) {
  const name = user.user_metadata?.name || user.email;
  return (
    <div className="user-info show">
      <span className="user-name">
        Olá, <span id="userName">{name}</span>!
      </span>
      <button className="btn-logout" onClick={onLogout}>
        Sair
      </button>
    </div>
  );
}
