import assert from 'node:assert/strict';
import {
  getCountries,
  getExampleNumber,
} from 'libphonenumber-js/max';
import examples from 'libphonenumber-js/examples.mobile.json';
import formatPhoneNumberValue from '../../lib/utils/formatPhoneNumberValue.js';

import { country, digitsOf, typeInto, typed } from '../helpers.js';

test('the formatted value is always a string or null', () => {
  // It is assigned to the controlled TextInput's `value`; anything else (undefined in
  // particular) silently turns the input into an uncontrolled one.
  const countries = [undefined, null, {}, { cca2: 'ZZ' }, country('BR'), country('US')];
  const inputs = ['', '0', '0123', 'abc', '+55 11 9', '11912345678', '999999999999999'];

  for (const c of countries) {
    for (const input of inputs) {
      const result = formatPhoneNumberValue(input, null, c);
      assert.ok(
        typeof result === 'string' || result === null,
        `formatPhoneNumberValue(${JSON.stringify(input)}, null, ${c?.cca2 ?? c}) returned ${typeof result}`
      );
    }
  }
});

test('typing a national number shows it formatted, keystroke by keystroke', () => {
  assert.deepEqual(typeInto('BR', '11912345678'), [
    '1', '11', '11 9', '11 91', '11 912', '11 9123', '11 91234',
    '11 91234 5', '11 91234 56', '11 91234 567', '11 91234 5678',
  ]);
  assert.equal(typed('US', '2025550123'), '202 555 0123');
  assert.equal(typed('GB', '07911123456'), '07911 123456');
});

test('national numbers starting with the calling code digits are never altered', () => {
  // A bare prefix match on the calling code (PR #180) cleared the field at "55" and
  // shifted every later digit. These are real national numbers under each plan.
  const cases = [
    ['BR', '55994689706'], // DDD 55 mobile
    ['BR', '5533334444'], // DDD 55 landline
    ['KZ', '7012345678'],
    ['IT', '3931234567'],
    ['IN', '9123456789'],
    ['MX', '5512345678'],
  ];

  for (const [cca2, number] of cases) {
    typeInto(cca2, number).forEach((step, i) => {
      assert.equal(digitsOf(step), number.slice(0, i + 1), `${cca2} ${number}, keystroke ${i + 1}: ${step}`);
    });
  }
});

test('typing never drops or re-reads a digit, in any country', () => {
  const losses = [];

  for (const cca2 of getCountries()) {
    const example = getExampleNumber(cca2, examples);
    if (!example) continue;

    const number = example.nationalNumber;
    typeInto(cca2, number).forEach((step, i) => {
      if (digitsOf(step) !== number.slice(0, i + 1)) {
        losses.push(`${cca2} ${number.slice(0, i + 1)} -> ${JSON.stringify(step)}`);
      }
    });
  }

  assert.deepEqual(losses.slice(0, 10), [], 'a keystroke changed digits already typed');
});

test('a digit typed after a complete number is rejected', () => {
  // Read as calling code + number, "559946897067" is a valid "+55 99 4689 7067", and
  // libphonenumber happily measures it that way. It must stay overflow.
  assert.equal(typed('BR', '7', '55 99468 9706'), '55 99468 9706');
  assert.equal(typed('BR', '1', '11 91234 5678'), '11 91234 5678');
  assert.equal(typed('US', '4', '202 555 0123'), '202 555 0123');
  assert.equal(typed('GB', '7', '07911 123456'), '07911 123456');
});

test('an extra digit is never re-read as a different number, in any country', () => {
  // Some plans accept a longer number, so the digit may be kept — but only appended.
  const reread = [];

  for (const cca2 of getCountries()) {
    const example = getExampleNumber(cca2, examples);
    if (!example) continue;

    const full = formatPhoneNumberValue(example.nationalNumber, null, country(cca2));
    for (const extra of ['1', '5', '9']) {
      const result = formatPhoneNumberValue(full + extra, null, country(cca2));
      if (result !== null && digitsOf(result) !== example.nationalNumber + extra) {
        reread.push(`${cca2} ${JSON.stringify(full + extra)} -> ${JSON.stringify(result)}`);
      }
    }
  }

  assert.deepEqual(reread.slice(0, 10), [], 'an extra digit changed the number');
});

