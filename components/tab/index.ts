export const tabList = [
  { label: '注文管理', href: '/main-page/tab/orders' },
  { label: '在庫管理', href: '/main-page/tab/stocks' },
  { label: '生産数管理', href: '/main-page/tab/products' },
  { label: '商品追加', href: '/main-page/tab/item-add' },
  { label: '変更・出荷履歴', href: '/main-page/tab/log-history' },
  { label: 'グラフ', href: '/main-page/tab/graph' },
] as const;

export const tab1DisplayName = [
  { id: 1, value: '商品名' },
  { id: 2, value: '注文数' },
  { id: 3, value: '在庫数' },
  { id: 4, value: '不足数' },
  { id: 5, value: '生産数' },
  { id: 6, value: '最終不足数' },
];
