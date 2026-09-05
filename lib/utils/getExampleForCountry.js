import { getExampleNumber } from 'libphonenumber-js/max';
import examples from 'libphonenumber-js/examples.mobile.json';

import getPhoneNumberParts from './getPhoneNumberParts.js';

// Built through the same pipeline as typed input, because the placeholder is a hint
// about what to type. `formatNational()` looks right but is a different format — it
// prints the trunk prefix ("07400 123456" for the UK) that the input drops, which taught
// users to type a leading zero the number should not carry.
export default function getExampleForCountry(cca2) {
  if (!cca2) return '';

  try {
    const example = getExampleNumber(cca2, examples);
    if (!example) return '';

    const { internationalFormatted } = getPhoneNumberParts(
      example.nationalNumber,
      { cca2 }
    );
    const callingCode = `+${example.countryCallingCode}`;

    return internationalFormatted.startsWith(callingCode)
      ? internationalFormatted.substring(callingCode.length).trim()
      : internationalFormatted;
  } catch {
    return '';
  }
}
