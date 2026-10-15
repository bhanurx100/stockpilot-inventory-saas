/**
 * Quantity helpers — the single way to parse inventory quantities (Phase 3, R2).
 *
 * Quantities are Int32 in the database (max 2_147_483_647) and plain JSON numbers
 * over the wire. `parseQuantity` NEVER throws and NEVER produces NaN: bad input
 * returns `{ ok: false, error }` so callers (import rows, API routes, seeds) can
 * report a per-row/per-field error instead of crashing with `BigInt(NaN)`.
 */

/** Maximum storable quantity (Prisma Int / BSON int32). */
export const MAX_QUANTITY = 2_147_483_647;

/** Minimum storable quantity. */
export const MIN_QUANTITY = 0;

export type QuantityParseResult =
  | { ok: true; value: number }
  | { ok: false; error: string };

export interface ParseQuantityOptions {
  /** Inclusive minimum (default 0). */
  min?: number;
  /** Inclusive maximum (default MAX_QUANTITY). */
  max?: number;
}

/**
 * Parse an unknown input (form value, CSV cell, API body) into a safe integer quantity.
 * Accepts: number, numeric string ("12", " 12 ", "12.0"), bigint within range.
 * Rejects: NaN/Infinity, "", null/undefined, "12abc", 12.5, negatives (below min),
 * values above max, unsafe integers — with a human-readable error message.
 */
export function parseQuantity(
  input: unknown,
  options: ParseQuantityOptions = {},
): QuantityParseResult {
  const min = options.min ?? MIN_QUANTITY;
  const max = options.max ?? MAX_QUANTITY;

  if (input === null || input === undefined || input === "") {
    return { ok: false, error: "Quantity is required" };
  }

  let value: number;

  if (typeof input === "bigint") {
    if (input > BigInt(MAX_QUANTITY) || input < BigInt(Number.MIN_SAFE_INTEGER)) {
      return { ok: false, error: `Quantity out of range: ${input.toString()}` };
    }
    value = Number(input);
  } else if (typeof input === "number") {
    value = input;
  } else if (typeof input === "string") {
    const trimmed = input.trim();
    if (trimmed === "") {
      return { ok: false, error: "Quantity is required" };
    }
    value = Number(trimmed);
    if (!Number.isFinite(value)) {
      return {
        ok: false,
        error: `Invalid quantity "${input}" — must be a whole number`,
      };
    }
  } else {
    return {
      ok: false,
      error: `Invalid quantity type: ${typeof input}`,
    };
  }

  if (!Number.isFinite(value)) {
    return { ok: false, error: `Invalid quantity "${String(input)}"` };
  }
  if (!Number.isInteger(value)) {
    return {
      ok: false,
      error: `Quantity must be a whole number, received ${value}`,
    };
  }
  if (value < min) {
    return { ok: false, error: `Quantity must be at least ${min}` };
  }
  if (value > max) {
    return { ok: false, error: `Quantity must be at most ${max}` };
  }

  return { ok: true, value };
}

/**
 * Strict variant for import rows: like parseQuantity but also rejects numeric
 * strings that only parse partially (Number() already rejects "12abc").
 * Alias kept for readability at import call sites.
 */
export function parseImportQuantity(input: unknown): QuantityParseResult {
  return parseQuantity(input, { min: 0, max: MAX_QUANTITY });
}
