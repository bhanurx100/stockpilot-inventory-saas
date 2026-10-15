/**
 * Order validation schemas
 * Zod schemas for order-related form validation
 */

import { z } from "zod";
import { moneySchema } from "./money";

/**
 * Shipping address schema
 */
export const shippingAddressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().optional(),
  zipCode: z.string().min(1, "Zip code is required"),
  country: z.string().min(1, "Country is required"),
});

/**
 * Billing address schema
 */
export const billingAddressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().optional(),
  zipCode: z.string().min(1, "Zip code is required"),
  country: z.string().min(1, "Country is required"),
});

/**
 * Order item schema
 */
export const orderItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

/**
 * Helper function to transform empty address objects to undefined
 */
const transformEmptyAddress = (address: unknown): unknown => {
  if (!address || typeof address !== "object") return address;
  
  const addr = address as Record<string, unknown>;
  const hasRequiredFields = 
    addr.street && typeof addr.street === "string" && addr.street.trim() !== "" &&
    addr.city && typeof addr.city === "string" && addr.city.trim() !== "" &&
    addr.zipCode && typeof addr.zipCode === "string" && addr.zipCode.trim() !== "" &&
    addr.country && typeof addr.country === "string" && addr.country.trim() !== "";
  
  return hasRequiredFields ? address : undefined;
};

/**
 * Create order schema
 */
export const createOrderSchema = z.object({
  clientId: z.string().optional(),
  warehouseId: z.string().min(1).max(100).optional(),
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
  shippingAddress: z.preprocess(transformEmptyAddress, shippingAddressSchema.optional()),
  billingAddress: z.preprocess(transformEmptyAddress, billingAddressSchema.optional()),
  tax: moneySchema.optional(),
  shipping: moneySchema.optional(),
  discount: moneySchema.optional(),
  notes: z.string().optional(),
});

/**
 * Update order schema
 */
export const updateOrderSchema = z.object({
  status: z
    .enum([
      "draft",
      "pending",
      "confirmed",
      "processing",
      "packed",
      "shipped",
      "delivered",
      "cancelled",
    ])
    .optional(),
  paymentStatus: z.enum(["unpaid", "paid", "refunded", "partial"]).optional(),
  shippingAddress: shippingAddressSchema.optional(),
  billingAddress: billingAddressSchema.optional(),
  trackingNumber: z.string().trim().min(3).max(100).optional(),
  trackingCarrier: z.enum(["usps", "ups", "fedex", "dhl", "other"]).optional(),
  labelUrl: z.string().url("Invalid label URL").optional().or(z.literal("")),
  trackingUrl: z
    .string()
    .url("Invalid tracking URL")
    .optional()
    .or(z.literal("")),
  estimatedDelivery: z
    .string()
    .datetime()
    .optional()
    .or(z.string().date())
    .or(z.literal("")),
  shippedAt: z
    .string()
    .datetime()
    .optional()
    .or(z.string().date())
    .or(z.literal("")),
  deliveredAt: z
    .string()
    .datetime()
    .optional()
    .or(z.string().date())
    .or(z.literal("")),
  cancelledAt: z
    .string()
    .datetime()
    .optional()
    .or(z.string().date())
    .or(z.literal("")),
  notes: z.string().max(2000).optional(),
});

export const orderListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(1000).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z
    .enum([
      "draft",
      "pending",
      "confirmed",
      "processing",
      "packed",
      "shipped",
      "delivered",
      "cancelled",
    ])
    .optional(),
  paymentStatus: z.enum(["unpaid", "paid", "refunded", "partial"]).optional(),
  search: z.string().trim().max(200).optional(),
});

/**
 * Create order form data type
 */
export type CreateOrderFormData = z.infer<typeof createOrderSchema>;

/**
 * Update order form data type
 */
export type UpdateOrderFormData = z.infer<typeof updateOrderSchema>;

/**
 * Scan-to-pick schema
 */
export const scanPickSchema = z.object({
  barcodeOrSku: z.string().trim().min(1, "Barcode or SKU is required").max(100),
  quantity: z.coerce.number().int().positive().default(1),
  warehouseId: z.string().trim().optional(),
});
export type ScanPickInput = z.infer<typeof scanPickSchema>;

/**
 * Ship order schema
 */
export const shipOrderSchema = z.object({
  trackingNumber: z.string().trim().min(3, "Tracking number must be at least 3 characters").max(100),
  trackingCarrier: z.enum(["usps", "ups", "fedex", "dhl", "bluedart", "delhivery", "other"]).default("other"),
  trackingUrl: z.string().url("Invalid tracking URL").optional().or(z.literal("")),
  labelUrl: z.string().url("Invalid label URL").optional().or(z.literal("")),
  ewayBillNumber: z.string().trim().regex(/^[0-9]{12}$/, "E-Way Bill Number must be exactly 12 numeric digits").optional().or(z.literal("")),
  shippedAt: z.string().datetime().optional().or(z.string().date()),
});
export type ShipOrderInput = z.infer<typeof shipOrderSchema>;
