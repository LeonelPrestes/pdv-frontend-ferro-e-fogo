import React from "react";
import { money } from "../../shared/format";
import { labelFor } from "../../shared/labels";

export function WaiterTablesPanel({
  selectedTableId,
  setSelectedTableId,
  setSelectedTabId,
  tables
}) {
  return (
    <div className="panel waiter-panel">
      <div className="panel-header">
        <div>
          <h2>Mesas</h2>
        </div>
      </div>

      <div className="salon-table-grid">
        {tables.map((table) => (
          <button
            key={table.id}
            className={`salon-table ${table.status.toLowerCase()} ${table.id === selectedTableId ? "selected" : ""}`}
            onClick={() => {
              setSelectedTableId(table.id);
              setSelectedTabId(table.tabs?.[0]?.id ?? "");
              requestAnimationFrame(() => {
                document.getElementById("waiter-menu")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
                });
              });
            }}
          >
            <span className="salon-table-number">{table.number}</span>
            <span className="salon-table-status">{labelFor(table.status)}</span>
            <strong className="salon-table-total">{money.format(table.totals?.balance ?? 0)}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}
