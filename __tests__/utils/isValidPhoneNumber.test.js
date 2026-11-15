import assert from 'node:assert/strict';
import {
  getCountries,
  getExampleNumber,
} from 'libphonenumber-js/max';
import examples from 'libphonenumber-js/examples.mobile.json';
import getPhoneNumberParts from '../../lib/utils/getPhoneNumberParts.js';
import isValidPhoneNumber from '../../lib/utils/isValidPhoneNumber.js';

import { country, exampleOf } from '../helpers.js';

test('rejects a number belonging to another country on the same calling code', () => {
  // Same calling code, different numbering plan: +7 (RU/KZ) and +1 (US/CA/BS).
  assert.equal(isValidPhoneNumber(exampleOf('KZ'), country('RU')), false, 'KZ as RU');
  assert.equal(isValidPhoneNumber(exampleOf('BS'), country('US')), false, 'BS as US');
  assert.equal(isValidPhoneNumber(exampleOf('CA'), country('US')), false, 'CA as US');
  assert.equal(isValidPhoneNumber(exampleOf('US'), country('CA')), false, 'US as CA');
});

test('accepts those same numbers under their own country', () => {
  for (const cca2 of ['KZ', 'RU', 'BS', 'CA', 'US']) {
    assert.equal(isValidPhoneNumber(exampleOf(cca2), country(cca2)), true, cca2);
  }
});

test('accepts territories that share the parent numbering plan', () => {
  // No plan of their own — isValidNumberForRegion alone would reject all of these.
  for (const cca2 of ['AX', 'BL', 'CC', 'CX', 'EH', 'IM', 'MF', 'SJ', 'VA']) {
    const example = getExampleNumber(cca2, examples);
    assert.equal(
      isValidPhoneNumber(example.nationalNumber, country(cca2)),
      true,
      `${cca2} should accept its own example number`
    );
  }
});

test('accepts formatted input, trunk prefixes and full E.164 strings', () => {
  assert.equal(isValidPhoneNumber('11 91234 5678', country('BR')), true);
  assert.equal(isValidPhoneNumber('07400 123456', country('GB')), true);
  assert.equal(isValidPhoneNumber('+12025550123', country('US')), true);
});

test('returns a boolean, never undefined', () => {
  for (const input of ['', '11 9', 'abc', '999999999999999']) {
    assert.equal(typeof isValidPhoneNumber(input, country('BR')), 'boolean', input);
  }
  assert.equal(isValidPhoneNumber('11912345678', undefined), false);
  assert.equal(isValidPhoneNumber('11912345678', { cca2: 'ZZ' }), false);
});

test('example mobile number is valid and round-trips to E.164 for every country', () => {
  const invalid = [];
  const wrongE164 = [];

  for (const cca2 of getCountries()) {
    const example = getExampleNumber(cca2, examples);
    if (!example) continue;

    if (!isValidPhoneNumber(example.nationalNumber, country(cca2))) {
      invalid.push(cca2);
    }

    const { international } = getPhoneNumberParts(example.nationalNumber, country(cca2));
    if (international !== example.number) {
      wrongE164.push(`${cca2}: ${international} != ${example.number}`);
    }
  }

  assert.deepEqual(invalid, [], 'countries rejecting their own example number');
  assert.deepEqual(wrongE164, [], 'countries producing a wrong E.164');
});
