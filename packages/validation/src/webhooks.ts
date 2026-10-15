/**
 * Webhook / internal-call verification for inbound provider + QStash traffic.
 * Server-only (node:crypto). Pure logic — exercised by `npm run test:phase35`.
 */
import { z } from "zod";

/**
 * Shippo `track_updated` payload (only the fields we act on; `.passthrough()`
 * keeps unknown carrier fields for the movement/audit notes).
 */
export const shippoWebhookSchema = z.object({
  event: z.string().min(1, "event is required"),
  data: z
    .object({
      tracking_number: z.string().min(1).optional(),
      carrier: z.string().optional(),
      eta: z.string().optional(),
      tracking_status: z
        .object({
          status: z.string().min(1, "tracking_status.status is required"),
          status_details: z.string().optional(),
          status_date: z.string().optional(),
          // Shippo nests the tracking number on some event shapes and sends it at
          // the top level on others; both must be typed, not `passthrough()`-typed.
          tracking_number: z.string().min(1).optional(),
        })
        .passthrough()
        .optional(),
    })
    .passthrough()
    .optional(),
});

export type ShippoWebhookInput = z.infer<typeof shippoWebhookSchema>;

/**
 * Stripe Checkout Session metadata (written by us at checkout creation, echoed
 * back on the webhook). Validated before any DB write (Phase 3.5 — 6.2).
 */
export const checkoutMetadataSchema = z
  .object({
    type: z.enum(["order", "invoice"]),
    referenceId: z.string().min(1).optional(),
    orderId: z.string().min(1).optional(),
    invoiceId: z.string().min(1).optional(),
    userId: z.string().min(1).optional(),
  })
  .refine((meta) => Boolean(meta.referenceId || meta.orderId || meta.invoiceId), {
    message: "referenceId, orderId, or invoiceId is required",
    path: ["referenceId"],
  });

export type CheckoutMetadataInput = z.infer<typeof checkoutMetadataSchema>;

/** QStash email job payload (validated before an email is ever sent). */
export const emailQueueJobSchema = z.object({
  type: z.string().min(1),
  recipientEmail: z.string().email("recipientEmail must be a valid email"),
  recipientName: z.string().optional(),
  userId: z.string().optional(),
  data: z.record(z.string(), z.unknown()),
});

export type EmailQueueJobInput = z.infer<typeof emailQueueJobSchema>;
