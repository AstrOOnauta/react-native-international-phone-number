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

## What next?

- [Set a default country or phone number](./examples/default-value.md)
- [Use `useRef` to read values imperatively](./examples/use-ref.md)
- [Integrate with React Hook Form](./examples/react-hook-form.md), [Formik](./examples/formik.md), [TanStack Form](./examples/tanstack-form.md)
- [Build a fully custom UI with `usePhoneInput`](./api/hooks.md)
- [Customize styles](./guides/theming.md)
- [Switch language](./guides/i18n.md)
