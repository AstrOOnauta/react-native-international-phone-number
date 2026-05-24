---
id: theming
title: Theming & Styles
description: Customize the PhoneInput component and country selector modal — phoneInputStyles and modalStyles full reference.
sidebar_label: Theming
sidebar_position: 1
keywords:
  - phoneInputStyles
  - modalStyles
  - react native phone input theme
  - customize phone input
---

# Theming & Styles

The component exposes two style objects: one for the input itself, and one for the country-selection modal.

## `phoneInputStyles`

Source: [lib/interfaces/phoneInputStyles.ts](https://github.com/AstrOOnauta/react-native-international-phone-number/blob/main/lib/interfaces/phoneInputStyles.ts)

| Property        | Type        | Description                 |
| --------------- | ----------- | --------------------------- |
| `container`     | `ViewStyle` | Main input container        |
| `flagContainer` | `ViewStyle` | Flag and dropdown container |
| `flag`          | `TextStyle` | Flag emoji styling          |
| `caret`         | `TextStyle` | Dropdown arrow              |
| `divider`       | `ViewStyle` | Separator line              |
| `callingCode`   | `TextStyle` | Country calling code        |
| `input`         | `TextStyle` | Phone number input          |

## `modalStyles`

Source: [rn-country-select countrySelectStyles](https://github.com/AstrOOnauta/react-native-country-select/blob/main/lib/interface/countrySelectStyles.ts)

| Property                     | Type        | Description               |
| ---------------------------- | ----------- | ------------------------- |
| `backdrop`                   | `ViewStyle` | Modal background overlay  |
| `container`                  | `ViewStyle` | Modal main container      |
| `content`                    | `ViewStyle` | Modal content area        |
| `dragHandleContainer`        | `ViewStyle` | Drag handle area          |
| `dragHandleIndicator`        | `ViewStyle` | Drag handle indicator     |
| `searchContainer`            | `ViewStyle` | Search input wrapper      |
| `searchInput`                | `TextStyle` | Search input field        |
| `list`                       | `ViewStyle` | Countries list container  |
| `countryItem`                | `ViewStyle` | Individual country row    |
| `flag`                       | `TextStyle` | Country flag in list      |
| `countryInfo`                | `ViewStyle` | Country details container |
| `callingCode`                | `TextStyle` | Calling code in list      |
| `countryName`                | `TextStyle` | Country name in list      |
| `sectionTitle`               | `TextStyle` | Section headers           |
| `closeButton`                | `ViewStyle` | Close button container    |
| `closeButtonText`            | `TextStyle` | Close button text         |
| `countryNotFoundContainer`   | `ViewStyle` | No results container      |
| `countryNotFoundMessage`     | `TextStyle` | No results message        |
| `alphabetContainer`          | `ViewStyle` | Alphabet filter container |
| `alphabetLetter`             | `ViewStyle` | Alphabet letter item      |
| `alphabetLetterText`         | `TextStyle` | Alphabet letter text      |
| `alphabetLetterActive`       | `ViewStyle` | Active letter state       |
| `alphabetLetterDisabled`     | `ViewStyle` | Disabled letter state     |
| `alphabetLetterTextActive`   | `TextStyle` | Active letter text        |
| `alphabetLetterTextDisabled` | `TextStyle` | Disabled letter text      |

## Example

```tsx
<PhoneInput
  phoneInputStyles={{
    container: {backgroundColor: '#1f2937', borderRadius: 12},
    input: {color: '#fff'},
    callingCode: {color: '#fff'},
    caret: {color: '#9ca3af'},
  }}
  modalStyles={{
    backdrop: {backgroundColor: 'rgba(0,0,0,0.7)'},
    content: {backgroundColor: '#111827'},
    countryName: {color: '#fff'},
    callingCode: {color: '#9ca3af'},
  }}
/>
```
