const labels = {
  AVAILABLE: "Disponível",
  OCCUPIED: "Ocupada",
  RESERVED: "Reservada",
  CLOSING: "Em fechamento",
  OPEN: "Aberta",
  CLOSED: "Fechada",
  CANCELED: "Cancelada",
  TRANSFERRED: "Transferida",
  PENDING: "Pendente",
  SENT_TO_KITCHEN: "Enviado para a cozinha",
  PREPARING: "Em preparo",
  READY: "Pronto",
  DELIVERED: "Entregue",
  ENTRADA: "Entrada",
  SAIDA_VENDA: "Saída por venda",
  AJUSTE_MANUAL: "Ajuste manual",
  CANCELAMENTO: "Cancelamento",
  PERDA: "Perda",
  DEVOLUCAO: "Devolução",
  MONEY: "Dinheiro",
  PIX: "PIX",
  CREDIT_CARD: "Crédito",
  DEBIT_CARD: "Débito",
  ON_CREDIT: "Fiado",
  OTHER: "Outro"
};

export function labelFor(value) {
  return labels[value] ?? value;
}
