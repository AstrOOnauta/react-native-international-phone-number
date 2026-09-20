import assert from 'node:assert/strict';
import {
  getCountries,
  getExampleNumber,
} from 'libphonenumber-js/max';
import examples from 'libphonenumber-js/examples.mobile.json';
import formatPhoneNumberValue from '../../lib/utils/formatPhoneNumberValue.js';
import getE164Seed from '../../lib/utils/getE164Seed.js';
import tryParseInternational from '../../lib/utils/tryParseInternational.js';
import isValidPhoneNumber from '../../lib/utils/isValidPhoneNumber.js';

import { country, digitsOf } from '../helpers.js';

test('an overflowing international number resolves a country and is trimmed to fit', () => {
  // Digits past the end of the number would otherwise leave the calling code
  // unresolvable, so the value could not be recognized, formatted or edited.
  const seed = getE164Seed('+1250553456550199');

  assert.equal(seed?.cca2, 'CA');
  assert.equal(seed.nationalDigits, '2505534565');
  assert.equal(isValidPhoneNumber(seed.nationalFormatted, country('CA')), true);
});

test('a number that already resolves is never trimmed', () => {
  const shortened = [];

  for (const cca2 of getCountries()) {
    const example = getExampleNumber(cca2, examples);
    if (!example) continue;

    const seed = getE164Seed(example.number);
    if (seed && seed.nationalDigits !== example.nationalNumber) {
      shortened.push(`${cca2}: ${example.nationalNumber} -> ${seed.nationalDigits}`);
    }
  }

  assert.deepEqual(shortened.slice(0, 10), [], 'valid numbers were shortened');
});

test('an E.164 value never empties the field', () => {
  // `defaultPhoneNumber` hands a full international number to the same path that
  // formats typing. Prefixing the selected country's calling code onto it used to
  // produce "+55+1250…", which collapsed to "" and blanked the input with no warning.
  const brazil = country('BR');

  assert.notEqual(formatPhoneNumberValue('+12505534565', null, brazil), '');
  assert.notEqual(formatPhoneNumberValue('+5511912345678', null, brazil), '');
  assert.notEqual(formatPhoneNumberValue('+8001234567', null, brazil), '');
  // Too long for any plan: rejected outright so the previous value survives, never
  // silently blanked or truncated.
  assert.equal(formatPhoneNumberValue('+1250553456550199', null, brazil), null);
});

test('digits are never dropped on the way to the input', () => {
  const digitsOf = (value) => (value || '').replace(/\D/g, '');
  const losses = [];

  for (const cca2 of getCountries()) {
    const example = getExampleNumber(cca2, examples);
    if (!example) continue;

    const inputs = [
      example.nationalNumber,
      example.number,
      `0${example.nationalNumber}`,
      '+1250553456550199',
      '+8001234567',
    ];

    for (const input of inputs) {
      const result = formatPhoneNumberValue(input, null, country(cca2));
      if (result !== null && digitsOf(result).length === 0) {
        losses.push(`${cca2} ${JSON.stringify(input)} -> ${JSON.stringify(result)}`);
      }
    }
  }

  assert.deepEqual(losses, [], 'input with digits produced a value with none');
});

test('only input with a + is taken as international', () => {
  // Everything else is typing under the selected country; parsing it without a country
  // would guess one on every keystroke.
  for (const input of ['5511912345678', '55 11 91234-5678', '(11) 91234-5678', '', null, undefined]) {
    assert.equal(tryParseInternational(input), null, JSON.stringify(input));
    assert.equal(getE164Seed(input), null, JSON.stringify(input));
  }
  for (const input of ['+', '+999123']) {
    assert.equal(getE164Seed(input), null, input);
  }
});

test('a pasted international number seeds its own country and national value', () => {
  assert.deepEqual(getE164Seed('+55 11 91234-5678'), {
    cca2: 'BR',
    callingCode: '+55',
    nationalDigits: '11912345678',
    nationalFormatted: '11 91234 5678',
  });
  // The trunk prefix people type after the calling code is not part of the number.
  assert.equal(getE164Seed('+44 07400 123456')?.nationalDigits, '7400123456');
});

test('shared calling codes resolve to the country the number belongs to', () => {
  assert.equal(getE164Seed('+7 701 234 5678')?.cca2, 'KZ');
  assert.equal(getE164Seed('+7 916 123 45 67')?.cca2, 'RU');
  assert.equal(getE164Seed('+1 416 555 0123')?.cca2, 'CA');
  assert.equal(getE164Seed('+1 202 555 0123')?.cca2, 'US');
});
