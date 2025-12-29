import { expect, test } from 'vitest';
// ↑ Step 1で切り出した関数をインポート
import { stockCalculate } from '../src/stock-calculator';

test('在庫と生産数を考慮した正しい残り注文数を計算できること', () => {
  // Scenario 1: 在庫100, 注文20, 生産0 -> 残り注文0
  const result1 = stockCalculate(20, 100, 0);
  expect(result1.finalRestOrder).toBe(0);

  // Scenario 2: 在庫10, 注文50, 生産20 -> 残り注文20
  const result2 = stockCalculate(50, 10, 20);
  expect(result2.finalRestOrder).toBe(20);

  // Scenario 3: 在庫0, 注文10, 生産0 -> 残り注文10
  const result3 = stockCalculate(10, 0, 0);
  expect(result3.finalRestOrder).toBe(10);
});
