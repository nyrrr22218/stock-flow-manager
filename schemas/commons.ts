import { z } from 'zod';

const OrderSchema = z.object({
  id: z.string(),
  item_name_id: z.string(),
  order_count: z.number(),
});

const StockSchema = z.object({
  id: z.string(),
  item_name_id: z.string(),
  stock_count: z.number(),
});

const ProductSchema = z.object({
  id: z.string(),
  item_name_id: z.string(),
  produced_count: z.number(),
});

export const ItemSchema = z.object({
  id: z.string(),
  item_name: z.string().min(1),
  order: OrderSchema.nullish(),
  stock: StockSchema.nullish(),
  product: ProductSchema.nullish(),
});

export const LogSchema = z.object({
  id: z.string(),
  log_message: z.string(),
  logged_at: z.union([z.string(), z.date()]),
});

const ShipmentSchema = z.object({
  id: z.string(),
  order_snapshot: z.json(),
});

export const ItemDataWithInputSchema = z.array(
  ItemSchema.extend({
    logs: LogSchema.nullish(),
    shipment: ShipmentSchema.nullish(),
    orderInInput: z.string(),
  }),
);

export type Item = z.infer<typeof ItemSchema>;
