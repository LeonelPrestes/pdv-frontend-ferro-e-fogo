import React from "react";
import { StockPanel } from "../features/stock/StockPanel";
import { useWorkspace } from "../context/PdvWorkspaceContext";

export function EstoquePage() {
  const workspace = useWorkspace();

  return (
    <section className="grid one">
      <StockPanel
        busy={workspace.busy}
        forms={workspace.forms}
        movements={workspace.movements}
        products={workspace.products}
        run={workspace.run}
        updateForm={workspace.updateForm}
      />
    </section>
  );
}
