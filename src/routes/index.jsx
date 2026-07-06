import React from "react";
import { CashPanel } from "../features/cash/CashPanel";
import { KitchenPanel } from "../features/kitchen/KitchenPanel";
import { StockPanel } from "../features/stock/StockPanel";
import { TablesPanel } from "../features/tables/TablesPanel";
import { useWorkspace } from "../context/PdvWorkspaceContext";

export function DashboardPage() {
  const workspace = useWorkspace();

  return (
    <>
      <section className="grid two">
        <TablesPanel {...workspace} updateForm={workspace.updateForm} />
        <CashPanel
          busy={workspace.busy}
          cash={workspace.cash}
          forms={workspace.forms}
          run={workspace.run}
          updateForm={workspace.updateForm}
        />
      </section>

      <section className="grid two">
        <KitchenPanel busy={workspace.busy} run={workspace.run} tickets={workspace.tickets} />
        <StockPanel
          busy={workspace.busy}
          forms={workspace.forms}
          movements={workspace.movements}
          products={workspace.products}
          run={workspace.run}
          updateForm={workspace.updateForm}
        />
      </section>
    </>
  );
}
