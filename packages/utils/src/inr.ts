/**
 * Indian Rupee (₹) & Indian Numbering System Formatting (Lakh/Crore)
 * (Phase 7 — Indian Business Readiness & Tax Compliance)
 */

import { roundMoney } from "./money";

const ONES = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const TENS = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function convertBelowThousand(n: number): string {
  let str = "";
  if (n >= 100) {
    str += ONES[Math.floor(n / 100)] + " Hundred ";
    n %= 100;
  }
  if (n >= 20) {
    str +=
      TENS[Math.floor(n / 10)] +
      (n % 10 !== 0 ? "-" + ONES[n % 10] : "") +
      " ";
  } else if (n > 0) {
    str += ONES[n] + " ";
  }
  return str.trim();
}

/**
 * Formats an amount in Indian Rupees (₹) with comma-separators conforming to
 * the Indian numbering system: 3 digits in rightmost group, then groups of 2 digits
 * (e.g. ₹1,23,456.78).
 */
export function formatINR(value: number | null | undefined): string {
  const num = roundMoney(Number(value) || 0);
  const formatted = num.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `₹${formatted}`;
}

/**
 * Formats monetary amounts into official Indian English statutory words
 * e.g. 100000 -> "Rupees One Lakh Only"
 *      47500.50 -> "Rupees Forty-Seven Thousand Five Hundred and Fifty Paise Only"
 */
export function formatIndianWords(value: number | null | undefined): string {
  const num = roundMoney(Number(value) || 0);
  if (num === 0) return "Rupees Zero Only";

  const isNegative = num < 0;
  const abs = Math.abs(num);
  const rupees = Math.floor(abs);
  const paise = Math.round((abs - rupees) * 100);

  let crore = Math.floor(rupees / 1_00_00_000);
  let remainder = rupees % 1_00_00_000;

  let lakh = Math.floor(remainder / 1_00_000);
  remainder %= 1_00_000;

  let thousand = Math.floor(remainder / 1_000);
  remainder %= 1_000;

  const parts: string[] = [];

  if (crore > 0) {
    parts.push(`${convertBelowThousand(crore)} Crore`);
  }
  if (lakh > 0) {
    parts.push(`${convertBelowThousand(lakh)} Lakh`);
  }
  if (thousand > 0) {
    parts.push(`${convertBelowThousand(thousand)} Thousand`);
  }
  if (remainder > 0) {
    parts.push(convertBelowThousand(remainder));
  }

  let result = (isNegative ? "Minus " : "") + "Rupees " + parts.join(" ");

  if (paise > 0) {
    result += ` and ${convertBelowThousand(paise)} Paise`;
  }

  return `${result.trim()} Only`;
}

/**
 * Formats large amounts using Indian compact notation (Lakh / Crore)
 * e.g. 150000 -> "₹1.50 Lakh", 25000000 -> "₹2.50 Cr".
 */
export function formatIndianCompact(value: number | null | undefined): string {
  const num = roundMoney(Number(value) || 0);
  const abs = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  if (abs >= 1_00_00_000) {
    const crores = abs / 1_00_00_000;
    return `${sign}₹${crores.toFixed(2)} Cr`;
  }
  if (abs >= 1_00_000) {
    const lakhs = abs / 1_00_000;
    return `${sign}₹${lakhs.toFixed(2)} Lakh`;
  }
  if (abs >= 1_000) {
    const thousands = abs / 1_000;
    return `${sign}₹${thousands.toFixed(2)} K`;
  }

  return formatINR(num);
}