test('a calling code typed by hand drops off once the number completes', () => {
  // US "1" doubles as the trunk prefix: "1 202 555 0123" is valid as typed.
  const cases = [
    ['BR', '5511912345678', '11 91234 5678'],
    ['US', '12025550123', '202 555 0123'],
    ['CA', '14165550123', '416 555 0123'],
    ['GB', '447911123456', '7911 123456'],
    ['RU', '79161234567', '916 123 45 67'],
    ['IT', '393931234567', '393 123 4567'],
    ['MX', '525512345678', '55 1234 5678'],
  ];

  for (const [cca2, keys, expected] of cases) {
    const steps = typeInto(cca2, keys);
    assert.equal(steps.at(-1), expected, `${cca2} ${keys}`);
    // Kept while still incomplete, never blanked on the way.
    steps.slice(0, -1).forEach((step, i) => {
      assert.equal(digitsOf(step), keys.slice(0, i + 1), `${cca2} ${keys}, keystroke ${i + 1}: ${step}`);
    });
  }
});

test('autofill without the leading + lands as the national number', () => {
  // Browsers (Chrome) can autofill the E.164 without its '+', in a single change.
  const cases = [
    ['BR', '5511912345678', '11 91234 5678'],
    ['BR', '559946897067', '99 4689 7067'], // landline, DDD 99
    ['US', '12025550123', '202 555 0123'],
    ['GB', '447911123456', '7911 123456'],
    ['KZ', '77012345678', '701 234 5678'],
  ];

  for (const [cca2, input, expected] of cases) {
    assert.equal(formatPhoneNumberValue(input, null, country(cca2)), expected, `${cca2} ${input}`);
  }
});

test('autofill of a national number is left as is', () => {
  assert.equal(formatPhoneNumberValue('55994689706', null, country('BR')), '55 99468 9706');
  assert.equal(formatPhoneNumberValue('2025550123', null, country('US')), '202 555 0123');
});

test('autofill without the + never blanks or corrupts the number, in any country', () => {
  const broken = [];

  for (const cca2 of getCountries()) {
    const example = getExampleNumber(cca2, examples);
    if (!example) continue;

    const input = example.number.slice(1);
    const result = formatPhoneNumberValue(input, null, country(cca2));
    // Either stripped to the national number or, where both readings are valid
    // (DE "491…", ID "628…"), kept as typed. Nothing in between.
    if (digitsOf(result) !== example.nationalNumber && digitsOf(result) !== input) {
      broken.push(`${cca2} ${input} -> ${JSON.stringify(result)}`);
    }
  }

  assert.deepEqual(broken.slice(0, 10), [], 'autofilled digits were lost or re-read');
});

test('a calling code is kept where the national reading is also valid', () => {
  // Stripping would swap one valid number for another.
  assert.equal(digitsOf(formatPhoneNumberValue('4915123456789', null, country('DE'))), '4915123456789');
});

test('deleting never re-reads the number', () => {
  const cases = [
    ['BR', '55 99468 9706'],
    ['BR', '11 91234 5678'],
    ['US', '202 555 0123'],
    ['GB', '07911 123456'],
    ['KZ', '701 234 5678'],
  ];

  for (const [cca2, start] of cases) {
    let value = start;
    while (value.length > 0) {
      const text = value.slice(0, -1);
      const result = formatPhoneNumberValue(text, null, country(cca2));
      value = result === null ? text : result;
      assert.equal(digitsOf(value), digitsOf(text), `${cca2} deleting to ${JSON.stringify(text)}`);
    }
  }
});
