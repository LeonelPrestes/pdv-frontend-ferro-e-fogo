import React from "react";
import { CatalogPanel } from "../features/catalog/CatalogPanel";
import { CheckoutPanel } from "../features/checkout/CheckoutPanel";
import { KitchenPanel } from "../features/kitchen/KitchenPanel";
import { OrderPanel } from "../features/orders/OrderPanel";
import { TablesPanel } from "../features/tables/TablesPanel";
import { useWorkspace } from "../context/PdvWorkspaceContext";
import { addProductToCart } from "./helpers";

export function DashboardPage() {
  const workspace = useWorkspace();

  return (
    <>
      <section className="grid two">
        <TablesPanel {...workspace} updateForm={workspace.updateForm} />
        <CatalogPanel
          areas={workspace.areas}
          busy={workspace.busy}
          categories={workspace.categories}
          forms={workspace.forms}
          groupedProducts={workspace.groupedProducts}
          onAddProduct={(product) => addProductToCart(workspace, product)}
          run={workspace.run}
          updateForm={workspace.updateForm}
        />
      </section>

      <section className="grid three">
        <OrderPanel {...workspace} />
        <KitchenPanel busy={workspace.busy} run={workspace.run} tickets={workspace.tickets} />
        <CheckoutPanel
          busy={workspace.busy}
          cash={workspace.cash}
          forms={workspace.forms}
          run={workspace.run}
          tabSummary={workspace.tabSummary}
          updateForm={workspace.updateForm}
        />
      </section>
    </>
  );
}
