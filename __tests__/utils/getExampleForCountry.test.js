import assert from 'node:assert/strict';
import {
  getCountries,
} from 'libphonenumber-js/max';
import getPhoneNumberParts from '../../lib/utils/getPhoneNumberParts.js';
import getExampleForCountry from '../../lib/utils/getExampleForCountry.js';
import getCallingCode, {
  COUNTRIES_WITHOUT_NUMBERING_PLAN,
} from '../../lib/utils/getCallingCode.js';

import { country, typed } from '../helpers.js';

test('the placeholder is shaped like what typing it produces', () => {
  const mismatches = [];

  for (const cca2 of getCountries()) {
    const placeholder = getExampleForCountry(cca2);
    if (!placeholder) continue;

    // Typing the placeholder back in has to round-trip to the same string, otherwise
    // the hint shows a format the input will never produce.
    const typed = getPhoneNumberParts(placeholder, country(cca2));
    const callingCode = getCallingCode(country(cca2));
    const asTyped = typed.internationalFormatted
      .substring(callingCode.length)
      .trim();

    if (asTyped !== placeholder) {
      mismatches.push(`${cca2}: placeholder ${placeholder} -> typed ${asTyped}`);
    }
  }

  assert.deepEqual(mismatches, [], 'placeholder does not match the input format');
});

test('the placeholder does not suggest a national trunk prefix', () => {
  // Typing the leading 0 the old placeholder showed is what produced a broken E.164.
  for (const cca2 of ['GB', 'FR', 'DE', 'NG']) {
    assert.ok(
      !getExampleForCountry(cca2).startsWith('0'),
      `${cca2} placeholder still starts with a trunk prefix`
    );
  }
});
