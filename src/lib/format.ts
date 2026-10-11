/** "39 €" (sl) / "€39" (en); decimals only when the amount has cents. */
export function formatEur(locale: string, amount: number): string {
  const whole = Number.isInteger(amount);
  return new Intl.NumberFormat(locale === "sl" ? "sl-SI" : "en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
    useGrouping: "always",
  }).format(amount);
}

export function formatNumber(locale: string, n: number): string {
  // "always": Slovenian otherwise writes 1500 but 15.000.
  return new Intl.NumberFormat(locale === "sl" ? "sl-SI" : "en-IE", { useGrouping: "always" }).format(n);
}
