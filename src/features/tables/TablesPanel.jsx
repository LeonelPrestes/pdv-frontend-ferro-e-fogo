import React from "react";
import { tablesApi, tabsApi } from "../../services/pdvApi";
import { money } from "../../shared/format";

export function TablesPanel({
  busy,
  forms,
  run,
  selectedTable,
  selectedTableId,
  selectedTabId,
  setSelectedTableId,
  setSelectedTabId,
  tables,
  updateForm
}) {
  return (
    <div className="panel">
      <h2>Mesas e comandas</h2>
      <form
        className="inline"
        onSubmit={(event) => {
          event.preventDefault();
          run(() => tablesApi.create(Number(forms.tableNumber)));
        }}
      >
        <input placeholder="Nova mesa" value={forms.tableNumber} onChange={(e) => updateForm("tableNumber", e.target.value)} />
        <button disabled={busy}>Criar</button>
      </form>

      <div className="table-grid">
        {tables.map((table) => (
          <button
            key={table.id}
            className={`table-tile ${table.status.toLowerCase()} ${table.id === selectedTableId ? "selected" : ""}`}
            onClick={() => {
              setSelectedTableId(table.id);
              setSelectedTabId(table.tabs?.[0]?.id ?? "");
            }}
          >
            <strong>Mesa {table.number}</strong>
            <span>{table.status}</span>
            <small>{table.totals?.openTabs ?? 0} comandas | {money.format(table.totals?.balance ?? 0)}</small>
          </button>
        ))}
      </div>

      {selectedTable && (
        <div className="section">
          <h3>Mesa {selectedTable.number}</h3>
          <form
            className="inline"
            onSubmit={(event) => {
              event.preventDefault();
              run(() => tabsApi.createForTable(selectedTable.id, forms.tabName));
            }}
          >
            <input placeholder="Nome da comanda" value={forms.tabName} onChange={(e) => updateForm("tabName", e.target.value)} />
            <button disabled={busy}>Nova comanda</button>
          </form>

          <div className="list">
            {selectedTable.tabs?.map((tab) => (
              <button key={tab.id} className={tab.id === selectedTabId ? "selected row" : "row"} onClick={() => setSelectedTabId(tab.id)}>
                <span>{tab.customerName || tab.code}</span>
                <strong>{money.format(tab.totals?.balance ?? 0)}</strong>
              </button>
            ))}
          </div>

          {selectedTabId && (
            <div className="actions">
              <input placeholder="Renomear" value={forms.tabName} onChange={(e) => updateForm("tabName", e.target.value)} />
              <button disabled={busy} onClick={() => run(() => tabsApi.update(selectedTabId, { customerName: forms.tabName }))}>Salvar nome</button>
              <select value={forms.transferTargetTableId} onChange={(e) => updateForm("transferTargetTableId", e.target.value)}>
                <option value="">Transferir para...</option>
                {tables.filter((table) => table.id !== selectedTableId).map((table) => <option key={table.id} value={table.id}>Mesa {table.number}</option>)}
              </select>
              <button disabled={busy || !forms.transferTargetTableId} onClick={() => run(() => tabsApi.transfer(selectedTabId, forms.transferTargetTableId, "Transferencia pela interface"))}>Transferir</button>
              <button disabled={busy} onClick={() => run(() => tablesApi.close(selectedTable.id))}>Fechar mesa</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
