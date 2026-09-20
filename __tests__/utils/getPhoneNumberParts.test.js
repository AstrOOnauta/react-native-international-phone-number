import assert from 'node:assert/strict';
import getPhoneNumberParts from '../../lib/utils/getPhoneNumberParts.js';
import { getInternationalPhoneNumberLength } from '../../lib/utils/getPhoneNumberLength.js';

import { country, typed } from '../helpers.js';

test('strips the national trunk prefix users are told to type', () => {
  // The example-number placeholder shows "07400 123456" for GB, so users type the 0.
  assert.equal(
    getPhoneNumberParts('07400 123456', country('GB')).international,
    '+447400123456'
  );
  assert.equal(
    getPhoneNumberParts('06 12 34 56 78', country('FR')).international,
    '+33612345678'
  );
  assert.equal(
    getPhoneNumberParts('01512 3456789', country('DE')).international,
    '+4915123456789'
  );
});

test('keeps a leading zero where it is significant', () => {
  // Italy has no national prefix: the 0 is part of the number.
  assert.equal(
    getPhoneNumberParts('0212345678', country('IT')).international,
    '+390212345678'
  );
});

test('national number drops the trunk prefix too', () => {
  assert.equal(getPhoneNumberParts('07400 123456', country('GB')).national, '7400123456');
  assert.equal(getPhoneNumberParts('11 91234 5678', country('BR')).national, '11912345678');
});

test('falls back to concatenation while still being typed', () => {
  assert.equal(getPhoneNumberParts('11 9', country('BR')).international, '+55119');
  assert.equal(getPhoneNumberParts('11 9', country('BR')).national, '119');
});

test('handles empty input and a missing country', () => {
  assert.deepEqual(getPhoneNumberParts('', country('BR')), {
    national: '',
    international: '+55',
    internationalFormatted: '+55',
  });
  assert.deepEqual(getPhoneNumberParts('11912345678', undefined), {
    national: '11912345678',
    international: '11912345678',
    internationalFormatted: '11912345678',
  });
  assert.deepEqual(getPhoneNumberParts(undefined, undefined), {
    national: '',
    international: '',
    internationalFormatted: '',
  });
});

test('length agrees with the reported E.164', () => {
  const gb = country('GB');
  assert.equal(getInternationalPhoneNumberLength(gb, '07400 123456'), 12);
  assert.equal(
    getInternationalPhoneNumberLength(gb, '07400 123456'),
    getPhoneNumberParts('07400 123456', gb).international.replace(/\D/g, '').length
  );
});

test('formatted international never shows a dropped trunk prefix', () => {
  // Same formatter the input uses, applied to the corrected E.164.
  assert.equal(
    getPhoneNumberParts('07400 123456', country('GB')).internationalFormatted,
    '+44 7400 123456'
  );
  // Unchanged for input without a trunk prefix.
  assert.equal(
    getPhoneNumberParts('11 91234 5678', country('BR')).internationalFormatted,
    '+55 11 91234 5678'
  );
  assert.equal(
    getPhoneNumberParts('02 1234 5678', country('IT')).internationalFormatted,
    '+39 02 1234 5678'
  );
});
