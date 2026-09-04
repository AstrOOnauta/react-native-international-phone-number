---
id: props
title: Props API (PhoneInputProps)
description: Complete reference for every prop of the PhoneInput component, including theme, language, validation callbacks, modal customization, and accessibility.
sidebar_label: Props
sidebar_position: 1
keywords:
  - PhoneInputProps
  - react native phone input props
  - PhoneInput api
---

# Component Props — `PhoneInputProps`

Source: [lib/interfaces/phoneInputProps.ts](https://github.com/AstrOOnauta/react-native-international-phone-number/blob/master/lib/interfaces/phoneInputProps.ts)

Looking for a snippet instead of a type? Every prop has one in
[Props by Example](../guides/props-by-example.md).

:::tip Every `TextInput` prop works too
`PhoneInputProps` extends React Native's
[`TextInputProps`](https://reactnative.dev/docs/textinput#props), so `autoFocus`,
`keyboardType`, `onBlur`, `onFocus`, `returnKeyType`, `maxLength`, `testID` and the rest
are forwarded to the underlying input.

The two exceptions are `value` and `onChangeText`, which the component owns — use
`value` + `onChangePhoneNumber` instead.
:::

| Prop                                   | Type                               | Description                                                               |
| -------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------- |
| `theme`                                | `ITheme`                           | Theme configuration for the component                                     |
| `language`                             | `ILanguage`                        | Language for country names and UI                                         |
| `defaultPhoneNumber`                   | `string`                           | Default phone number value (format: `+(country code)(area code)(number)`) |
| `defaultValue`                         | `string`                           | Deprecated alias of `defaultPhoneNumber`                                  |
| `value`                                | `string`                           | Controlled phone number value                                             |
| `onChangePhoneNumber`                  | `(phoneNumber: string) => void`    | Callback fired when the phone number changes                              |
| `defaultCountry`                       | `ICountryCca2`                     | Default selected country (ISO 3166-1 alpha-2)                             |
| `country`                              | `ICountry \| null`                 | Controlled selected country                                               |
| `onChangeCountry`                      | `(country: ICountry) => void`      | Callback fired when selected country changes                              |
| `onPhoneNumberTypeChange`              | `(type: PhoneNumberType \| null) => void` | Callback fired when the detected phone-number line type changes (`MOBILE`, `FIXED_LINE`, `TOLL_FREE`, etc). Returns `null` for incomplete or invalid numbers. |
| `onValidationChange`                   | `(isValid: boolean, type: PhoneNumberType \| null, country: ICountry) => void` | Callback fired on validity transitions (does not fire on mount). |
| `placeholder`                          | `string`                           | Placeholder text for phone input (overrides `placeholderType`)            |
| `placeholderType`                      | `'number' \| 'text'`               | When `'number'` (default), shows a real example number for the current country as placeholder. `'text'` keeps the legacy translated placeholder. |
| `phoneInputPlaceholderTextColor`       | `string`                           | Color of placeholder text                                                 |
| `phoneInputSelectionColor`             | `string`                           | Color of text selection                                                   |
| `phoneInputStyles`                     | `IPhoneInputStyles`                | Custom styles for phone input component                                   |
| `modalStyles`                          | `ICountrySelectStyles`             | Custom styles for country selection modal                                 |
| `disabled`                             | `boolean`                          | Disable the entire phone input                                            |
| `modalDisabled`                        | `boolean`                          | Disable only the country selection modal                                  |
| `customMask`                           | `string`                           | Custom phone number mask (format like this: `(###) ###-####`)             |
| `visibleCountries`                     | `ICountryCca2[]`                   | Array of country codes to show in modal                                   |
| `hiddenCountries`                      | `ICountryCca2[]`                   | Array of country codes to hide from modal                                 |
| `popularCountries`                     | `ICountryCca2[]`                   | Array of country codes to show in popular section                         |
| `customCaret`                          | `() => ReactNode`                  | Custom dropdown arrow component                                           |
| `customFlag`                           | `(country: ICountry) => ReactNode` | Custom flag component to replace default flag emoji                       |
| `rtl`                                  | `boolean`                          | Enable right-to-left layout                                               |
| `isFullScreen`                         | `boolean`                          | Show modal in full screen mode                                            |
| `modalType`                            | `'bottomSheet' \| 'popup'`         | Type of modal presentation                                                |
| `modalDragHandleIndicatorComponent`    | `() => ReactNode`                  | Custom drag handle indicator component                                    |
| `modalSearchInputPlaceholderTextColor` | `string`                           | Color of modal search placeholder text                                    |
| `modalSearchInputPlaceholder`          | `string`                           | Placeholder text for modal search input                                   |
| `modalSearchInputSelectionColor`       | `string`                           | Color of modal search text selection                                      |
| `modalSearchInputFocusedBorderColor`   | `string`                           | Border color of the modal search input while focused                      |
| `modalPopularCountriesTitle`           | `string`                           | Title for popular countries section                                       |
| `modalAllCountriesTitle`               | `string`                           | Title for all countries section                                           |
| `modalSectionTitleComponent`           | `(item: ISectionTitle) => ReactElement` | Custom section title component                                       |
| `modalCountryItemComponent`            | `(item: ICountry) => ReactElement`      | Custom country item component                                        |
| `modalCloseButtonComponent`            | `() => ReactNode`                  | Custom close button component                                             |
| `modalSectionTitleDisabled`            | `boolean`                          | Disable section titles in modal                                           |
| `modalNotFoundCountryMessage`          | `string`                           | Message when no countries found                                           |
| `disabledModalBackdropPress`           | `boolean`                          | Disable modal close on backdrop press                                     |
| `removedModalBackdrop`                 | `boolean`                          | Remove modal backdrop entirely                                            |
| `onModalBackdropPress`                 | `(closeModal: () => void) => void` | Callback when modal backdrop is pressed                                   |
| `onModalRequestClose`                  | `() => void`                       | Callback when modal close is requested                                    |
| `showModalAlphabetFilter`              | `boolean`                          | Show alphabet filter in modal                                             |
| `showModalSearchInput`                 | `boolean`                          | Show search input in modal                                                |
| `showModalCloseButton`                 | `boolean`                          | Show close button in modal                                                |
| `showModalScrollIndicator`             | `boolean`                          | Show scroll indicator in modal                                            |
| `allowFontScaling`                     | `boolean`                          | Allow font scaling based on device settings (default: `true`)             |
| `initialBottomsheetHeight`             | `number \| string`                 | Initial height of the bottom sheet modal                                  |
| `minBottomsheetHeight`                 | `number \| string`                 | Minimum height of the bottom sheet modal                                  |
| `maxBottomsheetHeight`                 | `number \| string`                 | Maximum height of the bottom sheet modal                                  |
| `ref`                                  | `Ref<IPhoneInputRef>`              | Ref to access national/international values, country, isValidPhoneNumber and native input methods |

## Defaults worth knowing

| Prop              | Default                                            |
| ----------------- | -------------------------------------------------- |
| `theme`           | `'light'`                                          |
| `placeholderType` | `'number'` — a real example number for the country |
| `modalType`       | `'popup'` on Web, `'bottomSheet'` on iOS/Android    |
| `isFullScreen`    | `false`                                            |
| `allowFontScaling`| `true`                                             |
| `defaultCountry`  | `'BR'` when no `defaultCountry`/`defaultPhoneNumber` is given |

## Accessibility props

Eighteen `accessibilityLabel*` / `accessibilityHint*` props cover every interactive
element — listed in the [Accessibility guide](../guides/accessibility.md).

See also: [Ref properties](./ref.md), [Hooks](./hooks.md), [Utilities](./utilities.md),
[Validation](../guides/validation.md), [Theming](../guides/theming.md).
