/**
 * Indian GSTIN, HSN/SAC, E-Way Bill, and GST Tax Validation Schemas (Phase 7)
 */

import { z } from "zod";

/**
 * Standard Indian State Codes (01 to 38 + 97 Other Territory)
 */
export const INDIAN_STATE_CODES: Record<string, string> = {
  "01": "Jammu and Kashmir",
  "02": "Himachal Pradesh",
  "03": "Punjab",
  "04": "Chandigarh",
  "05": "Uttarakhand",
  "06": "Haryana",
  "07": "Delhi",
  "08": "Rajasthan",
  "09": "Uttar Pradesh",
  "10": "Bihar",
  "11": "Sikkim",
  "12": "Arunachal Pradesh",
  "13": "Nagaland",
  "14": "Manipur",
  "15": "Mizoram",
  "16": "Tripura",
  "17": "Meghalaya",
  "18": "Assam",
  "19": "West Bengal",
  "20": "Jharkhand",
  "21": "Odisha",
  "22": "Chhattisgarh",
  "23": "Madhya Pradesh",
  "24": "Gujarat",
  "25": "Daman and Diu",
  "26": "Dadra and Nagar Haveli",
  "27": "Maharashtra",
  "29": "Karnataka",
  "30": "Goa",
  "31": "Lakshadweep",
  "32": "Kerala",
  "33": "Tamil Nadu",
  "34": "Puducherry",
  "35": "Andaman and Nicobar Islands",
  "36": "Telangana",
  "37": "Andhra Pradesh",
  "38": "Ladakh",
  "97": "Other Territory",
};

/**
 * Regex for 15-character Indian Goods and Services Tax Identification Number (GSTIN):
 * Format: 2 digits (State Code) + 10 chars (PAN) + 1 entity code + 1 'Z' + 1 checksum digit/char.
 * The final checksum character is validated by the official mod-36 algorithm below.
 * Example: 27AAPFU0939F1ZV (checksum-verified sample)
 */
export const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

/**
 * Regex for 6-digit or 8-digit HSN code (Harmonized System of Nomenclature)
 * or 6-digit SAC code (Services Accounting Code).
 */
export const HSN_SAC_REGEX = /^[0-9]{4}([0-9]{2}|[0-9]{4})?$/;

/**
 * Characters and factors of the official GSTN mod-36 checksum over the first
 * 14 GSTIN characters. The 15th character is the base-36 digit-sum remainder,
 * matching published GSTN/ICAN implementations and sample GSTINs.
 */
export const GSTIN_CHECKSUM_CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Computes the official GSTIN mod-36 checksum character for the first 14
 * characters (odd positions factored ×1, even positions ×2, digit-summed in
 * base 36). Returns `null` when the input is not 14 legal characters.
 */
export function computeGSTINChecksum(first14: string): string | null {
  const clean = first14.trim().toUpperCase();
  if (clean.length !== 14) return null;
  let sum = 0;
  for (let i = 0; i < 14; i += 1) {
    const n = GSTIN_CHECKSUM_CHARSET.indexOf(clean[i]!);
    if (n < 0) return null;
    const multiplied = n * (i % 2 === 0 ? 1 : 2);
    sum += Math.floor(multiplied / 36) + (multiplied % 36);
  }
  return GSTIN_CHECKSUM_CHARSET[(36 - (sum % 36)) % 36]!;
}

/** True when the 15th character matches the computed mod-36 checksum. */
export function isValidGSTINChecksum(gstin: string): boolean {
  const clean = gstin.trim().toUpperCase();
  if (clean.length !== 15) return false;
  return computeGSTINChecksum(clean.slice(0, 14)) === clean[14];
}

/**
 * Regex for 12-digit Indian E-Way Bill Number
 */
export const EWAY_BILL_REGEX = /^[0-9]{12}$/;

/**
 * Validates a GSTIN string: length, structural format (state code + PAN + entity + 'Z'),
 * a recognised Indian state prefix, and the official mod-36 checksum character.
 * Rejection reasons are precise so data entry can fix the actual defect.
 */
