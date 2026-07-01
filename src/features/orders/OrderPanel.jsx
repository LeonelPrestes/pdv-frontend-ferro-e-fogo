import React from "react";
import { ordersApi } from "../../services/pdvApi";
import { asNumber, money } from "../../shared/format";

export function OrderPanel({
  busy,
  cart,
  products,
  run,
  selectedTable,
  selectedTableId,
  selectedTab,
  selectedTabId,
  setCart
}) {
  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return sum + asNumber(product?.price) * item.quantity;
  }, 0);

  return (
    <div className="panel">
      <h2>Pedido do garcom</h2>
      <p className="muted">{selectedTable ? `Mesa ${selectedTable.number}` : "Selecione uma mesa"} {selectedTab ? `| ${selectedTab.customerName || selectedTab.code}` : ""}</p>
      <div className="list">
        {cart.map((item) => (
          <div className="row" key={item.productId}>
            <span>{item.name}</span>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => setCart((current) => current.map((entry) => entry.productId === item.productId ? { ...entry, quantity: Number(e.target.value) } : entry))}
            />
          </div>
        ))}
      </div>
      <strong>Total rascunho {money.format(cartTotal)}</strong>
      <button
        disabled={busy || !selectedTableId || cart.length === 0}
        onClick={() =>
          run(async () => {
            const order = await ordersApi.createForTable(selectedTableId, {
              tabId: selectedTabId || undefined,
              items: cart.map(({ productId, quantity }) => ({ productId, quantity }))
            });
            await ordersApi.sendToKitchen(order.id);
            setCart([]);
          })
        }
      >
        Enviar para cozinha
      </button>
    </div>
  );
}
