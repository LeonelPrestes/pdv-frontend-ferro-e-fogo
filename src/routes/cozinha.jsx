import React from "react";
import { KitchenPanel } from "../features/kitchen/KitchenPanel";
import { useWorkspace } from "../context/PdvWorkspaceContext";

export function CozinhaPage() {
  const workspace = useWorkspace();

  return (
    <section className="grid one">
      <KitchenPanel busy={workspace.busy} run={workspace.run} tickets={workspace.tickets} />
    </section>
  );
}
