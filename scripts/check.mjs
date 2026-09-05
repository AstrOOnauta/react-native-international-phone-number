// Self-check for the phone-number value derivation. No framework: Node parses the
// library's ESM `.js` sources directly (Node >= 20.19), so there is nothing to build.
//   npm test
import assert from 'node:assert/strict';
// The library standardized on the max metadata; the check must read the same one.
import {
  getCountries,
  getCountryCallingCode,
  getExampleNumber,
  isSupportedCountry,
} from 'libphonenumber-js/max';
// Resolves to a CJS wrapper (examples.mobile.json.js), not raw JSON.
import examples from 'libphonenumber-js/examples.mobile.json';

import getPhoneNumberParts from '../lib/utils/getPhoneNumberParts.js';
import getExampleForCountry from '../lib/utils/getExampleForCountry.js';
import formatPhoneNumberValue from '../lib/utils/formatPhoneNumberValue.js';
import getE164Seed from '../lib/utils/getE164Seed.js';
import getCallingCode, {
  COUNTRIES_WITHOUT_NUMBERING_PLAN,
} from '../lib/utils/getCallingCode.js';
import isValidPhoneNumber from '../lib/utils/isValidPhoneNumber.js';
import { getInternationalPhoneNumberLength } from '../lib/utils/getPhoneNumberLength.js';
import normalizeLanguage from '../lib/utils/normalizeLanguage.js';
import {
  getCountriesButtonAccessibilityHint,
  getCountriesButtonAccessibilityLabel,
  getPhoneNumberInputAccessibilityHint,
  getPhoneNumberInputAccessibilityLabel,
  getPhoneNumberInputPlaceholder,
} from '../lib/utils/getTranslations.js';

// The utils only ever read `cca2` and `idd.root` off a country.
const country = (cca2) => ({
  cca2,
  idd: { root: `+${getCountryCallingCode(cca2)}` },
});

let passed = 0;
function check(name, fn) {
  try {
    fn();
    passed++;
  } catch (error) {
    console.error(`\n✗ ${name}\n  ${error.message}`);
    process.exitCode = 1;
  }
}

// --- getPhoneNumberParts: E.164 ------------------------------------------------------

