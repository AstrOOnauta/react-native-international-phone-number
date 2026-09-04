---
id: quick-start
title: Quick Start
description: Minimal working example of the PhoneInput component for React Native.
sidebar_position: 3
keywords:
  - react native phone input example
  - rn-international-phone-number usage
  - quick start
---

# Quick Start

The shortest path to a working international phone input:

```tsx
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import PhoneInput, {ICountry} from 'rn-international-phone-number';

export default function App() {
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState<ICountry | null>(null);

  return (
    <View style={{width: '100%', flex: 1, padding: 24}}>
      <PhoneInput
        defaultPhoneNumber="+12505550199"
        value={phone}
        onChangePhoneNumber={setPhone}
        country={country}
        onChangeCountry={setCountry}
      />

      <Text style={{marginTop: 12}}>
        {`Country: ${country?.name?.common || '-'}
National: ${phone}`}
      </Text>
    </View>
  );
}
```

That's it. The component handles formatting, country selection, and validation automatically.

`defaultPhoneNumber` takes an [E.164](https://en.wikipedia.org/wiki/E.164) number — `+`
plus calling code, area code and number — and sets the country, flag and mask from it.
Drop it and the input starts empty on `BR`; pass
[`defaultCountry`](./guides/props-by-example.md#starting-country) instead to start empty
on another country.

:::note
`defaultCountry` is ignored when `defaultPhoneNumber` is set — the country comes from the
number itself. Use one or the other.
:::

## What next?

- [Set a default country or phone number](./examples/default-value.md)
- [Use `useRef` to read values imperatively](./examples/use-ref.md)
- [Integrate with React Hook Form](./examples/react-hook-form.md), [Formik](./examples/formik.md), [TanStack Form](./examples/tanstack-form.md)
- [Validate the number before submitting](./guides/validation.md)
- [Build a fully custom UI with `usePhoneInput`](./api/hooks.md)
- [Customize styles, dark mode and RTL](./guides/theming.md)
- [Switch language](./guides/i18n.md)
- [FAQ & Troubleshooting](./faq.mdx)
