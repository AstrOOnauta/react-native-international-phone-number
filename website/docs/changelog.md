---
id: changelog
title: Changelog
description: Release history of rn-international-phone-number — new features, fixes and breaking changes per version.
sidebar_label: Changelog
sidebar_position: 11
keywords:
  - rn-international-phone-number changelog
  - react native phone input releases
  - version history
---

# Changelog

Upgrading across a rename or a major version? Start with the
[Migration guide](./migration.md).

## Unreleased

**Fixed**

- `internationalPhoneNumber` is now a real E.164 string. It was built by concatenating
  the calling code with the typed digits, which kept the national trunk prefix that the
  example-number placeholder invites users to type — GB `07400 123456` produced
  `+4407400123456` instead of `+447400123456`. Same fix for `nationalPhoneNumber` and
  `getInternationalPhoneNumberLength()`. Countries where a leading zero is significant
  (Italy) keep it.
- `isValidPhoneNumber()` now validates against the **selected** country instead of the
  whole calling code. A Kazakh number no longer passes with Russia selected, and a
  Bahamian number no longer passes with the United States selected — both share a calling
  code (`+7`, `+1`). Territories without a numbering plan of their own (Åland, Isle of
  Man, Svalbard…) keep validating under their parent country's plan.
- `isValidPhoneNumber()` returns a `boolean` in every case; it previously returned
  `undefined` for input it could not parse, and for a full E.164 string passed together
  with its country (`isValidPhoneNumber('+12025550123', us)`).
- `language` now accepts ISO 639-1 codes (`"pt"`, `"en"`, `"ar"`) as documented. Only the
  ISO 639-2 spelling (`"por"`) used to resolve — the 2-letter form left the input with no
  placeholder and no accessibility label at all. An unknown or missing code now falls
  back to English instead of `undefined`.
- Every `TextInputProps` the component does not own reaches the underlying `TextInput`.
  `keyboardType`, `testID`, `style`, `editable`, `placeholderTextColor` and
  `selectionColor` were typed as accepted but silently dropped. `style` merges with the
  component's own styles; `disabled` still wins over `editable`. `value` and
  `onChangeText` remain owned by the component.
- `internationalPhoneNumberFormatted` is formatted from the corrected E.164, so it no
  longer shows a trunk prefix that `internationalPhoneNumber` has already dropped
  (`+44 07400 123456` → `+44 7400 123456`). Unchanged for input typed without one.
- The calling code now comes from libphonenumber rather than the country data's
  `idd.root`, which is stored as a root plus suffixes and left three territories with a
  truncated value: Saint Helena showed `+2` instead of `+290`, Western Sahara `+2`
  instead of `+212`, Vatican City `+3` instead of `+39`.
- An international `defaultPhoneNumber` (or pasted value) carrying digits past the end of
  the number now has them trimmed, so the country is still detected and the value lands
  in the input as something editable. `+1250553456550199` selects Canada and fills
  `250 553 4565`, the same as passing `+12505534565`. Numbers that already resolve are
  never shortened. Previously nothing happened at all: the selected country's calling
  code was prefixed onto a string that already carried its own `+`, building `+55+1250…`,
  which libphonenumber gave up on — it returned just `+55`, which was then stripped back
  off, leaving `""`.
- A value the component still cannot format is no longer dropped either. Overflowing the
  country's plan makes formatting return "rejected", which is right while typing — the
  keystroke is ignored and the previous value stands — but a programmatic set has no
  previous value to stand on, so under a controlled `value` the parent was never notified
  and the prop did nothing at all. Programmatic sets now keep the raw value; only typing
  still rejects. Controlled and uncontrolled inputs now agree.
- `ref.clear()` now empties the input. The underlying `TextInput` is controlled, so the
  native `clear()` it used to call was undone by the next render.
- `showModalScrollIndicator` reaches the modal. It was accepted and documented but never
  forwarded.
- `onValidationChange` and `onPhoneNumberTypeChange` report the initial state when the
  input starts pre-filled (`defaultPhoneNumber` or a controlled `value`). A form opening
  on a valid number was never told about it. An input that starts empty stays silent, so
  a pristine form is still not told it is invalid before the user types.
- Territories libphonenumber has no numbering plan for (`BV`, `GS`, `PN`, `TF`, `UM`) are
  hidden from the modal alongside `AQ` and `HM`. Picking one left the input with no mask,
  no length limit and no validation.
- `customFlag` and `customCaret` can hide the element by returning `null`. Both results
  were run through a falsy check, so `null` fell back to the default flag or caret.
  Returning `undefined` still means "keep the default".
