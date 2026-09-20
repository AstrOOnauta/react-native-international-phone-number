import assert from 'node:assert/strict';
import getNationalPhoneNumber from '../../lib/utils/getNationalPhoneNumber.js';

import { typed } from '../helpers.js';

test('national number is the formatted part after the calling code', () => {
  assert.equal(getNationalPhoneNumber('+5511912345678'), '11 91234 5678');
  assert.equal(getNationalPhoneNumber('+12025550123'), '202 555 0123');
  assert.equal(getNationalPhoneNumber('+447400123456'), '7400 123456');
  // Significant leading zero in Italy.
  assert.equal(getNationalPhoneNumber('+390212345678'), '02 1234 5678');
  // Still being typed.
  assert.equal(getNationalPhoneNumber('+55119'), '11 9');
});

test('national number of empty input is empty, never undefined', () => {
  assert.equal(getNationalPhoneNumber(''), '');
  assert.equal(getNationalPhoneNumber(undefined), '');
  assert.equal(getNationalPhoneNumber('abc'), 'abc');
});
