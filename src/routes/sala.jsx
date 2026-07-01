import React from "react";
import { CatalogPanel } from "../features/catalog/CatalogPanel";
import { OrderPanel } from "../features/orders/OrderPanel";
import { TablesPanel } from "../features/tables/TablesPanel";
import { useWorkspace } from "../context/PdvWorkspaceContext";
import { addProductToCart } from "./helpers";

export function SalaPage() {
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
      <section className="grid two">
        <OrderPanel {...workspace} />
      </section>
    </>
  );
}
