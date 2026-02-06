const AED_RATES = {
  AED: 1,
  USD: 0.272,
  EUR: 0.25,
};

const SQFT_TO_SQM = 0.092903;

export function formatPrice(amountAed, currency, locale) {
  const rate = AED_RATES[currency] ?? AED_RATES.AED;
  const value = amountAed * rate;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPriceRange(minAed, maxAed, currency, locale) {
  const rate = AED_RATES[currency] ?? AED_RATES.AED;
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 2,
  });
  const minValue = minAed * rate;
  const maxValue = maxAed * rate;
  return `${formatter.format(minValue)} – ${formatter.format(maxValue)}`;
}

export function formatPriceParts(amountAed, currency, locale) {
  const rate = AED_RATES[currency] ?? AED_RATES.AED;
  const value = amountAed * rate;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).formatToParts(value);
}

export function formatPriceRangeParts(minAed, maxAed, currency, locale) {
  const rate = AED_RATES[currency] ?? AED_RATES.AED;
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 2,
  });
  const minValue = minAed * rate;
  const maxValue = maxAed * rate;
  return {
    minParts: formatter.formatToParts(minValue),
    maxParts: formatter.formatToParts(maxValue),
  };
}

export function formatArea(areaSqft, unit, locale, labels) {
  const isSqm = unit === "m";
  const value = isSqm ? areaSqft * SQFT_TO_SQM : areaSqft;
  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
  const unitLabel = isSqm ? labels.sqm : labels.sqft;
  return `${formatted} ${unitLabel}`;
}
