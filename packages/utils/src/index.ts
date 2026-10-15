/**
 * @stockpilot/utils — platform-neutral shared utilities (web + native).
 * DOM-specific helpers stay in apps/web.
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { roundMoney } from "./money";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Money (integer-cent arithmetic — see ./money.ts and docs/PHASE-3.md)
export {
  toCents,
  fromCents,
  roundMoney,
  addMoney,
  subMoney,
  mulMoney,
  sumMoney,
  lineTotal,
  isMoneyAmount,
  MONEY_MAX_CENTS,
} from "./money";

// Quantities (Int32-safe parsing — see ./quantity.ts)
export {
  parseQuantity,
  parseImportQuantity,
  MAX_QUANTITY,
  MIN_QUANTITY,
  type QuantityParseResult,
  type ParseQuantityOptions,
} from "./quantity";

// Indian Rupee & Numbering System formatting (Phase 7)
export { formatINR, formatIndianWords, formatIndianCompact } from "./inr";

/** Format a number as currency; crash-safe (null/NaN → $0.00) and 2-dp rounded. */
export function formatCurrency(value: number | null | undefined): string {
  return `$${roundMoney(Number(value) || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

