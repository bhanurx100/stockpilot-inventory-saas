/**
 * Stock Allocation & Transfer validation schemas
 */

import { z } from "zod";

export const createStockAllocationSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  warehouseId: z.string().min(1, "Warehouse is required"),
  quantity: z.number().int().min(0, "Quantity must be 0 or more"),
});

export const updateStockAllocationSchema = z.object({
  quantity: z.number().int().min(0, "Quantity must be 0 or more").optional(),
});

export const createStockTransferSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  fromWarehouseId: z.string().min(1, "Source warehouse is required"),
  toWarehouseId: z.string().min(1, "Destination warehouse is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  notes: z.string().max(500).optional(),
});

export type CreateStockAllocationFormData = z.infer<
  typeof createStockAllocationSchema
>;
export type UpdateStockAllocationFormData = z.infer<
  typeof updateStockAllocationSchema
>;
export type CreateStockTransferFormData = z.infer<
  typeof createStockTransferSchema
>;

export const stockAdjustmentReasonSchema = z.enum([
  "DAMAGED",
  "SHRINKAGE",
  "CYCLE_COUNT_VARIANCE",
  "FOUND",
  "CUSTOMER_RETURN",
  "EXPIRY",
  "DATA_CORRECTION",
]);

export const createStockAdjustmentSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  warehouseId: z.string().optional().nullable(),
  newQuantity: z.number().int().min(0, "New quantity must be 0 or more"),
  reason: stockAdjustmentReasonSchema,
  notes: z.string().max(500).optional(),
});

export type CreateStockAdjustmentFormData = z.infer<
  typeof createStockAdjustmentSchema
>;

