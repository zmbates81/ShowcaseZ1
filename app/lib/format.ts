// Formatting helpers for an insurer's financials.
// All monetary values in the model are expressed in $ millions.

/** Plain millions with one decimal, e.g. 830 -> "830.0". */
export function millions(value: number, decimals = 1): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Money in $M, e.g. 830 -> "$830.0M". */
export function money(value: number, decimals = 1): string {
  return `$${millions(value, decimals)}M`;
}

/**
 * Accounting-style money: negatives are wrapped in parentheses, the way
 * they appear on a real financial statement. -150 -> "(150.0)", 830 -> "830.0".
 */
export function accounting(value: number, decimals = 1): string {
  const v = millions(Math.abs(value), decimals);
  return value < 0 ? `(${v})` : v;
}

/** Compact dollars for headline stats, e.g. 1000 -> "$1.0B", 830 -> "$830M". */
export function bigDollars(valueM: number): string {
  if (Math.abs(valueM) >= 1000) {
    return `$${(valueM / 1000).toLocaleString("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })}B`;
  }
  return `$${Math.round(valueM)}M`;
}

/** Percent with one decimal, e.g. 0.964 (ratio) is NOT used here; pass 96.4. */
export function pct(value: number, decimals = 1): string {
  return `${value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}%`;
}

/** Round to a fixed number of decimals as a number (avoids float noise). */
export function round(value: number, decimals = 1): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}
