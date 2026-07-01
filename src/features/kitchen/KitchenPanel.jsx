import React from "react";
import { kitchenApi, ordersApi } from "../../services/pdvApi";
import { asNumber } from "../../shared/format";

const ticketStatuses = ["PREPARING", "READY", "DELIVERED", "CANCELED"];

export function KitchenPanel({ busy, run, tickets }) {
  return (
    <div className="panel">
      <h2>Cozinha</h2>
      <div className="list">
        {tickets.map((ticket) => (
          <div className="ticket" key={ticket.id}>
            <strong>Mesa {ticket.order?.tab?.table?.number ?? "-"} | Pedido {ticket.order?.sequentialNumber}</strong>
            <span>{ticket.status}</span>
            <small>{ticket.order?.items?.map((item) => `${asNumber(item.quantity)}x ${item.product.name}`).join(", ")}</small>
            <div className="actions">
              {ticketStatuses.map((status) => (
                <button key={status} disabled={busy} onClick={() => run(() => kitchenApi.updateTicketStatus(ticket.id, status))}>{status}</button>
              ))}
              <button disabled={busy} onClick={() => {
                const reason = window.prompt("Motivo do cancelamento");
                if (reason) run(() => ordersApi.cancelOrder(ticket.orderId, reason));
              }}>Cancelar pedido</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
