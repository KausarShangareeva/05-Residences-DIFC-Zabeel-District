import {
  AsYouType,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  getExampleNumber,
  validatePhoneNumberLength,
} from "libphonenumber-js/max";
import examples from "libphonenumber-js/examples.mobile.json" with { type: "json" };

const getDigits = (value) => String(value || "").replace(/\D/g, "");

const lengthCache = new Map();

const getLengthBounds = (countryCode) => {
  if (lengthCache.has(countryCode)) {
    return lengthCache.get(countryCode);
  }

  // Get example number to find valid mobile prefix for this country
  // The /mobile bundle only validates mobile numbers, so we need a valid mobile prefix
  const example = getExampleNumber(countryCode, examples);
  let prefix = "";
  if (example?.nationalNumber) {
    // Use first 2 digits as prefix (e.g., "50" for UAE mobiles)
    prefix = example.nationalNumber.slice(0, 2);
  }

  const possible = [];
  for (let length = 1; length <= 15; length += 1) {
    // Build sample with valid mobile prefix + padding zeros
    const paddingLength = Math.max(0, length - prefix.length);
    const sample = (prefix + "0".repeat(paddingLength)).slice(0, length);
    const result = validatePhoneNumberLength(sample, countryCode);
    if (result === undefined) {
      possible.push(length);
    }
  }

  const bounds =
    possible.length > 0
      ? { min: Math.min(...possible), max: Math.max(...possible) }
      : { min: 4, max: 15 };
  lengthCache.set(countryCode, bounds);
  return bounds;
};

export const getPhoneExample = (countryCode) => {
  const example = getExampleNumber(countryCode, examples);
  if (example) {
    return example.formatInternational();
  }
  const callingCode = getCountryCallingCode(countryCode);
  return `+${callingCode}`;
};

export const formatPhoneInput = (raw, countryCode) => {
  let value = String(raw || "").replace(/[^\d+]/g, "");

  if (value.startsWith("00")) {
    value = `+${value.slice(2)}`;
  }

  if (value.includes("+")) {
    value = value
      .split("")
      .filter((char, index) => char !== "+" || index === 0)
      .join("");
  }

  const { max } = getLengthBounds(countryCode);
  const callingCode = getCountryCallingCode(countryCode);
  const digits = getDigits(value);

  if (value.startsWith("+")) {
    let nationalDigits = digits;
    if (digits.startsWith(callingCode)) {
      nationalDigits = digits.slice(callingCode.length);
    }
    if (nationalDigits.length > max) {
      nationalDigits = nationalDigits.slice(0, max);
      value = `+${callingCode}${nationalDigits}`;
    }
    return new AsYouType().input(value);
  }

  let trimmed = digits;
  if (trimmed.length > max) {
    trimmed = trimmed.slice(0, max);
  }
  return new AsYouType(countryCode).input(trimmed);
};

export const reformatPhoneForCountry = (raw, countryCode) => {
  const input = String(raw || "").trim();
  if (!input) {
    return `+${getCountryCallingCode(countryCode)} `;
  }
  const normalized = input.replace(/\s+/g, "");
  const digits = getDigits(normalized);
  let nationalDigits = digits;

  if (normalized.startsWith("+") || normalized.startsWith("00")) {
    const intl = normalized.startsWith("00")
      ? `+${normalized.slice(2)}`
      : normalized;
    const parsed = parsePhoneNumberFromString(intl);
    if (parsed?.nationalNumber) {
      nationalDigits = parsed.nationalNumber;
    }
  } else if (digits.startsWith("0")) {
    nationalDigits = digits.slice(1);
  }

  const withDial = `+${getCountryCallingCode(countryCode)}${
    nationalDigits ? ` ${nationalDigits}` : ""
  }`;
  return formatPhoneInput(withDial, countryCode);
};

export const validatePhoneNumber = (raw, countryCode) => {
  const input = String(raw || "").trim();
  const normalized = input.replace(/\s+/g, "");
  const digits = getDigits(normalized);
  if (!digits) {
    const { min, max } = getLengthBounds(countryCode);
    return { status: "required", min, max, nationalLength: 0 };
  }

  const hasExplicitCode =
    normalized.startsWith("+") || normalized.startsWith("00");
  const callingCode = getCountryCallingCode(countryCode);
  const { min, max } = getLengthBounds(countryCode);

  let nationalLength = digits.length;
  if (hasExplicitCode && digits.startsWith(callingCode)) {
    nationalLength = digits.slice(callingCode.length).length;
  }

  if (nationalLength < min) {
    return {
      status: "tooShort",
      missing: min - nationalLength,
      min,
      max,
      nationalLength,
    };
  }

  if (nationalLength > max) {
    return {
      status: "tooLong",
      excess: nationalLength - max,
      min,
      max,
      nationalLength,
    };
  }

  const phoneNumber = parsePhoneNumberFromString(
    normalized.startsWith("00") ? `+${normalized.slice(2)}` : normalized,
    countryCode,
  );

  if (phoneNumber?.country && phoneNumber.country !== countryCode) {
    return { status: "mismatch", min, max, nationalLength };
  }

  if (!phoneNumber || !phoneNumber.isValid()) {
    return { status: "mismatch", min, max, nationalLength };
  }

  return { status: "ok", phoneNumber, min, max, nationalLength };
};

export const buildPhonePayload = (raw, countryCode) => {
  const validation = validatePhoneNumber(raw, countryCode);
  if (validation.status === "ok") {
    return validation.phoneNumber.number;
  }
  return "";
};

export const getPhoneMeta = (countryCode) => {
  const { min, max } = getLengthBounds(countryCode);
  return {
    dial: `+${getCountryCallingCode(countryCode)}`,
    example: getPhoneExample(countryCode),
    minDigits: min,
    maxDigits: max,
  };
};

export const detectCountryFromPhone = (raw, countriesList) => {
  const input = String(raw || "")
    .trim()
    .replace(/\s/g, "");
  if (!input.startsWith("+") && !input.startsWith("00")) {
    return null;
  }
  const normalized = input.startsWith("00") ? `+${input.slice(2)}` : input;

  // Sort countries by dial code length (longest first) to match +1 for US/CA correctly
  const sortedCountries = [...countriesList].sort(
    (a, b) => b.dial.length - a.dial.length,
  );

  for (const country of sortedCountries) {
    if (normalized.startsWith(country.dial)) {
      return country.code;
    }
  }
  return null;
};