check('strips the national trunk prefix users are told to type', () => {
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

check('keeps a leading zero where it is significant', () => {
  // Italy has no national prefix: the 0 is part of the number.
  assert.equal(
    getPhoneNumberParts('0212345678', country('IT')).international,
    '+390212345678'
  );
});

check('national number drops the trunk prefix too', () => {
  assert.equal(getPhoneNumberParts('07400 123456', country('GB')).national, '7400123456');
  assert.equal(getPhoneNumberParts('11 91234 5678', country('BR')).national, '11912345678');
});

check('falls back to concatenation while still being typed', () => {
  assert.equal(getPhoneNumberParts('11 9', country('BR')).international, '+55119');
  assert.equal(getPhoneNumberParts('11 9', country('BR')).national, '119');
});

check('handles empty input and a missing country', () => {
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

check('length agrees with the reported E.164', () => {
  const gb = country('GB');
  assert.equal(getInternationalPhoneNumberLength(gb, '07400 123456'), 12);
  assert.equal(
    getInternationalPhoneNumberLength(gb, '07400 123456'),
    getPhoneNumberParts('07400 123456', gb).international.replace(/\D/g, '').length
  );
});

check('formatted international never shows a dropped trunk prefix', () => {
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

// --- formatPhoneNumberValue: what reaches the TextInput ------------------------------

check('the formatted value is always a string or null', () => {
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

// --- getE164Seed: country detection ---------------------------------------------------

check('an overflowing international number resolves a country and is trimmed to fit', () => {
  // Digits past the end of the number would otherwise leave the calling code
  // unresolvable, so the value could not be recognized, formatted or edited.
  const seed = getE164Seed('+1250553456550199');

  assert.equal(seed?.cca2, 'CA');
  assert.equal(seed.nationalDigits, '2505534565');
  assert.equal(isValidPhoneNumber(seed.nationalFormatted, country('CA')), true);
});

check('a number that already resolves is never trimmed', () => {
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

check('an E.164 value never empties the field', () => {
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

check('digits are never dropped on the way to the input', () => {
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

// --- placeholder ---------------------------------------------------------------------

check('the placeholder is shaped like what typing it produces', () => {
  const mismatches = [];

  for (const cca2 of getCountries()) {
    const placeholder = getExampleForCountry(cca2);
    if (!placeholder) continue;

    // Typing the placeholder back in has to round-trip to the same string, otherwise
    // the hint shows a format the input will never produce.
    const typed = getPhoneNumberParts(placeholder, country(cca2));
    const callingCode = getCallingCode(country(cca2));
    const asTyped = typed.internationalFormatted
      .substring(callingCode.length)
      .trim();

    if (asTyped !== placeholder) {
      mismatches.push(`${cca2}: placeholder ${placeholder} -> typed ${asTyped}`);
    }
  }

  assert.deepEqual(mismatches, [], 'placeholder does not match the input format');
});

check('the placeholder does not suggest a national trunk prefix', () => {
  // Typing the leading 0 the old placeholder showed is what produced a broken E.164.
  for (const cca2 of ['GB', 'FR', 'DE', 'NG']) {
    assert.ok(
      !getExampleForCountry(cca2).startsWith('0'),
      `${cca2} placeholder still starts with a trunk prefix`
    );
  }
});

// --- getCallingCode ------------------------------------------------------------------

check('calling code comes from libphonenumber, not a truncated idd.root', () => {
  // The country data splits these into a root plus suffixes, leaving an unusable root.
  assert.equal(getCallingCode({ cca2: 'SH', idd: { root: '+2' } }), '+290');
  assert.equal(getCallingCode({ cca2: 'EH', idd: { root: '+2' } }), '+212');
  assert.equal(getCallingCode({ cca2: 'VA', idd: { root: '+3' } }), '+39');
});

check('calling code falls back to idd.root where there is no numbering plan', () => {
  for (const cca2 of COUNTRIES_WITHOUT_NUMBERING_PLAN) {
    assert.equal(getCallingCode({ cca2, idd: { root: '+672' } }), '+672', cca2);
  }
  assert.equal(getCallingCode(undefined), '');
  assert.equal(getCallingCode({ cca2: 'ZZ' }), '');
});

check('the hidden-country list still matches libphonenumber', () => {
  // Those countries are hidden from the modal precisely because they have no plan.
  // If libphonenumber ever adds one, the country should stop being hidden.
  for (const cca2 of COUNTRIES_WITHOUT_NUMBERING_PLAN) {
    assert.equal(isSupportedCountry(cca2), false, `${cca2} now has a numbering plan`);
  }
});

check('a truncated idd.root no longer corrupts the derived values', () => {
  const saintHelena = { cca2: 'SH', idd: { root: '+2' } };
  assert.equal(
    getPhoneNumberParts('51234', saintHelena).international,
    '+29051234'
  );
});

// --- translations --------------------------------------------------------------------

const TRANSLATORS = [
  getPhoneNumberInputPlaceholder,
  getPhoneNumberInputAccessibilityLabel,
  getPhoneNumberInputAccessibilityHint,
  getCountriesButtonAccessibilityLabel,
  getCountriesButtonAccessibilityHint,
];

check('ISO 639-1 codes resolve to the same strings as ISO 639-2', () => {
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

check('an unknown or missing language falls back to English, never undefined', () => {
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

// --- isValidPhoneNumber: country-aware ----------------------------------------------

// Real example numbers: an invented one can be rejected simply for not existing.
const exampleOf = (cca2) => getExampleNumber(cca2, examples).nationalNumber;

check('rejects a number belonging to another country on the same calling code', () => {
  // Same calling code, different numbering plan: +7 (RU/KZ) and +1 (US/CA/BS).
  assert.equal(isValidPhoneNumber(exampleOf('KZ'), country('RU')), false, 'KZ as RU');
  assert.equal(isValidPhoneNumber(exampleOf('BS'), country('US')), false, 'BS as US');
  assert.equal(isValidPhoneNumber(exampleOf('CA'), country('US')), false, 'CA as US');
  assert.equal(isValidPhoneNumber(exampleOf('US'), country('CA')), false, 'US as CA');
});

check('accepts those same numbers under their own country', () => {
  for (const cca2 of ['KZ', 'RU', 'BS', 'CA', 'US']) {
    assert.equal(isValidPhoneNumber(exampleOf(cca2), country(cca2)), true, cca2);
  }
});

check('accepts territories that share the parent numbering plan', () => {
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

check('accepts formatted input, trunk prefixes and full E.164 strings', () => {
  assert.equal(isValidPhoneNumber('11 91234 5678', country('BR')), true);
  assert.equal(isValidPhoneNumber('07400 123456', country('GB')), true);
  assert.equal(isValidPhoneNumber('+12025550123', country('US')), true);
});

check('returns a boolean, never undefined', () => {
  for (const input of ['', '11 9', 'abc', '999999999999999']) {
    assert.equal(typeof isValidPhoneNumber(input, country('BR')), 'boolean', input);
  }
  assert.equal(isValidPhoneNumber('11912345678', undefined), false);
  assert.equal(isValidPhoneNumber('11912345678', { cca2: 'ZZ' }), false);
});

// --- every country libphonenumber knows ---------------------------------------------

check('example mobile number is valid and round-trips to E.164 for every country', () => {
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

if (process.exitCode) {
  console.error(`\n${passed} check(s) passed, some failed.`);
} else {
  console.log(`All ${passed} checks passed.`);
}
