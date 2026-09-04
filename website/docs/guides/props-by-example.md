---
id: props-by-example
title: Props by Example
description: Every PhoneInput prop with a copy-paste snippet — controlled value, default country, custom mask, country filtering, modal behavior, validation callbacks, styling and accessibility.
sidebar_label: Props by Example
sidebar_position: 1
keywords:
  - react native phone input example
  - PhoneInput props example
  - react native country picker filter
  - customMask react native
  - phone input modal bottom sheet
image: img/og.png
---

# Props by Example

Every prop of `<PhoneInput />`, grouped by what you are trying to do, with a snippet you
can paste. For types and defaults, see the [Props API table](../api/props.md).

## Phone number & country

### Controlled — you own the state

```tsx
const [phone, setPhone] = useState('');
const [country, setCountry] = useState<ICountry | null>(null);

<PhoneInput
  value={phone}
  onChangePhoneNumber={setPhone}
  country={country}
  onChangeCountry={setCountry}
/>;
```

### Uncontrolled — read it at submit time

```tsx
const ref = useRef<IPhoneInputRef>(null);

<PhoneInput ref={ref} />;

// later
ref.current?.internationalPhoneNumber; // '+5511912345678'
```

Full ref surface in the [Ref API](../api/ref.md).

### Starting country

```tsx
<PhoneInput defaultCountry="US" />
```

ISO 3166-1 alpha-2. Falls back to `'BR'` when omitted.

### Starting phone number

```tsx
<PhoneInput defaultPhoneNumber="+12505550199" />
```

