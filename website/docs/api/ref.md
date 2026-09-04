---
id: ref
title: Ref Properties (IPhoneInputRef)
description: Imperative ref API for reading national and international phone numbers, country, validation, line type, and forwarded TextInput methods.
sidebar_label: Ref
sidebar_position: 2
keywords:
  - IPhoneInputRef
  - phone input ref
  - getNationalPhoneNumber
  - getInternationalPhoneNumber
---

# Ref Properties — `IPhoneInputRef`

Source: [lib/interfaces/phoneInputRef.ts](https://github.com/AstrOOnauta/react-native-international-phone-number/blob/master/lib/interfaces/phoneInputRef.ts)

The `ref` prop gives imperative access to the component.

## Phone number values

| Property / Method                        | Type      | Description                                              |
| ---------------------------------------- | --------- | -------------------------------------------------------- |
| `nationalPhoneNumber`                    | `string`  | National number without country code, digits only (`11912345678`) |
| `getNationalPhoneNumber()`               | `string`  | Method form of `nationalPhoneNumber`                     |
| `nationalPhoneNumberFormatted`           | `string`  | National number with formatting applied (`11 91234-5678`) |
| `getNationalPhoneNumberFormatted()`      | `string`  | Method form of `nationalPhoneNumberFormatted`            |
| `internationalPhoneNumber`               | `string`  | **E.164** — calling code + national number, unformatted (`+5511912345678`). This is what you persist. |
| `getInternationalPhoneNumber()`          | `string`  | Method form of `internationalPhoneNumber`                |
| `internationalPhoneNumberFormatted`      | `string`  | Country calling code + national number with formatting   |
| `getInternationalPhoneNumberFormatted()` | `string`  | Method form of `internationalPhoneNumberFormatted`       |
| `internationalPhoneNumberLength`         | `number`  | Total digit count of calling code + phone number         |

## Country, validation & line type

| Property / Method      | Type                      | Description                                                  |
| ---------------------- | ------------------------- | ------------------------------------------------------------ |
| `country`              | `ICountry`                | Currently selected country object                            |
| `getCountry()`         | `ICountry`                | Method form of `country`                                     |
| `isValidPhoneNumber`   | `boolean`                 | Whether the current number is valid for the selected country |
| `phoneNumberType`      | `PhoneNumberType \| null` | Detected line type of the current number (`MOBILE`, `FIXED_LINE`, `TOLL_FREE`, etc), or `null` when incomplete/invalid |
| `getPhoneNumberType()` | `PhoneNumberType \| null` | Method form of `phoneNumberType`                             |
| `props`                | `PhoneInputProps`         | All props passed to the component                            |

## TextInput methods (forwarded)

| Method                                   | Description                                  |
| ---------------------------------------- | -------------------------------------------- |
| `focus()`                                | Focus the input                              |
| `blur()`                                 | Blur the input                               |
| `clear()`                                | Clear the input                              |
| `isFocused()`                            | Returns `true` if the input is focused       |
| `setNativeProps(props)`                  | Set native props on the underlying TextInput |
| `measure(callback)`                      | Measure component dimensions                 |
| `measureInWindow(callback)`              | Measure dimensions relative to the window    |
| `measureLayout(node, onSuccess, onFail)` | Measure position relative to another node    |

:::tip
`ref.isValidPhoneNumber` uses the currently selected country automatically. The exported [`isValidPhoneNumber(phoneNumber, country)`](./utilities.md) function requires passing the country explicitly — useful for validation outside the component.
:::

## Example

See the [useRef example](../examples/use-ref.md) for a complete working snippet.
