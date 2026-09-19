import parsePhoneNumber, {
  formatIncompletePhoneNumber,
  isValidPhoneNumber,
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

    // National readings are checked as "+<calling code><digits>": given bare national
    // input, libphonenumber silently guesses that leading digits are a calling code, so
    // "559946897067" under BR would pass as "+55 99 4689 7067". A typed trunk prefix
    // (GB "07…", US "1…") still counts.
    const callingCodeDigits = normalizedCallingCode.replace('+', '');
    const digits = sanitized.replace(/\D/g, '');
    const startsWithCallingCode =
      !isInternational &&
      callingCodeDigits.length > 0 &&
      digits.startsWith(callingCodeDigits);

    // A digit typed after an already complete number is overflow, never a calling code.
    // The slice stands in for the previous value, which only holds for typing: typed input
    // carries the previous value's formatting, while autofill/paste arrive as raw digits
    // and replace the whole value.
    const wasComplete =
      startsWithCallingCode &&
      /\D/.test(sanitized) &&
      isValidPhoneNumber(`+${callingCodeDigits}${digits.slice(0, -1)}`);

    // Autofill (e.g. Chrome) can drop the '+' and send "5511999998888". National numbers
    // can start with the calling code's digits too (BR DDD 55, KZ "701…"), so strip only
    // when the digits read as calling code + a valid number and the national reading
    // isn't a different valid number — US "1 202 555 0123" is the same number written
    // with its trunk prefix.
    const withCallingCode =
      startsWithCallingCode && !wasComplete
        ? parsePhoneNumber(`+${digits}`)
        : undefined;
    const nationalReading = withCallingCode?.isValid()
      ? parsePhoneNumber(`+${callingCodeDigits}${digits}`)
      : undefined;
    const input =
      withCallingCode?.isValid() &&
      (!nationalReading?.isValid() ||
        nationalReading.nationalNumber === withCallingCode.nationalNumber)
        ? withCallingCode.nationalNumber
        : sanitized;

    const res = formatIncompletePhoneNumber(
      isInternational ? input : `${normalizedCallingCode}${input}`
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
    // count cannot do. Measured as "+<calling code><digits>" for the reason above.
    const lengthInput =
      isInternational || !callingCodeDigits
        ? formatted
        : `+${callingCodeDigits}${formatted.replace(/\D/g, '')}`;
    if (
      country?.cca2 &&
      validatePhoneNumberLength(lengthInput, country.cca2) === 'TOO_LONG'
    ) {
      // A calling code typed by hand ("55 11 99999 888…") overflows the national plan
      // before it completes; keep it while calling code + number can still fit.
      const callingCodeStillFits =
        startsWithCallingCode &&
        !wasComplete &&
        validatePhoneNumberLength(`+${digits}`) !== 'TOO_LONG';
      if (!callingCodeStillFits) {
        return null;
      }
    }
    return formatted;
  } catch {
    return sanitized;
  }
}
