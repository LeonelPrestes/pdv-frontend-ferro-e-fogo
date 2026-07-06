import React from "react";
import { cashApi } from "../../services/pdvApi";
import { money, parseMoneyInput } from "../../shared/format";

export function CashPanel({ busy, cash, forms, run, updateForm }) {
  return (
    <div className="panel">
      <h2>Caixa</h2>
      {cash ? (
        <>
          <h3>Aberto: esperado {money.format(cash.summary?.expectedAmount ?? 0)}</h3>
          <p className="muted">Vendas {money.format(cash.summary?.saleTotal ?? 0)}</p>
          <div className="inline">
            <input placeholder="Valor contado" value={forms.closingAmount} onChange={(e) => updateForm("closingAmount", e.target.value)} />
            <button className="primary" disabled={busy} onClick={() => run(() => cashApi.close(cash.id, parseMoneyInput(forms.closingAmount)))}>Fechar caixa</button>
          </div>
        </>
      ) : (
        <div className="inline">
          <input placeholder="Valor inicial" value={forms.openingAmount} onChange={(e) => updateForm("openingAmount", e.target.value)} />
          <button className="primary" disabled={busy} onClick={() => run(() => cashApi.open(parseMoneyInput(forms.openingAmount)))}>Abrir caixa</button>
        </div>
      )}
    </div>
  );
}
