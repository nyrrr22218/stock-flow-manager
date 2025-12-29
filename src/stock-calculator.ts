export function stockCalculate(order: number, stock: number, product: number) {
  const restOrder = Math.max(0, order - stock);
  const finalRestOrder = Math.max(0, restOrder - product);
  return { stock, restOrder, product, finalRestOrder };
}
