/**
 * Product validation schemas
 * Zod schemas used by product forms and API; productSchema for form, createProductSchema/updateProductSchema for API.
 * calculateProductStatus() derives "available" | "stock_low" | "stock_out" from quantity and reservedQuantity.
 * Phase 3: quantity is Int32-capped (no BigInt), price must be 2-dp money.
 */

import { z } from "zod";
import type { ProductStatus } from "@stockpilot/types";
import { MAX_QUANTITY } from "@stockpilot/utils";
import { moneySchema } from "./money";

/**
 * Product form validation schema
 * Used for creating and updating products
 */
export const productSchema = z.object({
  productName: z
    .string()
    .min(1, "Product Name is required")
    .max(100, "Product Name must be 100 characters or less"),
  sku: z
    .string()
    .min(1, "SKU is required")
    .regex(/^[a-zA-Z0-9-_]+$/, "SKU must be alphanumeric"),
  quantity: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const trimmed = val.trim();
        if (trimmed === "") return val;
        return Number(trimmed);
      }
      return val;
    },
    z
      .number()
      .int("Quantity must be an integer")
      .nonnegative("Quantity cannot be negative")
      .max(MAX_QUANTITY, `Quantity must be at most ${MAX_QUANTITY}`)
  ),
  price: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const trimmed = val.trim();
        if (trimmed === "") return val;
        return Number(trimmed);
      }
      return val;
    },
    moneySchema
  ),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
  imageFileId: z.string().optional(),
  hsnCode: z
    .string()
    .trim()
    .regex(/^[0-9]{4}([0-9]{2}|[0-9]{4})?$/, "HSN code must be 4, 6, or 8 digits")
    .optional()
    .or(z.literal("")),
  gstRate: z.coerce.number().min(0).max(100).optional(),
  expirationDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD format")
    .optional()
    .or(z.literal("")),
});

/**
 * Product form data type inferred from schema
 */
export type ProductFormData = z.infer<typeof productSchema>;

/**
 * Product creation input validation schema
 * For API requests
 */
export const createProductSchema = z.object({
  name: z.string().min(1).max(100),
  sku: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z0-9-_]+$/),
  price: moneySchema,
  quantity: z.number().int().nonnegative().max(MAX_QUANTITY),
  status: z.enum(["Available", "Stock Low", "Stock Out"]),
  categoryId: z.string().min(1),
  supplierId: z.string().min(1),
  userId: z.string().min(1),
  hsnCode: z.string().trim().regex(/^[0-9]{4}([0-9]{2}|[0-9]{4})?$/).optional().nullable(),
  gstRate: z.number().min(0).max(100).optional().nullable(),
});

/**
 * Product update input validation schema
 * For API requests
 */
export const updateProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100).optional(),
  sku: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z0-9-_]+$/)
    .optional(),
  price: moneySchema.optional(),
  quantity: z.number().int().nonnegative().max(MAX_QUANTITY).optional(),
  status: z.enum(["Available", "Stock Low", "Stock Out"]).optional(),
  categoryId: z.string().min(1).optional(),
  supplierId: z.string().min(1).optional(),
  hsnCode: z.string().trim().regex(/^[0-9]{4}([0-9]{2}|[0-9]{4})?$/).optional().nullable(),
  gstRate: z.number().min(0).max(100).optional().nullable(),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
  imageFileId: z.string().optional(),
  expirationDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD format")
    .optional()
    .or(z.literal("")),
});

/**
 * Calculate product status based on quantity
 * @param quantity - Product quantity
 * @returns ProductStatus
 */
export const calculateProductStatus = (
  quantity: number,
  reservedQuantity = 0,
): ProductStatus => {
  const available = quantity - reservedQuantity;
  if (available > 20) return "Available";
  if (available > 0 && available <= 20) return "Stock Low";
  return "Stock Out";
};

