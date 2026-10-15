import { z } from "zod";

export const actionResolutionTypeSchema = z.enum([
  "rebalance_transfer",
  "expedite_po",
  "reconcile_variance",
  "restock_po",
  "dismiss",
]);

export const transferRebalanceParamsSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  fromWarehouseId: z.string().min(1, "Source warehouse is required"),
  toWarehouseId: z.string().min(1, "Destination warehouse is required"),
  quantity: z.number().int().positive("Transfer quantity must be greater than 0"),
  notes: z.string().optional(),
});

export const restockPoParamsSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  warehouseId: z.string().min(1, "Destination warehouse is required"),
  quantity: z.number().int().positive("Restock quantity must be greater than 0"),
  unitCost: z.number().nonnegative("Unit cost cannot be negative").optional(),
});

export const expeditePoParamsSchema = z.object({
  poId: z.string().min(1, "Purchase Order ID is required"),
});

export const reconcileVarianceParamsSchema = z.object({
  movementId: z.string().min(1, "Movement ID is required"),
});

export const resolveActionSchema = z.object({
  exceptionId: z.string().min(1, "Exception ID is required"),
  resolutionType: actionResolutionTypeSchema,
  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
  params: z.record(z.unknown()).optional(),
});

export const actionFilterSchema = z.object({
  type: z.enum([
    "all",
    "stockout_risk",
    "overdue_po",
    "inventory_variance",
    "rebalance_opportunity",
  ]).default("all"),
  severity: z.enum(["all", "danger", "warning", "info"]).default("all"),
});

export type ResolveActionFormData = z.infer<typeof resolveActionSchema>;
export type ActionFilterInput = z.infer<typeof actionFilterSchema>;
export type TransferRebalanceParams = z.infer<typeof transferRebalanceParamsSchema>;
export type RestockPoParams = z.infer<typeof restockPoParamsSchema>;
export type ExpeditePoParams = z.infer<typeof expeditePoParamsSchema>;
export type ReconcileVarianceParams = z.infer<typeof reconcileVarianceParamsSchema>;
