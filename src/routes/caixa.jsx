import React from "react";
import { CashPanel } from "../features/cash/CashPanel";
import { CheckoutPanel } from "../features/checkout/CheckoutPanel";
import { useWorkspace } from "../context/PdvWorkspaceContext";

export function CaixaPage() {
  const workspace = useWorkspace();

  return (
    <section className="grid two">
      <CheckoutPanel
        busy={workspace.busy}
        cash={workspace.cash}
        forms={workspace.forms}
        run={workspace.run}
        tabSummary={workspace.tabSummary}
        updateForm={workspace.updateForm}
      />
      <CashPanel
        busy={workspace.busy}
        cash={workspace.cash}
        forms={workspace.forms}
        run={workspace.run}
        updateForm={workspace.updateForm}
      />
    </section>
  );
}
