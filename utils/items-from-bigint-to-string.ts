export const itemsFromBigintToString = <T>(items: T): T =>
  JSON.parse(JSON.stringify(items, (_, v) => (typeof v === 'bigint' ? String(v) : v)));
