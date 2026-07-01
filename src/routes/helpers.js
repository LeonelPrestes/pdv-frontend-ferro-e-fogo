import { productBlocked } from "../shared/products";

export function addProductToCart(workspace, product) {
  if (productBlocked(product)) return;

  workspace.setCart((current) => {
    const existing = current.find((item) => item.productId === product.id);
    if (existing) {
      return current.map((item) =>
        item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    }

    return [...current, { productId: product.id, name: product.name, quantity: 1 }];
  });
}
