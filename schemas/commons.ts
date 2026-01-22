import { z } from 'zod';

const OrderSchema = z.object({
  id: z.string(),
  itemName_id: z.string(),
  orderCount: z.number().min(0),
});

const StockSchema = z.object({
  id: z.string(),
  itemName_id: z.string(),
  stockCount: z.number().min(0),
});

const ProducedCountSchema = z.object({
  id: z.string(),
  itemName_id: z.string(),
  producedCount: z.number().min(0),
});

export const ItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  order: OrderSchema.nullish(),
  stock: StockSchema.nullish(),
  producedCount: ProducedCountSchema.nullish(),
});

export const LogSchema = z.object({
  id: z.string(),
  logMessage: z.string(),
  loggedAt: z.union([z.string(), z.date()]),
});

const ShipmentSchema = z.object({
  id: z.string(),
  orderSnapshot: z.json(),
});

export const ItemDataWithInputSchema = z.array(
  ItemSchema.extend({
    logs: LogSchema.nullish(),
    shipment: ShipmentSchema.nullish(),
    orderInInput: z.string(),
  }),
);

export type Item = z.infer<typeof ItemSchema>;
