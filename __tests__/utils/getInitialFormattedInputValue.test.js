import assert from 'node:assert/strict';
import getE164Seed from '../../lib/utils/getE164Seed.js';
import getInitialFormattedInputValue from '../../lib/utils/getInitialFormattedInputValue.js';

test('an E.164 initial value shows its national part, masked when there is a mask', () => {
  const seed = getE164Seed('+5511912345678');
  assert.equal(getInitialFormattedInputValue('+5511912345678', seed), '11 91234 5678');
  assert.equal(
    getInitialFormattedInputValue('+5511912345678', seed, '(##) #####-####'),
    '(11) 91234-5678'
  );
});

test('a national initial value is kept as given, masked when there is a mask', () => {
  assert.equal(getInitialFormattedInputValue('11912345678', null), '11912345678');
  assert.equal(
    getInitialFormattedInputValue('11912345678', null, '(##) #####-####'),
    '(11) 91234-5678'
  );
  assert.equal(getInitialFormattedInputValue('', getE164Seed('+5511912345678')), '');
  assert.equal(getInitialFormattedInputValue(undefined, null), '');
});
