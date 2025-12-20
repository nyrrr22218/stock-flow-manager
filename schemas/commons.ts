import { z } from 'zod';

const OrderTableSchema = z.object({
  id: z.string(),
  itemname_id: z.string(),
  order_count: z.number(),
});

const StockTableSchema = z.object({
  id: z.string(),
  itemname_id: z.string(),
  stock_count: z.number(),
});

const ProductTableSchema = z.object({
  id: z.string(),
  itemname_id: z.string(),
  producted_count: z.number(),
});

export const ItemSchema = z.object({
  id: z.string(),
  item_name: z.string().min(1),
  ordertable: OrderTableSchema.nullable().optional(),
  stocktable: StockTableSchema.nullable().optional(),
  producttable: ProductTableSchema.nullable().optional(),
});

export const LogTableSchema = z.object({
  id: z.string(),
  logs: z.string(),
  logged_at: z.union([z.string(), z.date()]),
});

const ShipmentsTableSchema = z.object({
  id: z.string(),
  order_snapshot: z.json(),
});

export const TItemAndInputSchema = z.array(
  z.object({
    id: z.string(),
    item_name: z.string().min(1),
    ordertable: OrderTableSchema.nullable().optional(),
    stocktable: StockTableSchema.nullable().optional(),
    producttable: ProductTableSchema.nullable().optional(),
    logtable: LogTableSchema.nullable().optional(),
    shipmentstable: ShipmentsTableSchema.nullable().optional(),
    orderInInput: z.string(),
  }),
);

export type TItem = z.infer<typeof ItemSchema>;
