import parsePhoneNumber from 'libphonenumber-js';

export default function tryParseInternational(text) {
  if (typeof text !== 'string' || text.length === 0) return null;
  // Only attempt parse if input shows international/formatted hints.
  // Pure digit-only typing (no '+', no spaces, no parens, no dashes) is treated
  // as live typing and skipped — avoids spurious parses on every keystroke.
  if (!text.includes('+') && !/[\s()-]/.test(text)) return null;
  try {
    const parsed = parsePhoneNumber(text);
    if (!parsed?.country) return null;
    return {
      country: parsed.country,
      nationalNumber: parsed.nationalNumber,
      callingCode: `+${parsed.countryCallingCode}`,
    };
  } catch {
    return null;
  }
}
