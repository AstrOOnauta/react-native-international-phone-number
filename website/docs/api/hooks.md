---
id: hooks
title: Hooks (usePhoneInput)
description: Headless usePhoneInput hook exposing state, setters and the smart-paste pipeline that powers <PhoneInput /> — for fully custom UIs.
sidebar_label: Hooks
sidebar_position: 3
keywords:
  - usePhoneInput
  - headless phone input hook
  - react native phone hook
---

# Hooks

## `usePhoneInput(options)`

A headless hook exposing the same state, formatting and smart-paste pipeline that powers `<PhoneInput />`. Use it when you need a fully custom UI.

### Options — `UsePhoneInputOptions`

| Option                    | Type                                                            | Description                                            |
| ------------------------- | --------------------------------------------------------------- | ------------------------------------------------------ |
| `defaultCountry`          | `ICountryCca2`                                                  | Initial country (ISO 3166-1 alpha-2)                   |
| `defaultPhoneNumber`      | `string`                                                        | Initial E.164 phone number                             |
| `defaultValue`            | `string`                                                        | Deprecated alias of `defaultPhoneNumber`               |
| `value`                   | `string`                                                        | Controlled phone value                                 |
| `country`                 | `ICountry \| null`                                              | Controlled country                                     |
| `customMask`              | `string`                                                        | Custom mask pattern (e.g. `(###) ###-####`)            |
| `onChangePhoneNumber`     | `(phoneNumber: string) => void`                                 | Fires when the formatted national value changes        |
| `onChangeCountry`         | `(country: ICountry) => void`                                   | Fires when the country changes                         |
| `onPhoneNumberTypeChange` | `(type: PhoneNumberType \| null) => void`                       | Fires when the detected line type changes              |
| `onValidationChange`      | `(isValid: boolean, type: PhoneNumberType \| null, country: ICountry) => void` | Fires on validity transitions     |

### Returns — `UsePhoneInputResult`

| Property / Method                   | Type                                                          | Description                                                                                                                                                                                       |
| ----------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nationalPhoneNumber`               | `string`                                                      | National number without calling code (digits only)                                                                                                                                                |
| `nationalPhoneNumberFormatted`      | `string`                                                      | National number with formatting applied                                                                                                                                                           |
| `internationalPhoneNumber`          | `string`                                                      | E.164 string — calling code + national number, unformatted (`+5511912345678`)                                                                                                                     |
| `internationalPhoneNumberFormatted` | `string`                                                      | Calling code + national number with formatting                                                                                                                                                    |
| `internationalPhoneNumberLength`    | `number`                                                      | Total digit count                                                                                                                                                                                 |
| `country`                           | `ICountry`                                                    | Currently selected country object                                                                                                                                                                 |
| `isValidPhoneNumber`                | `boolean`                                                     | Whether the current number is valid for the country                                                                                                                                               |
| `phoneNumberType`                   | `PhoneNumberType \| null`                                     | Detected line type, or `null` if incomplete/invalid                                                                                                                                               |
| `setCountry`                        | `(country: ICountry) => void`                                 | Set the country imperatively                                                                                                                                                                      |
| `setPhoneNumber`                    | `(value: string, options?: { emitChange?: boolean }) => void` | Set the phone number imperatively. Routes through the smart-paste pipeline (detects E.164, switches country, formats). Pass `{ emitChange: false }` to suppress the `onChangePhoneNumber` callback. |
| `onChangePhoneNumber`               | `(text: string) => void`                                      | Handler ready to wire into a `TextInput`'s `onChangeText`                                                                                                                                         |

## Example

```tsx
import {TextInput, View} from 'react-native';
import {usePhoneInput} from 'rn-international-phone-number';

export default function CustomPhoneInput() {
  const {
    country,
    nationalPhoneNumberFormatted,
    isValidPhoneNumber,
    onChangePhoneNumber,
  } = usePhoneInput({defaultCountry: 'US'});

  return (
    <View>
      <TextInput
        value={nationalPhoneNumberFormatted}
        onChangeText={onChangePhoneNumber}
        placeholder={`${country?.idd?.root} phone`}
      />
    </View>
  );
}
```
