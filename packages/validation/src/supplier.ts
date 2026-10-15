import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(1, "Supplier name is required")
  .max(100, "Supplier name must be 100 characters or less");

const optionalText = (max: number, label: string) =>
  z
    .string()
    .trim()
    .max(max, `${label} must be ${max} characters or fewer`)
    .optional()
    .nullable()
    .transform((value) => (value && value.length > 0 ? value : null));

const emailSchema = z
  .string()
  .trim()
  .max(254, "Email must be 254 characters or fewer")
  .optional()
  .nullable()
  .transform((value) => (value && value.length > 0 ? value : null))
  .refine(
    (value) => value === null || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    { message: "Invalid email address" }
  );

const phoneSchema = z
  .string()
  .trim()
  .max(40, "Phone must be 40 characters or fewer")
  .optional()
  .nullable()
  .transform((value) => (value && value.length > 0 ? value : null));

export const SUPPLIER_ONBOARDING_STATUSES = [
  "pending",
  "approved",
  "suspended",
] as const;

export const createSupplierSchema = z.object({
  name: nameSchema,
  userId: z.string().min(1, "User ID is required"),
  status: z.boolean().optional().default(true),
  description: optionalText(500, "Description"),
  notes: optionalText(1000, "Notes"),
  email: emailSchema,
  phone: phoneSchema,
  address: optionalText(300, "Address"),
  city: optionalText(120, "City"),
  country: optionalText(120, "Country"),
  paymentTerms: optionalText(200, "Payment terms"),
  leadTimeDays: z.coerce.number().int().min(0).max(3650).optional().nullable(),
  gstin: z.string().trim().toUpperCase().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN format").optional().nullable(),
  onboardingStatus: z.enum(SUPPLIER_ONBOARDING_STATUSES).optional(),
  verified: z.boolean().optional(),
  marketplaceVisible: z.boolean().optional(),
});

export const updateSupplierSchema = z.object({
  id: z.string().min(1, "Supplier ID is required"),
  name: nameSchema.optional(),
  status: z.boolean().optional(),
  description: optionalText(500, "Description"),
  notes: optionalText(1000, "Notes"),
  email: emailSchema,
  phone: phoneSchema,
  address: optionalText(300, "Address"),
  city: optionalText(120, "City"),
  country: optionalText(120, "Country"),
  paymentTerms: optionalText(200, "Payment terms"),
  leadTimeDays: z.coerce.number().int().min(0).max(3650).optional().nullable(),
  gstin: z.string().trim().toUpperCase().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN format").optional().nullable(),
  onboardingStatus: z.enum(SUPPLIER_ONBOARDING_STATUSES).optional(),
  verified: z.boolean().optional(),
  marketplaceVisible: z.boolean().optional(),
});

export const patchSupplierSchema = updateSupplierSchema.omit({ id: true });

export const supplierOnboardingSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  address: optionalText(300, "Address"),
  city: optionalText(120, "City"),
  country: optionalText(120, "Country"),
  description: optionalText(500, "Description"),
  paymentTerms: optionalText(200, "Payment terms"),
  leadTimeDays: z.coerce.number().int().min(0).max(3650).optional().nullable(),
});

export const createSupplierRatingSchema = z.object({
  supplierId: z.string().min(1, "Supplier ID is required"),
  rating: z.coerce.number().int().min(1).max(5),
  title: optionalText(120, "Title"),
  comment: optionalText(1000, "Comment"),
  orderId: z.string().min(1).optional().nullable(),
});

export const supplierFiltersSchema = z.object({
  search: z.string().trim().max(120).optional(),
  status: z.enum(["all", "active", "inactive"]).optional(),
  verified: z.enum(["all", "verified", "unverified"]).optional(),
  onboardingStatus: z
    .enum(["all", "pending", "approved", "suspended"])
    .optional(),
  country: z.string().trim().max(120).optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  sort: z.enum(["name", "rating", "performance", "recent"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  page: z.coerce.number().int().min(1).max(10000).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  marketplaceOnly: z.coerce.boolean().optional(),
});

export const supplierCompareSchema = z.object({
  ids: z
    .string()
    .min(1)
    .transform((value) =>
      value
        .split(",")
        .map((part) => part.trim())
        .filter((part) => part.length > 0)
        .slice(0, 6)
    )
    .refine((value) => value.length >= 2 && value.length <= 6, {
      message: "Provide 2 to 6 supplier ids",
    }),
});

export type SupplierFormData = z.infer<typeof createSupplierSchema>;
export type UpdateSupplierFormData = z.infer<typeof updateSupplierSchema>;
export type SupplierFiltersInput = z.infer<typeof supplierFiltersSchema>;
export type CreateSupplierRatingFormData = z.infer<
  typeof createSupplierRatingSchema
>;
