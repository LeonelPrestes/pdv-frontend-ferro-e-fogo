import React from "react";
import { ordersApi } from "../../services/pdvApi";
import { asNumber, money } from "../../shared/format";
import { labelFor } from "../../shared/labels";

const orderStatusClass = {
  SENT_TO_KITCHEN: "waiting",
  PENDING: "waiting",
  PREPARING: "preparing",
  CANCELED: "canceled",
  READY: "preparing"
};

function updatedAtLabel(order) {
  const date = order.deliveredAt ?? order.readyAt ?? order.startedPreparingAt ?? order.sentToKitchenAt ?? order.updatedAt ?? order.createdAt;
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(date));
}

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
  const tableOrders = (selectedTable?.tabs ?? [])
    .flatMap((tab) => tab.orders ?? [])
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const productById = new Map(products.map((product) => [product.id, product]));

  return (
    <div className="panel">
      <h2>Pedido do garçom</h2>
      <p className="muted">
        {selectedTable ? `Mesa ${selectedTable.number}` : "Selecione uma mesa"}
        {selectedTab ? ` | ${selectedTab.customerName || selectedTab.code}` : selectedTable ? " | nova comanda automática" : ""}
      </p>
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
        {cart.length === 0 && <div className="empty">Adicione produtos do cardápio para montar o pedido.</div>}
      </div>
      <strong>Total do rascunho {money.format(cartTotal)}</strong>
      <button
        className="primary"
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

      {selectedTable && (
        <div className="section">
          <h3>Pedidos da mesa</h3>
          <div className="order-history">
            {tableOrders.map((order) => (
              <div className={`order-history-item ${orderStatusClass[order.status] ?? ""}`} key={order.id}>
                <div className="row">
                  <strong>Pedido {order.sequentialNumber}</strong>
                  <span className="badge">{labelFor(order.status)}</span>
                </div>
                <small>Atualizado às {updatedAtLabel(order)}</small>
                <div className="order-history-products">
                  {order.items?.map((item) => {
                    const product = productById.get(item.productId);
                    return (
                      <span key={item.id}>
                        {asNumber(item.quantity)}x {product?.name ?? "Item"}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
            {tableOrders.length === 0 && <div className="empty">Nenhum pedido lançado para esta mesa.</div>}
          </div>
        </div>
      )}
    </div>
  );
}
