import React from "react";
import { ordersApi, paymentsApi, tabsApi } from "../../services/pdvApi";
import { asNumber, money } from "../../shared/format";

export function CheckoutPanel({ busy, cash, forms, run, tabSummary, updateForm }) {
  return (
    <div className="panel">
      <h2>Comanda e pagamento</h2>
      {tabSummary ? (
        <>
          <p className="muted">Subtotal {money.format(tabSummary.totals.subtotal)} | Taxa {money.format(tabSummary.totals.serviceFee)}</p>
          <h3>Saldo {money.format(tabSummary.totals.balance)}</h3>
          <label>
            <input
              type="checkbox"
              checked={tabSummary.serviceFeeEnabled}
              onChange={(e) => run(() => tabsApi.update(tabSummary.id, { serviceFeeEnabled: e.target.checked }))}
            /> Taxa de servico
          </label>
          <div className="list">
            {tabSummary.orders?.map((order) => (
              <div className="ticket" key={order.id}>
                <strong>Pedido {order.sequentialNumber} | {order.status}</strong>
                {order.items.map((item) => (
                  <div className="row" key={item.id}>
                    <span className={item.canceledAt ? "canceled" : ""}>{asNumber(item.quantity)}x {item.product.name}</span>
                    {!item.canceledAt && <button onClick={() => {
                      const reason = window.prompt("Motivo do cancelamento");
                      if (reason) run(() => ordersApi.cancelItem(item.id, reason));
                    }}>Cancelar item</button>}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="inline">
            <input placeholder="Valor" value={forms.paymentAmount} onChange={(e) => updateForm("paymentAmount", e.target.value)} />
            <select value={forms.paymentMethod} onChange={(e) => updateForm("paymentMethod", e.target.value)}>
              <option value="MONEY">Dinheiro</option>
              <option value="PIX">PIX</option>
              <option value="CREDIT_CARD">Credito</option>
              <option value="DEBIT_CARD">Debito</option>
              <option value="ON_CREDIT">Fiado</option>
            </select>
            <button disabled={busy} onClick={() => run(() => paymentsApi.create({
              tabId: tabSummary.id,
              amount: Number(forms.paymentAmount),
              method: forms.paymentMethod,
              cashRegisterId: cash?.id
            }))}>Pagar</button>
          </div>
          <button disabled={busy} onClick={() => run(() => tabsApi.close(tabSummary.id))}>Fechar comanda</button>
        </>
      ) : <p className="muted">Selecione uma comanda aberta.</p>}
    </div>
  );
}
