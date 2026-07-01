import React from "react";
import { stockApi } from "../../services/pdvApi";
import { asNumber } from "../../shared/format";

export function StockPanel({ busy, forms, movements, products, run, updateForm }) {
  return (
    <div className="panel">
      <h2>Estoque manual</h2>
      <div className="form-grid">
        <select value={forms.stockProductId} onChange={(e) => updateForm("stockProductId", e.target.value)}>
          <option value="">Produto</option>
          {products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
        </select>
        <select value={forms.stockType} onChange={(e) => updateForm("stockType", e.target.value)}>
          <option value="ENTRADA">Entrada</option>
          <option value="AJUSTE_MANUAL">Ajuste</option>
          <option value="PERDA">Perda</option>
          <option value="DEVOLUCAO">Devolucao</option>
        </select>
        <input placeholder="Quantidade" value={forms.stockQuantity} onChange={(e) => updateForm("stockQuantity", e.target.value)} />
        <input placeholder="Motivo" value={forms.stockReason} onChange={(e) => updateForm("stockReason", e.target.value)} />
        <button disabled={busy} onClick={() => run(() => stockApi.createMovement({
          productId: forms.stockProductId,
          type: forms.stockType,
          quantity: Number(forms.stockQuantity),
          reason: forms.stockReason
        }))}>Registrar</button>
      </div>
      <div className="list compact">
        {movements.slice(0, 8).map((movement) => (
          <div className="row" key={movement.id}>
            <span>{movement.product?.name} | {movement.type}</span>
            <strong>{asNumber(movement.quantity)}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