Pass an [E.164](https://en.wikipedia.org/wiki/E.164) number — `+` + calling code + area
code + number — and the country, flag and mask are set from it. `defaultValue` is the
deprecated alias.

:::note Both react to prop changes
Change `defaultCountry` after mount and the country switches — and the typed digits are
cleared, since they no longer fit the new country's format. Change `defaultPhoneNumber`
and the number is re-applied through the smart-paste pipeline.

When `defaultPhoneNumber` is set, `defaultCountry` is ignored: the country comes from
the number itself.
:::

## Mask & placeholder

### Custom mask

```tsx
<PhoneInput customMask="(###) ###-####" />
```

`#` is a digit slot; everything else is literal. Overrides the country's own mask for
every country, so use it with `defaultCountry` + `modalDisabled` for single-country
forms.

### Placeholder

```tsx
// default: a real example number for the selected country
<PhoneInput placeholderType="number" />

// legacy translated text ("Insert your phone number", per `language`)
<PhoneInput placeholderType="text" />

// your own text — wins over placeholderType
<PhoneInput placeholder="Work phone" />
```

### Placeholder and selection colors

```tsx
<PhoneInput
  phoneInputPlaceholderTextColor="#9ca3af"
  phoneInputSelectionColor="#2563eb"
/>
```

## Validation & line type

```tsx
<PhoneInput
  onValidationChange={(isValid, type, country) => setCanSubmit(isValid)}
  onPhoneNumberTypeChange={(type) => setIsMobile(type === 'MOBILE')}
/>
```

Both fire only when the value actually changes — details and the standalone validators
in the [Validation guide](./validation.md).

## Filtering the country list

```tsx
// allow-list: nothing else is selectable
<PhoneInput visibleCountries={['BR', 'PT', 'AO', 'MZ']} />

// deny-list
<PhoneInput hiddenCountries={['RU', 'KP']} />

// pinned to the top, above the full list
<PhoneInput popularCountries={['BR', 'US', 'PT']} />

// rename the two sections
<PhoneInput
  popularCountries={['BR', 'US']}
  modalPopularCountriesTitle="Most used"
  modalAllCountriesTitle="Everything else"
/>

// drop the section headers entirely
<PhoneInput modalSectionTitleDisabled />
```

## Locking the input

```tsx
// nothing is editable
<PhoneInput disabled />

// number is editable, country is frozen
<PhoneInput defaultCountry="US" modalDisabled />
```

Neither prop applies a style of its own — see
[styling the disabled state](./theming.md#styling-the-disabled-state).

## Language

```tsx
<PhoneInput language="pt" />   // ISO 639-1
<PhoneInput language="por" />  // ISO 639-2 — same thing
```

Translates country names, section titles, the search placeholder and the not-found
message. [33 languages](./i18n.md).

## Appearance

```tsx
<PhoneInput
  theme="dark"                    // 'light' | 'dark'
  rtl                             // flag block moves to the right
  allowFontScaling={false}        // ignore OS font-size setting
  phoneInputStyles={{container: {borderRadius: 12}}}
  modalStyles={{content: {backgroundColor: '#111827'}}}
/>
```

Every style key is listed in [Theming & Styles](./theming.md).

### Replacing the caret and the flag

```tsx
<PhoneInput
  customCaret={() => <Icon name="chevron-down" size={20} />}
  customFlag={(country) => <Image source={flags[country.cca2]} />}
/>
```

`customFlag` also removes the need for the
[flag emoji font](../installation.md#additional-config-for-web).

## Modal presentation

```tsx
<PhoneInput
  modalType="bottomSheet"           // 'bottomSheet' | 'popup'
  isFullScreen={false}
  initialBottomsheetHeight="60%"    // number (px) or percentage string
  minBottomsheetHeight="40%"
  maxBottomsheetHeight="90%"
/>
```

`modalType` defaults to `'popup'` on Web and `'bottomSheet'` on iOS/Android.
The three height props apply to `bottomSheet` only.

### Showing and hiding modal pieces

```tsx
<PhoneInput
  showModalSearchInput={false}      // no search field
  showModalAlphabetFilter           // A–Z rail on the side
  showModalCloseButton
  showModalScrollIndicator={false}
/>
```

### Modal search field

```tsx
<PhoneInput
  modalSearchInputPlaceholder="Search country"
  modalSearchInputPlaceholderTextColor="#9ca3af"
  modalSearchInputSelectionColor="#2563eb"
  modalSearchInputFocusedBorderColor="#2563eb"
  modalNotFoundCountryMessage="No country matches that"
/>
```

Leave the two text props out and they are translated from [`language`](./i18n.md).

### Backdrop and closing

```tsx
<PhoneInput
  disabledModalBackdropPress                       // tapping outside won't close
  removedModalBackdrop                             // no dim layer at all
  onModalBackdropPress={(closeModal) => {
    if (hasUnsavedChanges) return;                 // veto the close
    closeModal();
  }}
  onModalRequestClose={() => analytics.track('country_modal_closed')}
/>
```

`onModalRequestClose` also covers the Android hardware back button.

### Replacing modal components

```tsx
<PhoneInput
  modalDragHandleIndicatorComponent={() => <View style={styles.handle} />}
  modalSectionTitleComponent={(item) => <Text style={styles.h2}>{item.title}</Text>}
  modalCountryItemComponent={(country) => (
    <View style={styles.row}>
      <Text>{country.flag}</Text>
      <Text>{country.name.common}</Text>
      <Text>{country.idd.root}</Text>
    </View>
  )}
  modalCloseButtonComponent={() => <Text>Done</Text>}
/>
```

## Accessibility

Eighteen label/hint props, one pair per interactive element:

```tsx
<PhoneInput
  accessibilityLabelPhoneInput="Phone number"
  accessibilityHintPhoneInput="Enter your number without the country code"
  accessibilityLabelCountriesButton="Select country"
  accessibilityHintCountriesButton="Opens the country list"
/>
```

Complete list in the [Accessibility guide](./accessibility.md).

## Anything `TextInput` accepts

`PhoneInputProps` extends React Native's
[`TextInputProps`](https://reactnative.dev/docs/textinput#props), so these all work:

```tsx
<PhoneInput
  autoFocus
  onFocus={handleFocus}
  onBlur={handleBlur}
  returnKeyType="done"
  onSubmitEditing={submit}
  maxLength={20}
  testID="phone-input"
/>
```

The only two that are **not** forwarded are `value` and `onChangeText` — the component
owns them; use `value` + `onChangePhoneNumber`.

## Everything at once

```tsx
<PhoneInput
  ref={ref}
  theme="dark"
  language="pt"
  defaultCountry="BR"
  popularCountries={['BR', 'PT', 'US']}
  hiddenCountries={['RU']}
  placeholderType="number"
  modalType="bottomSheet"
  initialBottomsheetHeight="60%"
  showModalAlphabetFilter
  onValidationChange={(isValid) => setCanSubmit(isValid)}
  onPhoneNumberTypeChange={(type) => setLineType(type)}
  phoneInputStyles={{container: {borderRadius: 12}}}
  modalStyles={{content: {backgroundColor: '#111827'}}}
  accessibilityLabelPhoneInput="Phone number"
  autoFocus
  testID="phone-input"
/>
```

## Next

- [Props API table](../api/props.md) — types and defaults
- [Ref API](../api/ref.md) and [`usePhoneInput`](../api/hooks.md)
- [FAQ & Troubleshooting](../faq.mdx)