export function validateGSTIN(gstin: string): {
  valid: boolean;
  stateCode?: string;
  stateName?: string;
  pan?: string;
  error?: string;
} {
  const clean = gstin.trim().toUpperCase();
  if (clean.length !== 15) {
    return { valid: false, error: "GSTIN must be exactly 15 characters long" };
  }
  if (!GSTIN_REGEX.test(clean)) {
    return { valid: false, error: "GSTIN format invalid (expected 2-digit state + 10-char PAN + 1Z + checksum)" };
  }
  const stateCode = clean.slice(0, 2);
  const stateName = INDIAN_STATE_CODES[stateCode];
  if (!stateName) {
    return { valid: false, error: `Invalid state code '${stateCode}' in GSTIN` };
  }
  if (!isValidGSTINChecksum(clean)) {
    const expected = computeGSTINChecksum(clean.slice(0, 14));
    return {
      valid: false,
      error: `GSTIN checksum invalid (expected '${expected ?? "?"}' as the 15th character)`,
    };
  }
  const pan = clean.slice(2, 12);
  return { valid: true, stateCode, stateName, pan };
}

/**
 * Validates HSN or SAC code format (4, 6, or 8 digits) plus a real HSN chapter
 * (first two digits 01–98 — chapter 00 does not exist and higher values are
 * reserved, so a code like "0096" or "9988" is structurally shaped but false).
 */
export function validateHSN(hsn: string): { valid: boolean; error?: string } {
  const clean = hsn.trim();
  if (!HSN_SAC_REGEX.test(clean)) {
    return { valid: false, error: "HSN/SAC code must be 4, 6, or 8 numeric digits" };
  }
  const chapter = Number.parseInt(clean.slice(0, 2), 10);
  if (chapter < 1 || chapter > 98) {
    return { valid: false, error: `HSN chapter '${clean.slice(0, 2)}' does not exist (valid chapters are 01–98)` };
  }
  return { valid: true };
}

/**
 * Validates E-Way Bill Number (exactly 12 numeric digits).
 */
export function validateEWayBill(num: string): { valid: boolean; formattedNumber?: string; error?: string } {
  const clean = num.replace(/\s+/g, "").trim();
  if (!EWAY_BILL_REGEX.test(clean)) {
    return { valid: false, error: "E-Way Bill Number must consist of exactly 12 numeric digits" };
  }
  const formatted = `${clean.slice(0, 4)} ${clean.slice(4, 8)} ${clean.slice(8, 12)}`;
  return { valid: true, formattedNumber: formatted };
}

export const gstinSchema = z
  .string()
  .trim()
  .toUpperCase()
  .refine((val) => validateGSTIN(val).valid, {
    message: "Invalid GSTIN format or unrecognized Indian state code",
  });

export const optionalGstinSchema = z
  .string()
  .trim()
  .toUpperCase()
  .optional()
  .nullable()
  .refine((val) => !val || validateGSTIN(val).valid, {
    message: "Invalid GSTIN format or unrecognized Indian state code",
  });

export const hsnCodeSchema = z
  .string()
  .trim()
  .refine((val) => validateHSN(val).valid, {
    message: "HSN/SAC code must be 4, 6, or 8 digits",
  });

export const optionalHsnCodeSchema = z
  .string()
  .trim()
  .optional()
  .nullable()
  .refine((val) => !val || validateHSN(val).valid, {
    message: "HSN/SAC code must be 4, 6, or 8 digits",
  });

export const ewayBillSchema = z
  .string()
  .trim()
  .refine((val) => validateEWayBill(val).valid, {
    message: "E-Way Bill Number must be exactly 12 numeric digits",
  });

export const optionalEwayBillSchema = z
  .string()
  .trim()
  .optional()
  .nullable()
  .refine((val) => !val || validateEWayBill(val).valid, {
    message: "E-Way Bill Number must be exactly 12 numeric digits",
  });

export const gstCalculationItemSchema = z.object({
  productId: z.string().optional(),
  productName: z.string().min(1, "Product name required"),
  hsnCode: optionalHsnCodeSchema,
  quantity: z.number().int().min(1),
  unitPrice: z.number().min(0),
  taxRatePercent: z.number().min(0).max(100).default(18), // Standard 18% GST rate default
});

export const gstInvoiceCalculateSchema = z.object({
  supplierGstin: optionalGstinSchema,
  supplierStateCode: z.string().length(2),
  customerGstin: optionalGstinSchema,
  customerStateCode: z.string().length(2),
  items: z.array(gstCalculationItemSchema).min(1, "At least one item required"),
});

export const generateDeliveryChallanSchema = z.object({
  transferId: z.string().min(1, "Transfer ID required"),
  dispatchReason: z.enum([
    "inter_warehouse_transfer",
    "job_work",
    "demo_supply",
    "exhibition",
  ]).default("inter_warehouse_transfer"),
  transporterName: z.string().max(100).optional(),
  vehicleNumber: z.string().max(20).optional(),
  ewayBillNumber: optionalEwayBillSchema,
  notes: z.string().max(500).optional(),
});
