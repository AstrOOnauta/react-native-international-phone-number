import assert from 'node:assert/strict';
import {
  isSupportedCountry,
} from 'libphonenumber-js/max';
import getPhoneNumberParts from '../../lib/utils/getPhoneNumberParts.js';
import getCallingCode, {
  COUNTRIES_WITHOUT_NUMBERING_PLAN,
} from '../../lib/utils/getCallingCode.js';

import { country } from '../helpers.js';

test('calling code comes from libphonenumber, not a truncated idd.root', () => {
  // The country data splits these into a root plus suffixes, leaving an unusable root.
  assert.equal(getCallingCode({ cca2: 'SH', idd: { root: '+2' } }), '+290');
  assert.equal(getCallingCode({ cca2: 'EH', idd: { root: '+2' } }), '+212');
  assert.equal(getCallingCode({ cca2: 'VA', idd: { root: '+3' } }), '+39');
});

test('calling code falls back to idd.root where there is no numbering plan', () => {
  for (const cca2 of COUNTRIES_WITHOUT_NUMBERING_PLAN) {
    assert.equal(getCallingCode({ cca2, idd: { root: '+672' } }), '+672', cca2);
  }
  assert.equal(getCallingCode(undefined), '');
  assert.equal(getCallingCode({ cca2: 'ZZ' }), '');
});

test('the hidden-country list still matches libphonenumber', () => {
  // Those countries are hidden from the modal precisely because they have no plan.
  // If libphonenumber ever adds one, the country should stop being hidden.
  for (const cca2 of COUNTRIES_WITHOUT_NUMBERING_PLAN) {
    assert.equal(isSupportedCountry(cca2), false, `${cca2} now has a numbering plan`);
  }
});

test('a truncated idd.root no longer corrupts the derived values', () => {
  const saintHelena = { cca2: 'SH', idd: { root: '+2' } };
  assert.equal(
    getPhoneNumberParts('51234', saintHelena).international,
    '+29051234'
  );
});
