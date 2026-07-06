import { api, jsonBody } from "./apiClient";

export function loadWorkspaceData() {
  return Promise.all([
    api("/health"),
    api("/tables"),
    api("/products"),
    api("/categories"),
    api("/production-areas"),
    api("/kitchen/tickets"),
    api("/cash-registers/open"),
    api("/stock/movements")
  ]);
}

export const workspaceApi = {
  tables: () => api("/tables"),
  products: () => api("/products"),
  kitchenTickets: () => api("/kitchen/tickets")
};

export function getTabSummary(tabId) {
  return api(`/tabs/${tabId}/summary`);
}

export const tablesApi = {
  create: (number) => api("/tables", { method: "POST", body: jsonBody({ number }) }),
  close: (tableId) => api(`/tables/${tableId}/close`, { method: "POST" })
};

export const tabsApi = {
  createForTable: (tableId, customerName) =>
    api(`/tables/${tableId}/tabs`, { method: "POST", body: jsonBody({ customerName }) }),
  update: (tabId, payload) => api(`/tabs/${tabId}`, { method: "PATCH", body: jsonBody(payload) }),
  close: (tabId) => api(`/tabs/${tabId}/close`, { method: "POST" }),
  transfer: (tabId, targetTableId, reason) =>
    api(`/tabs/${tabId}/transfer`, {
      method: "POST",
      body: jsonBody({ targetTableId, reason })
    })
};

export const catalogApi = {
  createCategory: (name) => api("/categories", { method: "POST", body: jsonBody({ name }) }),
  createProduct: (payload) => api("/products", { method: "POST", body: jsonBody(payload) })
};

export const ordersApi = {
  createAndSendToKitchen: (tableId, payload) =>
    api(`/tables/${tableId}/orders/send-to-kitchen`, { method: "POST", body: jsonBody(payload) }),
  createForTable: (tableId, payload) =>
    api(`/tables/${tableId}/orders`, { method: "POST", body: jsonBody(payload) }),
  sendToKitchen: (orderId) => api(`/orders/${orderId}/send-to-kitchen`, { method: "POST" }),
  cancelOrder: (orderId, reason) =>
    api(`/orders/${orderId}/cancel`, { method: "POST", body: jsonBody({ reason }) }),
  cancelItem: (itemId, reason) =>
    api(`/order-items/${itemId}/cancel`, { method: "POST", body: jsonBody({ reason }) })
};

export const kitchenApi = {
  updateTicketStatus: (ticketId, status) =>
    api(`/kitchen/tickets/${ticketId}/status`, { method: "PATCH", body: jsonBody({ status }) })
};

export const paymentsApi = {
  create: (payload) => api("/payments", { method: "POST", body: jsonBody(payload) })
};

export const cashApi = {
  open: (openingAmount) =>
    api("/cash-registers/open", { method: "POST", body: jsonBody({ openingAmount }) }),
  close: (cashRegisterId, closingAmount) =>
    api(`/cash-registers/${cashRegisterId}/close`, {
      method: "POST",
      body: jsonBody({ closingAmount })
    })
};

export const stockApi = {
  createMovement: (payload) => api("/stock/movements", { method: "POST", body: jsonBody(payload) })
};
