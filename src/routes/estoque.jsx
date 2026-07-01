import React from "react";
import { CatalogPanel } from "../features/catalog/CatalogPanel";
import { StockPanel } from "../features/stock/StockPanel";
import { useWorkspace } from "../context/PdvWorkspaceContext";
import { addProductToCart } from "./helpers";

export function EstoquePage() {
  const workspace = useWorkspace();

  return (
    <section className="grid two">
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
