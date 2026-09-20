import assert from 'node:assert/strict';
import applyMaskTemplate from '../../lib/utils/applyMaskTemplate.js';

test('a custom mask fills # slots with digits only', () => {
  const mask = '(##) #####-####';
  assert.equal(applyMaskTemplate('11912345678', mask), '(11) 91234-5678');
  assert.equal(applyMaskTemplate('119', mask), '(11) 9');
  assert.equal(applyMaskTemplate('(11) 9a', mask), '(11) 9');
  assert.equal(applyMaskTemplate('', mask), '');
  // Digits past the mask have no slot and are dropped.
  assert.equal(applyMaskTemplate('123456789012345', mask), '(12) 34567-8901');
});

test('no custom mask leaves the value untouched', () => {
  assert.equal(applyMaskTemplate('11 91234', undefined), '11 91234');
  assert.equal(applyMaskTemplate('11 91234', ''), '11 91234');
});
