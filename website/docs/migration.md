---
id: migration
title: Migration Guide
description: Upgrade from react-native-international-phone-number to rn-international-phone-number — package rename plus every renamed prop, ref property and utility function.
sidebar_label: Migration
sidebar_position: 9
keywords:
  - react-native-international-phone-number migration
  - rn-international-phone-number upgrade
  - selectedCountry onChangeSelectedCountry rename
  - showOnly visibleCountries
  - fullPhoneNumber internationalPhoneNumber
image: img/og.png
---

# Migration Guide

## The package was renamed

`react-native-international-phone-number` is now published as
**`rn-international-phone-number`**. Same author, same repository, same component —
shorter name.

:::danger Update your dependency
The npm account that published `react-native-international-phone-number` is no longer
under the author's control. That package is **not maintained by this project**: it is
frozen at `v0.12.3` and will receive no fixes, features or security patches from here,
and the author cannot deprecate or unpublish it.

Every release from `v0.13.0` on is published only as
[`rn-international-phone-number`](https://www.npmjs.com/package/rn-international-phone-number).
If your `package.json` still points at the old name, switch it.
:::

```bash
npm uninstall react-native-international-phone-number
npm install rn-international-phone-number react-native-safe-area-context
npx pod-install ios
```

```diff
- import PhoneInput from 'react-native-international-phone-number';
+ import PhoneInput from 'rn-international-phone-number';
```

:::caution New required peer dependency
Since `v0.13`, the country selector modal comes from `rn-country-select`, which needs
[`react-native-safe-area-context`](https://github.com/th3rdwave/react-native-safe-area-context).
Install it or the modal will fail to render.
:::

---

## From `v0.12.x` to `v0.14.x`

### Renamed props

| Before (`v0.12`)          | Now (`v0.14`)          |
| ------------------------- | ---------------------- |
| `selectedCountry`         | `country`              |
| `onChangeSelectedCountry` | `onChangeCountry`      |
| `defaultValue`            | `defaultPhoneNumber`   |

`defaultValue` still works but is deprecated and will be dropped in a future release.

```diff
  <PhoneInput
-   defaultValue="+12505550199"
+   defaultPhoneNumber="+12505550199"
    value={phone}
    onChangePhoneNumber={setPhone}
-   selectedCountry={country}
-   onChangeSelectedCountry={setCountry}
+   country={country}
+   onChangeCountry={setCountry}
  />
```

### Renamed ref properties

| Before (`v0.12`)                       | Now (`v0.14`)                                                  |
| -------------------------------------- | -------------------------------------------------------------- |
| `value` / `getValue()`                 | `nationalPhoneNumber` / `getNationalPhoneNumber()`             |
| `valueFormatted` / `getValueFormatted()` | `nationalPhoneNumberFormatted` / `getNationalPhoneNumberFormatted()` |
| `fullPhoneNumber` / `getFullPhoneNumber()` | `internationalPhoneNumberFormatted` / `getInternationalPhoneNumberFormatted()` |
| `phoneNumberLength`                    | `internationalPhoneNumberLength`                                |
| `selectedCountry` / `getSelectedCountry()` | `country` / `getCountry()`                                  |
| `isValid`                              | `isValidPhoneNumber`                                            |

```diff
- ref.current?.fullPhoneNumber   // '+55 11 91234-5678'
+ ref.current?.internationalPhoneNumberFormatted // '+55 11 91234 5678'
+ ref.current?.internationalPhoneNumber          // '+5511912345678' (E.164)

- ref.current?.isValid
+ ref.current?.isValidPhoneNumber

- ref.current?.selectedCountry
+ ref.current?.country
```

`internationalPhoneNumber` is new: the unformatted E.164 string, which is usually what
you want to persist. See the [Ref API](./api/ref.md).

### Renamed utility

```diff
- import {getPhoneNumberLength} from 'react-native-international-phone-number';
+ import {getInternationalPhoneNumberLength} from 'rn-international-phone-number';
```

### New in `v0.13`/`v0.14` (nothing to change, but worth adopting)

- [`onValidationChange`](./guides/validation.md) — reactive validity callback
- [`onPhoneNumberTypeChange`](./guides/validation.md#detecting-the-line-type) and
  [`getPhoneNumberType`](./api/utilities.md) — `MOBILE`, `FIXED_LINE`, `TOLL_FREE`…
- [`placeholderType="number"`](./api/props.md) — a real example number as placeholder
- [`usePhoneInput`](./api/hooks.md) — headless hook for fully custom UIs
- Smart paste — pasting an E.164 number switches the country automatically

---

## From `v0.6.x`–`v0.11.x`

Everything above applies, plus these older renames:

| Before                                | Now                                          |
| ------------------------------------- | -------------------------------------------- |
| `showOnly`                            | `visibleCountries`                            |
| `excludedCountries`                   | `hiddenCountries`                             |
| `modalHeight`                         | `initialBottomsheetHeight`                    |
| `customMask={['#### ####']}` (array)  | `customMask="(###) ###-####"` (single string) |
| `country.name.en`                     | `country.name.common` or `country.translations.eng.common` |
| `country.callingCode`                 | `country.idd.root`                            |

```diff
- <PhoneInput showOnly={['BR', 'PT']} excludedCountries={['RU']} modalHeight="80%" />
+ <PhoneInput visibleCountries={['BR', 'PT']} hiddenCountries={['RU']} initialBottomsheetHeight="80%" />

- <PhoneInput customMask={['#### ####', '##### ####']} />
+ <PhoneInput customMask="##### ####" />

- {`${selectedCountry?.name?.en} ${selectedCountry?.callingCode}`}
+ {`${country?.name?.common} ${country?.idd?.root}`}
```

### The font moved packages

The flag font now ships inside `rn-country-select`, so the asset path changed:

```diff
  assets: [
-   './node_modules/react-native-international-phone-number/lib/assets/fonts',
+   './node_modules/rn-country-select/lib/assets/fonts',
  ],
```

Full setup in the [Installation guide](./installation.md#additional-config-for-web).

### Language codes

`v0.12` accepted only ISO 639-2 codes (`eng`, `por`, `spa`). `v0.13+` accepts **both**
ISO 639-1 and ISO 639-2, so `language="pt"` and `language="por"` are equivalent.
See the [i18n guide](./guides/i18n.md).

---

## Older versions

Pre-`v0.7` source and READMEs stay available on their branches:

- [Version 0.6.x](https://github.com/AstrOOnauta/react-native-international-phone-number/tree/v0.6.x)
- [Version 0.5.x](https://github.com/AstrOOnauta/react-native-international-phone-number/tree/v0.5.x)
- [Version 0.4.x](https://github.com/AstrOOnauta/react-native-international-phone-number/tree/v0.4.x)

Something not covered here?
[Open an issue](https://github.com/AstrOOnauta/react-native-international-phone-number/issues).
