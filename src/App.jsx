import React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { TopBar } from "./features/layout/TopBar";
import { PdvWorkspaceProvider, useWorkspace } from "./context/PdvWorkspaceContext";

const navItems = [
  { to: "/", label: "Visão geral" },
  { to: "/sala", label: "Salão" },
  { to: "/cardapio", label: "Cardápio" },
  { to: "/cozinha", label: "Cozinha" },
  { to: "/caixa", label: "Caixa" },
  { to: "/estoque", label: "Estoque" }
];

function AppLayout({ children }) {
  const workspace = useWorkspace();
  const location = useLocation();
  const isWaiterScreen = location.pathname === "/sala";

  return (
    <main className={isWaiterScreen ? "app-shell waiter-shell" : "app-shell"}>
      {isWaiterScreen ? (
        <div className="waiter-status">
          <span className={`status ${workspace.health === "ok" ? "ok" : "bad"}`}>
            {workspace.loading ? "Carregando" : workspace.health === "ok" ? "Online" : "Offline"}
          </span>
        </div>
      ) : (
        <>
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
        </>
      )}

      {workspace.error && <div className="alert">{workspace.error}</div>}
      {!isWaiterScreen && workspace.loading ? <div className="panel">Carregando dados da API local...</div> : null}

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
