/**
 * Invoice Validation Schemas
 * Zod schemas for validating invoice-related data
 */

import { z } from "zod";
import { moneySchema } from "./money";

/**
 * Create Invoice Schema
 * Validates invoice creation from order
 */
export const createInvoiceSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  dueDate: z.string().datetime("Invalid due date format").or(z.string().date("Invalid due date format")),
  tax: moneySchema.optional(),
  shipping: moneySchema.optional(),
  discount: moneySchema.optional(),
  notes: z.string().optional(),
  paymentLink: z.string().url("Invalid payment link URL").optional().or(z.literal("")),
});

/**
 * Update Invoice Schema
 */
export const updateInvoiceSchema = z.object({
  id: z.string().min(1, "Invoice ID is required"),
  status: z.enum(["draft", "sent", "paid", "partial", "overdue", "cancelled"]).optional(),
  amountPaid: moneySchema.optional(),
  tax: moneySchema.optional(),
  shipping: moneySchema.optional(),
  discount: moneySchema.optional(),
  total: moneySchema.optional(),
  amountDue: moneySchema.optional(),
  dueDate: z.string().datetime().optional().or(z.string().date()).or(z.literal("")),
  sentAt: z.string().datetime().optional().or(z.literal("")),
  paidAt: z.string().datetime().optional().or(z.literal("")),
  cancelledAt: z.string().datetime().optional().or(z.literal("")),
  paymentLink: z.string().url("Invalid payment link URL").optional().or(z.literal("")),
  notes: z.string().optional(),
});

export type CreateInvoiceFormData = z.infer<typeof createInvoiceSchema>;
export type UpdateInvoiceFormData = z.infer<typeof updateInvoiceSchema>;
