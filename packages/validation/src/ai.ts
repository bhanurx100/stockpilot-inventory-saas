import { z } from "zod";

export const aiToolNameSchema = z.enum([
  "inventory",
  "sales",
  "supplier",
  "warehouse",
  "forecast",
  "invoice",
  "order",
]);

export const aiProposalToolSchema = z.enum([
  "reorder.suggest",
  "transfer.suggest",
  "invoice.remind",
  "order.review",
  "stock.adjust",
]);

export const aiProposalStatusSchema = z.enum([
  "draft",
  "confirmed",
  "rejected",
  "executed",
  "expired",
]);

export const aiAskSchema = z.object({
  question: z.string().trim().min(1).max(2000),
});

export type AiAskFormData = z.infer<typeof aiAskSchema>;

export const aiProposalCreateSchema = z.object({
  tool: aiProposalToolSchema,
  title: z.string().trim().min(1).max(200),
  summary: z.string().trim().max(2000).optional(),
  rationale: z.string().trim().max(4000).optional(),
  args: z.record(z.string(), z.unknown()),
  idempotencyKey: z.string().trim().min(1).max(128).optional(),
});

export type AiProposalCreateFormData = z.infer<typeof aiProposalCreateSchema>;

export const aiProposalActionSchema = z.object({
  action: z.enum(["confirm", "reject", "execute"]),
});

export type AiProposalActionFormData = z.infer<typeof aiProposalActionSchema>;

export const aiTransferExecuteSchema = z
  .object({
    productId: z.string().trim().min(1),
    fromWarehouseId: z.string().trim().min(1),
    toWarehouseId: z.string().trim().min(1),
    quantity: z.coerce.number().int().min(1).max(1000000),
    notes: z.string().trim().max(500).optional(),
  })
  .refine((value) => value.fromWarehouseId !== value.toWarehouseId, {
    message: "Source and destination warehouses must be different",
  });

export const aiStockAdjustExecuteSchema = z.object({
  productId: z.string().trim().min(1),
  quantity: z.coerce.number().int().min(0).max(1000000),
  reason: z.string().trim().max(500).optional(),
});

export const aiInvoiceRemindExecuteSchema = z.object({
  invoiceId: z.string().trim().min(1),
});

export const aiOrderReviewExecuteSchema = z.object({
  orderId: z.string().trim().min(1),
});

export const aiReorderExecuteSchema = z.object({
  productId: z.string().trim().min(1),
  quantity: z.coerce.number().int().min(1).max(1000000),
  note: z.string().trim().max(500).optional(),
});

export type AiTransferExecuteFormData = z.infer<typeof aiTransferExecuteSchema>;
export type AiStockAdjustExecuteFormData = z.infer<typeof aiStockAdjustExecuteSchema>;
export type AiInvoiceRemindExecuteFormData = z.infer<typeof aiInvoiceRemindExecuteSchema>;
export type AiOrderReviewExecuteFormData = z.infer<typeof aiOrderReviewExecuteSchema>;
export type AiReorderExecuteFormData = z.infer<typeof aiReorderExecuteSchema>;

export const aiProposalListQuerySchema = z.object({
  status: aiProposalStatusSchema.optional(),
  tool: aiProposalToolSchema.optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type AiProposalListQuery = z.infer<typeof aiProposalListQuerySchema>;
