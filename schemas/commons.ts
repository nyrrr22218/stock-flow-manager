import { z } from 'zod';

const OrderTableSchema = z.object({
  id: z.bigint(),
  itemname_id: z.bigint(),
  order_count: z.number(),
});

const StockTableSchema = z.object({
  id: z.bigint(),
  itemname_id: z.bigint(),
  stock_count: z.number(),
});

const ProductTableSchema = z.object({
  id: z.bigint(),
  itemname_id: z.bigint(),
  producted_count: z.number(),
});

export const ItemSchema = z.object({
  id: z.bigint(),
  item_name: z.union([z.number(), z.string(), z.bigint()]),
  ordertable: OrderTableSchema.nullable(),
  stocktable: StockTableSchema.nullable(),
  producttable: ProductTableSchema.nullable(),
});

export type TItem = z.infer<typeof ItemSchema>;

export type TStockSend = {
  id: number;
  stockInInput: string;
};
