import React from "react";
import { CatalogPanel } from "../features/catalog/CatalogPanel";
import { useWorkspace } from "../context/PdvWorkspaceContext";
import { addProductToCart } from "./helpers";

export function CardapioPage() {
  const workspace = useWorkspace();

  return (
    <section className="grid one">
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
  );
}
