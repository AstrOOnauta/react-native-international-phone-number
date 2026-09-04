---
id: theming
title: Theming & Styles
description: Customize the PhoneInput component and country selector modal — phoneInputStyles and modalStyles full reference.
sidebar_label: Theming
sidebar_position: 2
keywords:
  - phoneInputStyles
  - modalStyles
  - react native phone input theme
  - customize phone input
---

# Theming & Styles

Three levels of customization, from cheapest to most granular:

1. **`theme`** — a ready-made `light` / `dark` palette
2. **`phoneInputStyles` / `modalStyles`** — override any individual element
3. **`customFlag` / `customCaret` / `modalCountryItemComponent`…** — replace whole pieces of UI

## Dark mode — `theme`

```tsx
<PhoneInput theme="dark" />
```

`theme` accepts `'light'` (default) or `'dark'`, and applies to both the input and the
country selector modal.

Follow the OS setting with React Native's `useColorScheme`:

```tsx
import {useColorScheme} from 'react-native';

const scheme = useColorScheme(); // 'light' | 'dark' | null

<PhoneInput theme={scheme === 'dark' ? 'dark' : 'light'} />;
```

`theme` is the base layer — anything you pass in `phoneInputStyles` or `modalStyles`
wins over it, so you can start from `dark` and repaint only what you need.

## Right-to-left — `rtl`

```tsx
<PhoneInput rtl />
```

Swaps the flag/calling-code block to the right of the input, for Arabic, Hebrew, Persian
and Urdu layouts. Pair it with the matching [`language`](./i18n.md):

```tsx
import {I18nManager} from 'react-native';

<PhoneInput rtl={I18nManager.isRTL} language="ar" />;
```

## Custom caret and flag

```tsx
<PhoneInput
  customCaret={() => <Icon name="chevron-down" size={20} color="#6b7280" />}
  customFlag={(country) => <Image source={flags[country.cca2]} style={{width: 24}} />}
/>
```

`customFlag` also removes the need for the [flag emoji font](../installation.md#additional-config-for-web).

## Modal presentation

```tsx
<PhoneInput
  modalType="bottomSheet"          // 'bottomSheet' | 'popup'
  initialBottomsheetHeight="60%"
  minBottomsheetHeight="40%"
  maxBottomsheetHeight="90%"
  isFullScreen={false}
/>
```

`modalType` defaults to `'popup'` on Web and `'bottomSheet'` on iOS/Android.

## `phoneInputStyles`

Source: [lib/interfaces/phoneInputStyles.ts](https://github.com/AstrOOnauta/react-native-international-phone-number/blob/master/lib/interfaces/phoneInputStyles.ts)

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

## Styling the disabled state

`disabled` blocks the whole component; `modalDisabled` locks only the country. Neither
applies a style of its own, so drive it from your own state:

```tsx
const [isDisabled, setIsDisabled] = useState(true);

<PhoneInput
  disabled={isDisabled}
  phoneInputStyles={{
    container: isDisabled ? {backgroundColor: '#e5e7eb', opacity: 0.7} : {},
  }}
/>;
```

## Placeholders and modal copy

```tsx
<PhoneInput
  placeholderType="number"                    // default: real example number per country
  placeholder="Your phone number"             // overrides placeholderType
  modalSearchInputPlaceholder="Search country"
  modalNotFoundCountryMessage="No country found"
  modalPopularCountriesTitle="Popular"
  modalAllCountriesTitle="All countries"
/>
```

Leave these out and they are translated automatically from the
[`language`](./i18n.md) prop.

## Next

- [Full props reference](../api/props.md)
- [Internationalization](./i18n.md)
- [Accessibility](./accessibility.md)
