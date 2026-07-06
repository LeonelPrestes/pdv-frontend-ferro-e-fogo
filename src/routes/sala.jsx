import React from "react";
import { MenuPanel } from "../features/catalog/MenuPanel";
import { OrderPanel } from "../features/orders/OrderPanel";
import { WaiterTablesPanel } from "../features/waiter/WaiterTablesPanel";
import { useWorkspace } from "../context/PdvWorkspaceContext";
import { addProductToCart } from "./helpers";

export function SalaPage() {
  const workspace = useWorkspace();

  return (
    <>
      <section className="grid one">
        <WaiterTablesPanel {...workspace} />
      </section>
      {workspace.selectedTable && (
        <section id="waiter-menu" className="grid waiter-order">
          <MenuPanel
            groupedProducts={workspace.groupedProducts}
            onAddProduct={(product) => {
              if (!workspace.sendingOrder) {
                addProductToCart(workspace, product);
              }
            }}
          />
          <OrderPanel {...workspace} />
        </section>
      )}
    </>
  );
}
