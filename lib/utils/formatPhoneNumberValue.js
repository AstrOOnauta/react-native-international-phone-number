import parsePhoneNumber, {
  formatIncompletePhoneNumber,
  validatePhoneNumberLength,
} from 'libphonenumber-js/max';

import getCallingCode from './getCallingCode.js';

// Returns the formatted national string (without the calling-code prefix),
// or `null` when the input exceeds the country's max possible length
// (caller should reject the change). Falls back to the raw sanitized input
// on parse errors.
export default function formatPhoneNumberValue(phoneNumber, callingCode, country) {
  const sanitized = typeof phoneNumber === 'string' ? phoneNumber : '';
  try {
    const validCallingCode = callingCode ? callingCode : getCallingCode(country);
    const normalizedCallingCode =
      typeof validCallingCode === 'string' ? validCallingCode : '';

    // Input that already carries its own '+' is a full international number. Prefixing
    // the selected country's calling code on top of it builds "+55+1250…", which
    // libphonenumber gives up on — it returns just "+55", and stripping that back off
    // silently emptied the field.
    const isInternational = sanitized.trim().startsWith('+');

    const res = formatIncompletePhoneNumber(
      isInternational ? sanitized : `${normalizedCallingCode}${sanitized}`
    );

    let formatted = res;
    if (!isInternational) {
      if (res.startsWith('0')) {
        formatted = parsePhoneNumber(res)?.formatNational();
      } else if (
        normalizedCallingCode &&
        res &&
        res.startsWith(normalizedCallingCode)
      ) {
        formatted = res.substring(normalizedCallingCode.length).trim();
      }
    }

    // The caller feeds this straight into the TextInput's `value`, so anything other
    // than a string would turn the controlled input into an uncontrolled one.
    if (typeof formatted !== 'string') {
      return sanitized;
    }

    // libphonenumber strips the trunk prefix before measuring, which a manual digit
    // count cannot do.
    if (
      country?.cca2 &&
      validatePhoneNumberLength(formatted, country.cca2) === 'TOO_LONG'
    ) {
      return null;
    }
    return formatted;
  } catch {
    return sanitized;
  }
}
