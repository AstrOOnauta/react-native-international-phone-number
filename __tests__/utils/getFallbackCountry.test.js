import assert from 'node:assert/strict';
import { getFallbackCountry } from '../../lib/utils/getSelectableCountry.js';

// jest.setup.js pins the locale to pt-BR; each case here swaps in its own.
function fallbackFor(locale, restrictions) {
  const spy = jest
    .spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions')
    .mockReturnValue({ locale });
  try {
    return getFallbackCountry(restrictions)?.cca2;
  } finally {
    spy.mockRestore();
  }
}

test("starts on the device locale's country", () => {
  assert.equal(fallbackFor('pt-PT'), 'PT');
  assert.equal(fallbackFor('en-US-u-ca-gregory'), 'US');
  assert.equal(fallbackFor('zh-Hans-CN'), 'CN');
});

test('falls back to Brazil when the device country is unknown or not selectable', () => {
  assert.equal(fallbackFor('en'), 'BR', 'no region');
  assert.equal(fallbackFor('es-419'), 'BR', 'numeric region');
  assert.equal(fallbackFor('pt-PT', { hiddenCountries: ['PT'] }), 'BR');
  assert.equal(fallbackFor('pt-PT', { visibleCountries: ['BR', 'US'] }), 'BR');
});

test('then on the first selectable country', () => {
  assert.equal(fallbackFor('pt-PT', { visibleCountries: ['US', 'GB'] }), 'US');
  // rn-country-select's list is in ISO alpha-3 order, so Aruba (ABW) comes first.
  assert.equal(fallbackFor('pt-PT', { hiddenCountries: ['PT', 'BR'] }), 'AW');
});

test('falls back to Brazil without Intl', () => {
  const spy = jest.spyOn(Intl, 'DateTimeFormat').mockImplementation(() => {
    throw new TypeError('Intl is not available');
  });
  try {
    assert.equal(getFallbackCountry()?.cca2, 'BR');
  } finally {
    spy.mockRestore();
  }
});
