import { useCallback, useEffect, useMemo, useState } from "react";
import { getTabSummary, loadWorkspaceData, ordersApi, workspaceApi } from "../services/pdvApi";

const initialForms = {
  tableNumber: "",
  tabName: "",
  categoryName: "",
  productName: "",
  productPrice: "",
  productStock: "0",
  productImageUrl: "",
  categoryId: "",
  productionAreaId: "",
  available: true,
  allowNegativeStock: true,
  paymentAmount: "",
  paymentMethod: "MONEY",
  openingAmount: "0",
  closingAmount: "",
  stockProductId: "",
  stockType: "ENTRADA",
  stockQuantity: "",
  stockReason: "",
  transferTargetTableId: ""
};

export function usePdvWorkspace() {
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [health, setHealth] = useState("verificando");
  const [tables, setTables] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [cash, setCash] = useState(null);
  const [movements, setMovements] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState("");
  const [selectedTabId, setSelectedTabId] = useState("");
  const [tabSummary, setTabSummary] = useState(null);
  const [cart, setCart] = useState([]);
  const [sendingOrder, setSendingOrder] = useState(false);
  const [forms, setForms] = useState(initialForms);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [
        healthData,
        tableData,
        productData,
        categoryData,
        areaData,
        ticketData,
        cashData,
        movementData
      ] = await loadWorkspaceData();

      setHealth(healthData.status);
      setTables(tableData);
      setProducts(productData);
      setCategories(categoryData);
      setAreas(areaData);
      setTickets(ticketData);
      setCash(cashData);
      setMovements(movementData);

      const firstTableId = selectedTableId || tableData[0]?.id || "";
      const table = tableData.find((item) => item.id === firstTableId) ?? tableData[0];
      const nextTabId = selectedTabId || table?.tabs?.[0]?.id || "";
      setSelectedTableId(firstTableId);
      setSelectedTabId(nextTabId);
      setTabSummary(nextTabId ? await getTabSummary(nextTabId) : null);
    } catch (err) {
      setHealth("erro");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedTableId, selectedTabId]);

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!selectedTabId) {
      setTabSummary(null);
      return;
    }
    getTabSummary(selectedTabId).then(setTabSummary).catch((err) => setError(err.message));
  }, [selectedTabId]);

  const selectedTable = tables.find((table) => table.id === selectedTableId);
  const selectedTab = selectedTable?.tabs?.find((tab) => tab.id === selectedTabId) ?? tabSummary;
  const groupedProducts = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        products: products.filter((product) => product.categoryId === category.id)
      })),
    [categories, products]
  );

  async function run(action) {
    setBusy(true);
    setError("");
    try {
      await action();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function refreshOrderData() {
    const [tableData, ticketData, productData] = await Promise.all([
      workspaceApi.tables(),
      workspaceApi.kitchenTickets(),
      workspaceApi.products()
    ]);
    setTables(tableData);
    setTickets(ticketData);
    setProducts(productData);
  }

  async function sendWaiterOrderToKitchen() {
    if (!selectedTableId || cart.length === 0 || sendingOrder) return;

    const cartSnapshot = cart.map((item) => ({ ...item }));
    const tableId = selectedTableId;
    const tabId = selectedTabId || undefined;

    setBusy(true);
    setSendingOrder(true);
    setError("");

    try {
      const order = await ordersApi.createAndSendToKitchen(tableId, {
        tabId,
        items: cartSnapshot.map(({ productId, quantity }) => ({ productId, quantity }))
      });
      if (!tabId && order.tabId) {
        setSelectedTabId(order.tabId);
      }
      setCart([]);
      await refreshOrderData();
    } catch (err) {
      setError(err.message);
      await refreshOrderData().catch(() => undefined);
    } finally {
      setSendingOrder(false);
      setBusy(false);
    }
  }

  function updateForm(name, value) {
    setForms((current) => ({ ...current, [name]: value }));
  }

  return {
    loading,
    busy,
    error,
    health,
    tables,
    products,
    categories,
    areas,
    tickets,
    cash,
    movements,
    selectedTableId,
    selectedTabId,
    selectedTable,
    selectedTab,
    tabSummary,
    groupedProducts,
    cart,
    sendingOrder,
    forms,
    setSelectedTableId,
    setSelectedTabId,
    setCart,
    sendWaiterOrderToKitchen,
    load,
    run,
    updateForm
  };
}
