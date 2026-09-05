import parsePhoneNumber, {
  formatIncompletePhoneNumber,
} from 'libphonenumber-js/max';

import getCallingCode from './getCallingCode.js';

// Single source for the values derived from what the user typed.
//
// Do not replace the parse with `callingCode + digits`: that keeps the national trunk
// prefix users are expected to type, turning GB "07400 123456" into "+4407400123456".
// Stripping the leading zero by hand is wrong too — in Italy it is part of the number.
export default function getPhoneNumberParts(phoneNumber, country) {
  const digits = (phoneNumber || '').replace(/\D/g, '');
  const callingCode = getCallingCode(country);
  const concatenated = `${callingCode}${digits}`;

  // Too short to parse while still being typed.
  if (!digits || !callingCode) {
    return {
      national: digits,
      international: concatenated,
      internationalFormatted: concatenated,
    };
  }

  const parsed = parsePhoneNumber(concatenated);
  const international = parsed?.number || concatenated;

  return {
    national: parsed?.nationalNumber || digits,
    international,
    // Formatted off the corrected E.164, not the raw input, so it cannot show a trunk
    // prefix that `international` has already dropped.
    internationalFormatted: formatIncompletePhoneNumber(international),
  };
}
