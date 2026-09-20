import assert from 'node:assert/strict';
import normalizeLanguage from '../../lib/utils/normalizeLanguage.js';
import {
  getCountriesButtonAccessibilityHint,
  getCountriesButtonAccessibilityLabel,
  getPhoneNumberInputAccessibilityHint,
  getPhoneNumberInputAccessibilityLabel,
  getPhoneNumberInputPlaceholder,
} from '../../lib/utils/getTranslations.js';

const TRANSLATORS = [
  getPhoneNumberInputPlaceholder,
  getPhoneNumberInputAccessibilityLabel,
  getPhoneNumberInputAccessibilityHint,
  getCountriesButtonAccessibilityLabel,
  getCountriesButtonAccessibilityHint,
];

test('ISO 639-1 codes resolve to the same strings as ISO 639-2', () => {
  // The docs advertise both spellings; only the 3-letter one used to work.
  const pairs = [['pt', 'por'], ['en', 'eng'], ['ar', 'ara'], ['zh-Hans', 'zho-Hans']];

  for (const translate of TRANSLATORS) {
    for (const [iso1, iso2] of pairs) {
      assert.equal(normalizeLanguage(iso1), iso2);
      assert.equal(translate(iso1), translate(iso2), `${iso1} vs ${iso2}`);
      assert.equal(typeof translate(iso1), 'string');
    }
  }
});

test('an unknown or missing language falls back to English, never undefined', () => {
  for (const translate of TRANSLATORS) {
    for (const language of [undefined, null, '', 'xx', 'pt-BR']) {
      assert.equal(
        translate(language),
        translate('eng'),
        `${translate.name}(${JSON.stringify(language)})`
      );
    }
  }
});
