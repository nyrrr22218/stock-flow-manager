import Tab1 from './tab1/Tab1';
import Tab2 from './tab2/Tab2';
import Tab3 from './tab3/Tab3';
import Tab4 from './tab4/Tab4';
import Tab5 from './tab5/Tab5';
import Tab6 from './tab6/Tab6';

export const tabList = [
  { label: '注文管理', value: 'tab1', component: Tab1 },
  { label: '在庫管理', value: 'tab2', component: Tab2 },
  { label: '生産数管理', value: 'tab3', component: Tab3 },
  { label: '商品追加', value: 'tab4', component: Tab4 },
  { label: '変更・出荷履歴', value: 'tab5', component: Tab5 },
  { label: 'グラフ', value: 'tab6', component: Tab6 },
] as const;

export const tab1DisplayName = [
  { id: 1, value: '商品名' },
  { id: 2, value: '注文数' },
  { id: 3, value: '在庫数' },
  { id: 4, value: '不足数' },
  { id: 5, value: '生産数' },
  { id: 6, value: '最終不足数' },
];
