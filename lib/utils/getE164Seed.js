import { formatIncompletePhoneNumber } from 'libphonenumber-js';

import tryParseInternational from './tryParseInternational';

export default function getE164Seed(value) {
  const parsed = tryParseInternational(value);
  if (!parsed) return null;

  const fullFormatted = formatIncompletePhoneNumber(
    `${parsed.callingCode}${parsed.nationalNumber}`
  );
  const nationalFormatted =
    fullFormatted && fullFormatted.startsWith(parsed.callingCode)
      ? fullFormatted.substring(parsed.callingCode.length).trim()
      : parsed.nationalNumber;

  return {
    cca2: parsed.country,
    callingCode: parsed.callingCode,
    nationalDigits: parsed.nationalNumber,
    nationalFormatted,
  };
}
