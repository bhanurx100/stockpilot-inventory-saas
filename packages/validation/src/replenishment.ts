import { z } from "zod";

export const replenishmentParamsSchema = z.object({
  leadTimeDaysOverride: z.number().int().min(1).max(365).optional().nullable(),
  safetyBufferDaysOverride: z.number().min(0).max(180).optional().nullable(),
  serviceLevelZScore: z.number().min(1.0).max(3.0).optional(),
  minOrderQuantity: z.number().int().min(1).optional(),
  packSize: z.number().int().min(1).optional(),
});

export const replenishmentQuerySchema = z.object({
  warehouseId: z.string().optional().nullable(),
  search: z.string().optional().nullable(),
  status: z.enum(["all", "urgent", "soon", "healthy", "overstocked"]).optional().default("all"),
  sort: z.enum(["urgency", "velocity", "suggestedQty", "stockoutDate", "name"]).optional().default("urgency"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const generateDraftPOSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  warehouseId: z.string().min(1, "Warehouse ID is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1 unit"),
  unitCost: z.number().min(0).optional(),
  notes: z.string().max(500).optional(),
});

export type ReplenishmentParamsFormData = z.infer<typeof replenishmentParamsSchema>;
export type ReplenishmentQueryInput = z.infer<typeof replenishmentQuerySchema>;
export type GenerateDraftPOFormData = z.infer<typeof generateDraftPOSchema>;
