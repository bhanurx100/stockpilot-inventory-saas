/**
 * Warehouse validation (Phase 8 — matrix 3.6/3.7).
 *
 * Replaces the previous hand-rolled `if (!name)` check so every mutating route
 * validates identically and the client can import the same rules.
 */
import { z } from "zod";
import { gstinSchema, INDIAN_STATE_CODES } from "./gst";

/** Trimmed, non-empty, length-bounded display name. */
const nameSchema = z
  .string()
  .trim()
  .min(1, "Warehouse name is required")
  .max(120, "Warehouse name must be 120 characters or fewer");

/** Optional free text that normalises "" to null. */
const optionalText = (max: number, label: string) =>
  z
    .string()
    .trim()
    .max(max, `${label} must be ${max} characters or fewer`)
    .optional()
    .nullable()
    .transform((value) => (value ? value : null));

export const WAREHOUSE_TYPES = [
  "main",
  "secondary",
  "storage",
  "hub",
  "store",
  "cold-storage",
  "distribution",
] as const;

export type WarehouseType = (typeof WAREHOUSE_TYPES)[number];

export const createWarehouseSchema = z.object({
  name: nameSchema,
  address: optionalText(500, "Address"),
  // Tax identity stored per premises: Rule 55 challans must print THIS premises'
  // real GSTIN, and place-of-supply needs the real state code. Empty → null.
  gstin: optionalText(15, "GSTIN")
    .refine((v) => !v || gstinSchema.safeParse(v).success, "Invalid GSTIN (format, state code or checksum)"),
  stateCode: z
    .string()
    .trim()
    .length(2, "State code must be the 2-digit Indian state code")
    .refine((v) => Boolean(INDIAN_STATE_CODES[v]), "Unrecognized Indian state code")
    .optional()
    .nullable()
    .transform((v) => (v ? v : null)),
  // Free-form in the DB (legacy rows have arbitrary values), but trimmed/bounded.
  type: optionalText(60, "Type"),
  status: z.boolean().optional(),
});

export const updateWarehouseSchema = createWarehouseSchema.partial().extend({
  id: z.string().min(1, "Warehouse ID is required"),
});

/** Query filters for GET /api/warehouses. */
export const warehouseFiltersSchema = z.object({
  search: z.string().trim().max(120).optional(),
  status: z.enum(["all", "active", "inactive"]).optional(),
  type: z.string().trim().max(60).optional(),
  page: z.coerce.number().int().min(1).max(10_000).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

export type CreateWarehouseFormData = z.infer<typeof createWarehouseSchema>;
export type UpdateWarehouseFormData = z.infer<typeof updateWarehouseSchema>;
export type WarehouseFiltersInput = z.infer<typeof warehouseFiltersSchema>;
