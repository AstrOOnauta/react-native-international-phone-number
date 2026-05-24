import parsePhoneNumber, {
  formatIncompletePhoneNumber,
  Metadata,
} from 'libphonenumber-js';

// Returns the formatted national string (without the calling-code prefix),
// or `null` when the input exceeds the country's max possible length
// (caller should reject the change). Falls back to the raw sanitized input
// on parse errors.
export default function formatPhoneNumberValue(phoneNumber, callingCode, country) {
  const sanitized = typeof phoneNumber === 'string' ? phoneNumber : '';
  try {
    const metadata = new Metadata();
    metadata.selectNumberingPlan(country?.cca2);
    const possibleLengths = country ? metadata.possibleLengths() : [];
    const validCallingCode = callingCode ? callingCode : country?.idd?.root;
    const normalizedCallingCode =
      typeof validCallingCode === 'string' ? validCallingCode : '';

    const res = formatIncompletePhoneNumber(
      `${normalizedCallingCode}${sanitized}`
    );

    let formatted = res;
    if (res.startsWith('0')) {
      formatted = parsePhoneNumber(res)?.formatNational();
    } else if (
      normalizedCallingCode &&
      res &&
      res.startsWith(normalizedCallingCode)
    ) {
      formatted = res.substring(normalizedCallingCode.length).trim();
    }

    const baseMax = possibleLengths.slice(-1)[0];
    const maxLen = Number.isFinite(baseMax)
      ? (formatted.startsWith('0') ? baseMax + 1 : baseMax)
      : Infinity;

    if (formatted?.replace(/\D/g, '')?.length > maxLen) {
      return null;
    }
    return formatted;
  } catch {
    return sanitized;
  }
}
