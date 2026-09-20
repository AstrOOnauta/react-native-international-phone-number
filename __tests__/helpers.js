import { getCountryCallingCode, getExampleNumber } from 'libphonenumber-js/max';
import examples from 'libphonenumber-js/examples.mobile.json';

import formatPhoneNumberValue from '../lib/utils/formatPhoneNumberValue.js';

// The utils only ever read `cca2` and `idd.root` off a country.
export const country = (cca2) => ({
  cca2,
  idd: { root: `+${getCountryCallingCode(cca2)}` },
});

export const digitsOf = (value) => (value || '').replace(/\D/g, '');

// Feeds the formatter its own output one keystroke at a time, the way the TextInput
// does. For input without a '+' this is exactly the hook's typing path; the paste path
// and the component are covered by usePhoneInput.test.js and PhoneInput.test.js.
export function typeInto(cca2, keys, start = '') {
  let value = start;
  const steps = [];

  for (const key of keys) {
    const result = formatPhoneNumberValue(value + key, null, country(cca2));
    if (result !== null) value = result;
    steps.push(value);
  }

  return steps;
}

export const typed = (cca2, keys, start) => typeInto(cca2, keys, start).at(-1);

// Real example numbers: an invented one can be rejected simply for not existing.
export const exampleOf = (cca2) => getExampleNumber(cca2, examples).nationalNumber;
