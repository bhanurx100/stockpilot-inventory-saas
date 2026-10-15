/**
 * Money validation schema — every monetary input must be:
 * a finite number, ≥ 0 (use .nonnegative() variants below), within range, and
 * exactly representable at 2 decimal places. Enforced on both web and mobile
 * via @stockpilot/validation (ADR: docs/PHASE-3.md §Money).
 */
import { z } from "zod";
import { isMoneyAmount, MONEY_MAX_CENTS } from "@stockpilot/utils";

/** A non-negative money amount in dollars with at most 2 decimal places. */
export const moneySchema = z
  .number({ invalid_type_error: "Amount must be a number" })
  .finite("Amount must be a finite number")
  .nonnegative("Amount cannot be negative")
  .max(MONEY_MAX_CENTS / 100, "Amount is too large")
  .refine(isMoneyAmount, {
    message: "Amount must have at most 2 decimal places",
  });

/** Optional variant for partial updates. */
export const optionalMoneySchema = moneySchema.optional();
