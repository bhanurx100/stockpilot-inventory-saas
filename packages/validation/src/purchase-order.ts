import { z } from "zod";

export const poLineItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .positive("Quantity must be greater than zero"),
  unitCost: z
    .number()
    .nonnegative("Unit cost cannot be negative"),
});

export const createPurchaseOrderSchema = z.object({
  supplierId: z.string().min(1, "Supplier is required"),
  warehouseId: z.string().min(1, "Warehouse is required"),
  expectedDeliveryDate: z.string().optional().nullable(),
  taxRatePercent: z.number().min(0).max(100).optional().default(0),
  shippingCost: z.number().min(0).optional().default(0),
  notes: z.string().max(2000).optional().nullable(),
  items: z.array(poLineItemSchema).min(1, "At least one item is required"),
});

export const updatePurchaseOrderSchema = z.object({
  status: z
    .enum(["draft", "issued", "partially_received", "received", "cancelled"])
    .optional(),
  expectedDeliveryDate: z.string().optional().nullable(),
  notes: z.string().max(2000).optional().nullable(),
  vendorInvoiceNumber: z.string().optional().nullable(),
  vendorBilledAmount: z.number().nonnegative().optional().nullable(),
});

export const receivePOLineItemSchema = z.object({
  purchaseOrderItemId: z.string().min(1, "PO line item ID is required"),
  productId: z.string().min(1, "Product ID is required"),
  receivedQuantity: z
    .number()
    .int("Received quantity must be an integer")
    .nonnegative("Received quantity cannot be negative"),
  damagedQuantity: z
    .number()
    .int("Damaged quantity must be an integer")
    .nonnegative("Damaged quantity cannot be negative")
    .optional()
    .default(0),
  notes: z.string().max(500).optional().nullable(),
});

export const receivePurchaseOrderSchema = z.object({
  carrier: z.string().max(100).optional().nullable(),
  trackingNumber: z.string().max(100).optional().nullable(),
  billOfLading: z.string().max(100).optional().nullable(),
  damagePhotoUrl: z.string().optional().nullable(),
  notes: z.string().max(1000).optional().nullable(),
  idempotencyKey: z.string().max(128).optional().nullable(),
  allowOverage: z.boolean().optional().default(false),
  items: z
    .array(receivePOLineItemSchema)
    .min(1, "At least one item must be submitted for receipt"),
});

export const threeWayMatchSchema = z.object({
  vendorInvoiceNumber: z.string().optional().nullable(),
  vendorBilledAmount: z.number().nonnegative().optional().nullable(),
  tolerancePercent: z.number().min(0).max(100).optional().default(0),
});

export type CreatePurchaseOrderFormData = z.infer<typeof createPurchaseOrderSchema>;
export type UpdatePurchaseOrderFormData = z.infer<typeof updatePurchaseOrderSchema>;
export type ReceivePurchaseOrderFormData = z.infer<typeof receivePurchaseOrderSchema>;
export type ThreeWayMatchFormData = z.infer<typeof threeWayMatchSchema>;
