// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const itemsFromBigintToString = (items: any) =>
  JSON.parse(JSON.stringify(items, (_, v) => (typeof v === 'bigint' ? v.toString() : v)));
