import React from "react";
import { createContext, useContext } from "react";
import { usePdvWorkspace } from "../hooks/usePdvWorkspace";

const PdvWorkspaceContext = createContext(null);

export function PdvWorkspaceProvider({ children }) {
  const workspace = usePdvWorkspace();
  return (
    <PdvWorkspaceContext.Provider value={workspace}>
      {children}
    </PdvWorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const workspace = useContext(PdvWorkspaceContext);
  if (!workspace) {
    throw new Error("useWorkspace deve ser usado dentro de PdvWorkspaceProvider.");
  }
  return workspace;
}
