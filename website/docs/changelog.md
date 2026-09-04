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
