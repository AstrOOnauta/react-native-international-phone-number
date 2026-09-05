import parsePhoneNumber from 'libphonenumber-js/max';

function toSeed(parsed) {
  return {
    country: parsed.country,
    nationalNumber: parsed.nationalNumber,
    callingCode: `+${parsed.countryCallingCode}`,
  };
}

// The calling code parsed but no country matched it, which means the national part fits
// no plan under that code — almost always digits past the end of the number. Drop them
// one at a time until a country resolves, so the value lands in the input as something
// the user can read and edit instead of an unusable blob. Numbers that already resolve
// never reach here, so a well-formed number is never shortened.
function trimOverflow(parsed) {
  const callingCode = `+${parsed.countryCallingCode}`;
  let nationalNumber = parsed.nationalNumber;

  while (nationalNumber.length > 1) {
    nationalNumber = nationalNumber.slice(0, -1);

    const trimmed = parsePhoneNumber(`${callingCode}${nationalNumber}`);
    if (trimmed?.country) {
      return toSeed(trimmed);
    }
  }

  return null;
}

export default function tryParseInternational(text) {
  if (typeof text !== 'string' || text.length === 0) return null;
  // Only attempt parse if input shows international/formatted hints.
  // Pure digit-only typing (no '+', no spaces, no parens, no dashes) is treated
  // as live typing and skipped — avoids spurious parses on every keystroke.
  if (!text.includes('+') && !/[\s()-]/.test(text)) return null;
  try {
    const parsed = parsePhoneNumber(text);
    if (!parsed) return null;

    return parsed.country ? toSeed(parsed) : trimOverflow(parsed);
  } catch {
    return null;
  }
}
