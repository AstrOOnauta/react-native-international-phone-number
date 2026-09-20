import assert from 'node:assert/strict';
import getPhoneNumberType from '../../lib/utils/getPhoneNumberType.js';

test('phone number type comes from the numbering plan', () => {
  assert.equal(getPhoneNumberType('+5511912345678'), 'MOBILE');
  assert.equal(getPhoneNumberType('+551133334444'), 'FIXED_LINE');
  assert.equal(getPhoneNumberType('+18005550123'), 'TOLL_FREE');
  // The US plan does not tell the two apart.
  assert.equal(getPhoneNumberType('+12025550123'), 'FIXED_LINE_OR_MOBILE');
});

test('phone number type is null when unknown, never undefined', () => {
  for (const input of ['+55119', '', 'abc', null, undefined, 123]) {
    assert.equal(getPhoneNumberType(input), null, JSON.stringify(input));
  }
});
