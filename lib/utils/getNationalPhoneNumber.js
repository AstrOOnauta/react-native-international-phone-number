import parsePhoneNumber, {
  formatIncompletePhoneNumber,
} from 'libphonenumber-js';

export default function getNationalPhoneNumber(
  internationalPhoneNumber = ''
) {
  if (!internationalPhoneNumber) {
    return '';
  }

  const parsed = parsePhoneNumber(internationalPhoneNumber);
  const countryCallingCode = parsed?.countryCallingCode;
  const nationalDigits = parsed?.nationalNumber;

  if (countryCallingCode && nationalDigits) {
    const normalizedCallingCode = `+${countryCallingCode}`;
    const formatted = formatIncompletePhoneNumber(
      `${normalizedCallingCode}${nationalDigits}`
    );

    if (formatted.startsWith(normalizedCallingCode)) {
      return formatted.substring(normalizedCallingCode.length).trim();
    }
  }

  return (
    parsePhoneNumber(internationalPhoneNumber)?.formatNational() ||
    internationalPhoneNumber
  );
}
