---
id: validation
title: Phone Number Validation
description: Validate international phone numbers in React Native — onValidationChange, ref.isValidPhoneNumber, the standalone isValidPhoneNumber function, and MOBILE/FIXED_LINE line-type detection.
sidebar_label: Validation
sidebar_position: 4
keywords:
  - react native validate phone number
  - onValidationChange
  - isValidPhoneNumber
  - phone number line type
  - MOBILE FIXED_LINE TOLL_FREE
image: img/og.png
---

# Phone Number Validation

Validation is backed by [`libphonenumber-js`](https://github.com/catamphetamine/libphonenumber-js),
so a number is valid only if it matches a real numbering plan for the selected country —
not just a digit count.

There are three ways to read validity. Pick one per form.

## 1. Reactive — `onValidationChange`

Best when the UI reacts to validity (enable a button, show an error).

```tsx
import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import PhoneInput, {ICountry, PhoneNumberType} from 'rn-international-phone-number';

export default function App() {
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState<ICountry | null>(null);
  const [isValid, setIsValid] = useState(false);

  function handleValidation(
    valid: boolean,
    type: PhoneNumberType | null,
    selected: ICountry,
  ) {
    setIsValid(valid);
    console.log(`${selected.name.common}: ${type}`);
  }

  return (
    <View style={{padding: 24}}>
      <PhoneInput
        value={phone}
        onChangePhoneNumber={setPhone}
        country={country}
        onChangeCountry={setCountry}
        onValidationChange={handleValidation}
      />
      {!isValid && phone.length > 0 && (
        <Text style={{color: '#dc2626'}}>Invalid phone number</Text>
      )}
      <Button title="Submit" disabled={!isValid} onPress={() => {}} />
    </View>
  );
}
```

:::note
`onValidationChange` fires only on **transitions** — when validity actually flips. It
does not fire on mount, so an input that starts empty (and therefore invalid) produces
no initial call. Initialize your own state to `false`.
:::

## 2. Imperative — `ref.isValidPhoneNumber`

Best when you only care at submit time and do not want a re-render per keystroke.

```tsx
import React, {useRef} from 'react';
import {Alert, Button, View} from 'react-native';
import PhoneInput, {IPhoneInputRef} from 'rn-international-phone-number';

export default function App() {
  const ref = useRef<IPhoneInputRef>(null);

  function onSubmit() {
    if (!ref.current?.isValidPhoneNumber) {
      Alert.alert('Invalid phone number');
      return;
    }
    // E.164, ready for the backend
    send(ref.current.internationalPhoneNumber);
  }

  return (
    <View style={{padding: 24}}>
      <PhoneInput ref={ref} defaultCountry="US" />
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
}
```

`ref.isValidPhoneNumber` uses the currently selected country automatically.

## 3. Standalone — `isValidPhoneNumber(phoneNumber, country)`

Best outside the component: re-validating stored data, a Yup/Zod schema, a script.

```ts
import {
  getCountryByCca2,
  getCountryByPhoneNumber,
  isValidPhoneNumber,
} from 'rn-international-phone-number';

// national number + explicit country
isValidPhoneNumber('11912345678', getCountryByCca2('BR')!); // true

// E.164 number, country inferred
const stored = '+12025550123';
const country = getCountryByPhoneNumber(stored);
isValidPhoneNumber(stored, country!); // true
```

With a schema validator:

```ts
import {z} from 'zod';

const schema = z.object({
  phoneNumber: z
    .string()
    .refine((v) => {
      const country = getCountryByPhoneNumber(v);
      return !!country && isValidPhoneNumber(v, country);
    }, 'Invalid phone number'),
});
```

## Detecting the line type

Beyond valid/invalid, the library reports **what kind of line** a number is — useful to
reject landlines when you plan to send an SMS.

```tsx
<PhoneInput
  onPhoneNumberTypeChange={(type) => setIsMobile(type === 'MOBILE')}
/>
```

Or on submit, via the ref:

```tsx
const type = ref.current?.phoneNumberType; // 'MOBILE' | 'FIXED_LINE' | null | …
```

Or standalone, from an E.164 string:

```ts
import {getPhoneNumberType} from 'rn-international-phone-number';

getPhoneNumberType('+12025550123'); // 'FIXED_LINE_OR_MOBILE'
```

### `PhoneNumberType` values

| Value                  | Meaning                                        |
| ---------------------- | ---------------------------------------------- |
| `MOBILE`               | Mobile line                                    |
| `FIXED_LINE`           | Landline                                       |
| `FIXED_LINE_OR_MOBILE` | Plan does not distinguish the two (e.g. US)    |
| `TOLL_FREE`            | Toll-free number                               |
| `PREMIUM_RATE`         | Premium-rate number                            |
| `SHARED_COST`          | Shared-cost number                             |
| `VOIP`                 | VoIP number                                    |
| `PERSONAL_NUMBER`      | Personal number                                |
| `PAGER`                | Pager                                          |
| `UAN`                  | Universal Access Number                        |
| `VOICEMAIL`            | Voicemail access number                        |
| `null`                 | Number is incomplete or invalid                |

:::caution SMS-only flows
Many countries — the US included — return `FIXED_LINE_OR_MOBILE` because their numbering
plan does not separate mobile from landline. Rejecting everything that is not exactly
`MOBILE` will lock out real users. Accept `FIXED_LINE_OR_MOBILE` too.
:::

## Validating with a headless UI

[`usePhoneInput`](../api/hooks.md) exposes the same two values:

```tsx
const {isValidPhoneNumber, phoneNumberType} = usePhoneInput({defaultCountry: 'BR'});
```

## Next

- [Form integrations](../examples/react-hook-form.md) — React Hook Form, Formik, TanStack Form
- [Utility functions](../api/utilities.md)
- [FAQ & Troubleshooting](../faq.mdx)
