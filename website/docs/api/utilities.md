---
id: utilities
title: Utility Functions
description: Standalone functions for parsing, validating and querying country/phone data — getAllCountries, isValidPhoneNumber, getPhoneNumberType and more.
sidebar_label: Utilities
sidebar_position: 4
keywords:
  - isValidPhoneNumber
  - getAllCountries
  - getCountryByPhoneNumber
  - getPhoneNumberType
  - phone utility functions
---

# Utility Functions

These are exported alongside the `PhoneInput` component for use outside the component (e.g. backend validation, custom parsing).

| Function                            | Parameters                                 | Return Type               | Description                                                                                              |
| ----------------------------------- | ------------------------------------------ | ------------------------- | -------------------------------------------------------------------------------------------------------- |
| `getAllCountries`                   | `()`                                       | `ICountry[]`              | Returns an array of all available countries                                                              |
| `getNationalPhoneNumber`            | `(internationalPhoneNumber: string)`       | `string`                  | Returns the national phone number from an international phone number                                     |
| `getCountriesByCallingCode`         | `(callingCode: string)`                    | `ICountry[] \| undefined` | Returns countries that match the given calling code                                                      |
| `getCountryByCca2`                  | `(cca2: string)`                           | `ICountry \| undefined`   | Returns a country by its ISO 3166-1 alpha-2 code                                                         |
| `getCountriesByName`                | `(name: string, language?: ILanguage)`     | `ICountry[]`              | Returns countries that match the given name in the specified language                                    |
| `getCountryByPhoneNumber`           | `(phoneNumber: string)`                    | `ICountry \| undefined`   | Returns the country that matches the given phone number                                                  |
| `isValidPhoneNumber`                | `(phoneNumber: string, country: ICountry)` | `boolean`                 | Validates if a phone number is valid for the given country                                               |
| `getInternationalPhoneNumberLength` | `(country: ICountry, phoneNumber: string)` | `number`                  | Returns total digits of calling code + phone number                                                      |
| `getPhoneNumberType`                | `(phoneNumber: string)`                    | `PhoneNumberType \| null` | Returns the line type (`MOBILE`, `FIXED_LINE`, `TOLL_FREE`, etc) of an E.164 number, or `null` when invalid |

## Example

```ts
import {
  getCountryByCca2,
  isValidPhoneNumber,
  getPhoneNumberType,
} from 'rn-international-phone-number';

const us = getCountryByCca2('US');
isValidPhoneNumber('2025550123', us!);     // true
getPhoneNumberType('+12025550123');         // 'FIXED_LINE_OR_MOBILE'
```
