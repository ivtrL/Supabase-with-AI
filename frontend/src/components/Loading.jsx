import React from "react";

export default function Loading() {
  return (
    <div className="loading" id="loading">
      <div className="spinner" />
      <p id="loadingText">Processando...</p>
    </div>
  );
}
