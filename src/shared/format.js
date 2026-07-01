export const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

export function asNumber(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  return Number(value ?? 0);
}
