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
import tryParseInternational from '../lib/utils/tryParseInternational.js';
import applyMaskTemplate from '../lib/utils/applyMaskTemplate.js';
import getInitialFormattedInputValue from '../lib/utils/getInitialFormattedInputValue.js';
import getNationalPhoneNumber from '../lib/utils/getNationalPhoneNumber.js';
import getPhoneNumberType from '../lib/utils/getPhoneNumberType.js';
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

// --- typing, overflow, deleting and autofill -----------------------------------------

const digitsOf = (value) => (value || '').replace(/\D/g, '');

// Mirrors the typing path of `onChangePhoneNumberInternal` in usePhoneInput.js: every
// keystroke hands the TextInput's current value plus the new character, a seed (text
// with a '+') takes over, and `null` means the keystroke is ignored. Keep it in sync.
function typeInto(cca2, keys, start = '') {
  let value = start;
  const steps = [];

  for (const key of keys) {
    const text = value + key;
    const seed = getE164Seed(text);
    if (seed) {
      value = seed.nationalFormatted;
    } else {
      const result = formatPhoneNumberValue(text, null, country(cca2));
      if (result !== null) value = result;
    }
    steps.push(value);
  }

  return steps;
}

const typed = (cca2, keys, start) => typeInto(cca2, keys, start).at(-1);

check('typing a national number shows it formatted, keystroke by keystroke', () => {
  assert.deepEqual(typeInto('BR', '11912345678'), [
    '1', '11', '11 9', '11 91', '11 912', '11 9123', '11 91234',
    '11 91234 5', '11 91234 56', '11 91234 567', '11 91234 5678',
  ]);
  assert.equal(typed('US', '2025550123'), '202 555 0123');
  assert.equal(typed('GB', '07911123456'), '07911 123456');
});

check('national numbers starting with the calling code digits are never altered', () => {
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

check('typing never drops or re-reads a digit, in any country', () => {
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

check('a digit typed after a complete number is rejected', () => {
  // Read as calling code + number, "559946897067" is a valid "+55 99 4689 7067", and
  // libphonenumber happily measures it that way. It must stay overflow.
  assert.equal(typed('BR', '7', '55 99468 9706'), '55 99468 9706');
  assert.equal(typed('BR', '1', '11 91234 5678'), '11 91234 5678');
  assert.equal(typed('US', '4', '202 555 0123'), '202 555 0123');
  assert.equal(typed('GB', '7', '07911 123456'), '07911 123456');
});

check('an extra digit is never re-read as a different number, in any country', () => {
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

check('a calling code typed by hand drops off once the number completes', () => {
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

check('autofill without the leading + lands as the national number', () => {
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

check('autofill of a national number is left as is', () => {
  assert.equal(formatPhoneNumberValue('55994689706', null, country('BR')), '55 99468 9706');
  assert.equal(formatPhoneNumberValue('2025550123', null, country('US')), '202 555 0123');
});

check('autofill without the + never blanks or corrupts the number, in any country', () => {
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

check('a calling code is kept where the national reading is also valid', () => {
  // Stripping would swap one valid number for another.
  assert.equal(digitsOf(formatPhoneNumberValue('4915123456789', null, country('DE'))), '4915123456789');
});

check('deleting never re-reads the number', () => {
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

check('only input with a + is taken as international', () => {
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

check('a pasted international number seeds its own country and national value', () => {
  assert.deepEqual(getE164Seed('+55 11 91234-5678'), {
    cca2: 'BR',
    callingCode: '+55',
    nationalDigits: '11912345678',
    nationalFormatted: '11 91234 5678',
  });
  // The trunk prefix people type after the calling code is not part of the number.
  assert.equal(getE164Seed('+44 07400 123456')?.nationalDigits, '7400123456');
});

check('shared calling codes resolve to the country the number belongs to', () => {
  assert.equal(getE164Seed('+7 701 234 5678')?.cca2, 'KZ');
  assert.equal(getE164Seed('+7 916 123 45 67')?.cca2, 'RU');
  assert.equal(getE164Seed('+1 416 555 0123')?.cca2, 'CA');
  assert.equal(getE164Seed('+1 202 555 0123')?.cca2, 'US');
});

// --- customMask ----------------------------------------------------------------------

check('a custom mask fills # slots with digits only', () => {
  const mask = '(##) #####-####';
  assert.equal(applyMaskTemplate('11912345678', mask), '(11) 91234-5678');
  assert.equal(applyMaskTemplate('119', mask), '(11) 9');
  assert.equal(applyMaskTemplate('(11) 9a', mask), '(11) 9');
  assert.equal(applyMaskTemplate('', mask), '');
  // Digits past the mask have no slot and are dropped.
  assert.equal(applyMaskTemplate('123456789012345', mask), '(12) 34567-8901');
});

check('no custom mask leaves the value untouched', () => {
  assert.equal(applyMaskTemplate('11 91234', undefined), '11 91234');
  assert.equal(applyMaskTemplate('11 91234', ''), '11 91234');
});

// --- initial value -------------------------------------------------------------------

check('an E.164 initial value shows its national part, masked when there is a mask', () => {
  const seed = getE164Seed('+5511912345678');
  assert.equal(getInitialFormattedInputValue('+5511912345678', seed), '11 91234 5678');
  assert.equal(
    getInitialFormattedInputValue('+5511912345678', seed, '(##) #####-####'),
    '(11) 91234-5678'
  );
});

check('a national initial value is kept as given, masked when there is a mask', () => {
  assert.equal(getInitialFormattedInputValue('11912345678', null), '11912345678');
  assert.equal(
    getInitialFormattedInputValue('11912345678', null, '(##) #####-####'),
    '(11) 91234-5678'
  );
  assert.equal(getInitialFormattedInputValue('', getE164Seed('+5511912345678')), '');
  assert.equal(getInitialFormattedInputValue(undefined, null), '');
});

// --- getNationalPhoneNumber (public) -------------------------------------------------

check('national number is the formatted part after the calling code', () => {
  assert.equal(getNationalPhoneNumber('+5511912345678'), '11 91234 5678');
  assert.equal(getNationalPhoneNumber('+12025550123'), '202 555 0123');
  assert.equal(getNationalPhoneNumber('+447400123456'), '7400 123456');
  // Significant leading zero in Italy.
  assert.equal(getNationalPhoneNumber('+390212345678'), '02 1234 5678');
  // Still being typed.
  assert.equal(getNationalPhoneNumber('+55119'), '11 9');
});

check('national number of empty input is empty, never undefined', () => {
  assert.equal(getNationalPhoneNumber(''), '');
  assert.equal(getNationalPhoneNumber(undefined), '');
  assert.equal(getNationalPhoneNumber('abc'), 'abc');
});

// --- getPhoneNumberType (public) -----------------------------------------------------

check('phone number type comes from the numbering plan', () => {
  assert.equal(getPhoneNumberType('+5511912345678'), 'MOBILE');
  assert.equal(getPhoneNumberType('+551133334444'), 'FIXED_LINE');
  assert.equal(getPhoneNumberType('+18005550123'), 'TOLL_FREE');
  // The US plan does not tell the two apart.
  assert.equal(getPhoneNumberType('+12025550123'), 'FIXED_LINE_OR_MOBILE');
});

check('phone number type is null when unknown, never undefined', () => {
  for (const input of ['+55119', '', 'abc', null, undefined, 123]) {
    assert.equal(getPhoneNumberType(input), null, JSON.stringify(input));
  }
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
