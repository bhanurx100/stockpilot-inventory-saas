/**
 * Money helpers — integer-cent arithmetic at computation boundaries.
 *
 * ADR (docs/PHASE-3.md §Money): storage stays IEEE-754 `Float` for API/mobile
 * compatibility, but every sum/product/discount goes through integer cents here so
 * rounding drift cannot accumulate. All money inputs are validated to ≤ 2 decimal
 * places by `moneySchema` (@stockpilot/validation) before reaching these helpers.
 */

/** Upper bound for a single money amount in cents ($100,000,000.00). */
export const MONEY_MAX_CENTS = 100_000_000_00;

/**
 * Scale a money amount to integer cents, tolerant of binary-float noise
 * (e.g. 10.005 * 100 === 1000.49999… → 1001 half-up instead of truncating).
 * Non-finite input throws — callers must validate first (moneySchema/roundMoney).
 */
export function toCents(amount: number): number {
  const value = Number(amount);
  if (!Number.isFinite(value)) {
    throw new Error(`Invalid money amount: ${amount}`);
  }
  const scaled = Number((value * 100).toPrecision(12));
  const cents = Math.round(scaled);
  if (Math.abs(cents) > MONEY_MAX_CENTS) {
    throw new Error(`Money amount out of range: ${amount}`);
  }
  return cents;
}

/** Convert integer cents back to a money amount (always ≤ 2 decimal places). */
export function fromCents(cents: number): number {
  if (!Number.isInteger(cents)) {
    throw new Error(`Cents must be an integer, received: ${cents}`);
  }
  return cents / 100;
}

/**
 * Round any finite number to a 2-dp money amount (half-up).
 * Non-finite values (NaN/Infinity/undefined coerced) normalize to 0 so display
 * helpers stay crash-safe (currency-crash class — matrix 5.9).
 */
export function roundMoney(amount: number | null | undefined): number {
  const value = Number(amount);
  if (!Number.isFinite(value)) return 0;
  try {
    return fromCents(toCents(value));
  } catch {
    return 0;
  }
}

/** Add money amounts exactly via cents: addMoney(0.1, 0.2) === 0.3. */
export function addMoney(...amounts: (number | null | undefined)[]): number {
  let cents = 0;
  for (const amount of amounts) {
    cents += toCents(roundMoney(amount));
  }
  return fromCents(cents);
}

/** Subtract (a - b) exactly via cents. */
export function subMoney(
  a: number | null | undefined,
  b: number | null | undefined,
): number {
  return fromCents(toCents(roundMoney(a)) - toCents(roundMoney(b)));
}

/**
 * Multiply an amount by a quantity exactly via cents
 * (mulMoney(19.99, 3) === 59.97, never 59.969999999999999).
 */
export function mulMoney(
  amount: number | null | undefined,
  quantity: number,
): number {
  if (!Number.isFinite(quantity)) {
    throw new Error(`Invalid quantity for money multiply: ${quantity}`);
  }
  if (Number.isInteger(quantity)) {
    return fromCents(toCents(roundMoney(amount)) * quantity);
  }
  return roundMoney(roundMoney(amount) * quantity);
}

/** Sum a list of money amounts exactly via cents. */
export function sumMoney(amounts: Iterable<number | null | undefined>): number {
  let cents = 0;
  for (const amount of amounts) {
    cents += toCents(roundMoney(amount));
  }
  return fromCents(cents);
}

export function lineTotal(
  price: number | null | undefined,
  quantity: number,
): number {
  return mulMoney(price, quantity);
}

/**
 * True when the value is a valid money amount: finite, within range, and
 * exactly representable at 2 decimal places (after float-noise tolerance).
 */
export function isMoneyAmount(value: unknown): boolean {
  if (typeof value !== "number" || !Number.isFinite(value)) return false;
  try {
    const cents = toCents(value);
    // Reject inputs that are not (close to) 2-dp, e.g. 19.999.
    return Math.abs(value * 100 - cents) < 1e-6;
  } catch {
    return false;
  }
}
