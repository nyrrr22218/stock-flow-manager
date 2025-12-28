export const tabList = [
  { label: '注文管理', href: '/main-page/tab/orders' },
  { label: '在庫管理', href: '/main-page/tab/stocks' },
  { label: '生産数管理', href: '/main-page/tab/produced-count' },
  { label: '商品管理', href: '/main-page/tab/item-management' },
  { label: '変更・出荷履歴', href: '/main-page/tab/log-history' },
  { label: 'グラフ', href: '/main-page/tab/graph' },
] as const;

export const displayName = ['商品名', '注文数', '在庫数', '不足数', '生産数', '最終不足数'];

export const sortMenu = ['[すべて]', '[出荷完了]', '[注文数]', '[在庫数]', '[生産数]', '[商品]'];
