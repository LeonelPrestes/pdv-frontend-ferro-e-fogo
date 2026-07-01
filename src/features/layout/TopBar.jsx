import React from "react";

export function TopBar({ health, loading, busy, onRefresh }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">PDV Ferro e Fogo</p>
        <h1>Operacao local modular</h1>
      </div>
      <button onClick={onRefresh} disabled={busy || loading}>Atualizar</button>
      <span className={`status ${health === "ok" ? "ok" : "bad"}`}>API {health}</span>
    </header>
  );
}
