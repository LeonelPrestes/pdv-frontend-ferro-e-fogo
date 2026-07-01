import React from "react";
import { Link } from "@tanstack/react-router";
import { TopBar } from "./features/layout/TopBar";
import { PdvWorkspaceProvider, useWorkspace } from "./context/PdvWorkspaceContext";

const navItems = [
  { to: "/", label: "Visao geral" },
  { to: "/sala", label: "Salao" },
  { to: "/cardapio", label: "Cardapio" },
  { to: "/cozinha", label: "Cozinha" },
  { to: "/caixa", label: "Caixa" },
  { to: "/estoque", label: "Estoque" }
];

function AppLayout({ children }) {
  const workspace = useWorkspace();

  return (
    <main className="app-shell">
      <TopBar
        busy={workspace.busy}
        health={workspace.health}
        loading={workspace.loading}
        onRefresh={workspace.load}
      />

      <nav className="module-nav">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to} activeProps={{ className: "active" }}>
            {item.label}
          </Link>
        ))}
      </nav>

      {workspace.error && <div className="alert">{workspace.error}</div>}
      {workspace.loading ? <div className="panel">Carregando dados da API local...</div> : null}

      {children}
    </main>
  );
}

export default function App({ children }) {
  return (
    <PdvWorkspaceProvider>
      <AppLayout>{children}</AppLayout>
    </PdvWorkspaceProvider>
  );
}