- `phoneInputStyles.caret` is no longer also spread raw onto the caret's wrapper `View`.
  It is a `TextStyle` (`color`, `fontSize`, `display`), and those are not valid `View`
  style keys.
- The country button reports its disabled state to screen readers when `disabled` or
  `modalDisabled` is set. It used to announce a plain button that silently did nothing.

**Changed**

- The `placeholderType="number"` placeholder is now formatted the way the input formats
  what you type. It used the national format, which groups digits differently
  (`(201) 555-0123` vs `201 555 0123`) and prints the national trunk prefix
  (`07400 123456` for the UK) — teaching users to type a leading zero the number should
  not carry.
- The library now loads a single libphonenumber metadata set (`max`) instead of pulling
  in both `min` and `max` — roughly 84 KB less metadata in the bundle. Validation is
  stricter as a result: numbers that merely matched a length pattern no longer pass.
- `react-native-safe-area-context` is declared as a peer dependency. It was always
  required — the country modal renders with it — but only mentioned in the install docs.

**Internal**

- `npm test` runs `tsc --noEmit` over the shipped types plus a dependency-free
  self-check (`scripts/check.mjs`) covering E.164 derivation, validation, translations,
  placeholders and calling codes across every country libphonenumber knows.
- Dropped the unused (and deprecated) `metro-react-native-babel-preset` dev dependency.
- Bumped `libphonenumber-js` to 1.13.12. No country or calling code changed; the only
  validation difference across the example-number sweep is a Somali range that upstream
  now recognizes as valid.

## v0.14.0

**Added**

- [`usePhoneInput`](./api/hooks.md) — headless hook exposing the whole state machine
  (values, country, validity, line type, setters) for fully custom UIs.
- [`onValidationChange`](./guides/validation.md) — fires when validity flips, with the
  detected line type and country.
- [`onPhoneNumberTypeChange`](./guides/validation.md#detecting-the-line-type) and the
  exported `getPhoneNumberType()` — `MOBILE`, `FIXED_LINE`, `TOLL_FREE`, `VOIP` and more.
- `placeholderType="number"` — uses a real example number for the current country as the
  placeholder instead of translated text. Now the default.

**Fixed**

- Smart paste fills the input correctly, and `customMask` clears properly on an empty
  input.
- `onChangeCountry` now fires on mount when the `country` prop is left undefined.
- The input clears when `defaultCountry` changes after mount.

**Internal**

- `PhoneInput` is now a thin view over `usePhoneInput`; `lib/index.js` was split into
  utils, subcomponents and a ref hook.
- npm package ships via a `files` whitelist — smaller install.

## v0.13.2

- Streamlined RTL styling for the flag container.

## v0.13.1

- Improved RTL support.
- `peerDependencies` relaxed to minimum versions instead of pinned ranges
  (thanks [@Shasikhan](https://github.com/AstrOOnauta/react-native-international-phone-number/pull/175)).

## v0.13.0

**Breaking**

- Package renamed to `rn-international-phone-number`.
- The country selector modal now comes from
  [`rn-country-select`](https://github.com/AstrOOnauta/react-native-country-select),
  adding `react-native-safe-area-context` as a required peer dependency — and moving the
  flag font to `node_modules/rn-country-select/lib/assets/fonts`.
- Props renamed: `selectedCountry` → `country`, `onChangeSelectedCountry` →
  `onChangeCountry`, `defaultValue` → `defaultPhoneNumber` (old name deprecated).
- Ref renamed: `value` → `nationalPhoneNumber`, `fullPhoneNumber` →
  `internationalPhoneNumberFormatted`, `isValid` → `isValidPhoneNumber`,
  `selectedCountry` → `country`.
- `getPhoneNumberLength()` → `getInternationalPhoneNumberLength()`.

**Added**

- `internationalPhoneNumber` — unformatted E.164 output.
- Bottom sheet and popup modal types, alphabet filter, popular countries section,
  custom country item / section title / close button components.
- ISO 639-1 language codes accepted alongside ISO 639-2 — [33 languages](./guides/i18n.md).

Full diff for every step in the
[migration guide](./migration.md#from-v012x-to-v014x).

## Older releases

Release notes for `v0.12` and earlier live on GitHub:

- [All releases](https://github.com/AstrOOnauta/react-native-international-phone-number/releases)
- [Version 0.6.x branch](https://github.com/AstrOOnauta/react-native-international-phone-number/tree/v0.6.x)
- [Version 0.5.x branch](https://github.com/AstrOOnauta/react-native-international-phone-number/tree/v0.5.x)
- [Version 0.4.x branch](https://github.com/AstrOOnauta/react-native-international-phone-number/tree/v0.4.x)
