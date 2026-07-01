import { asNumber } from "./format";

export function productBlocked(product) {
  return !product.available || (!product.allowNegativeStock && asNumber(product.currentStock) <= 0);
}
