---
id: tanstack-form
title: TanStack Form
description: Wire the PhoneInput into a TanStack Form using form.Field and field.handleChange.
sidebar_position: 6
keywords:
  - tanstack form phone input
  - tanstack react-form
---

# Controlled by TanStack Form

```tsx
import React, {useRef} from 'react';
import {View} from 'react-native';
import {useForm} from '@tanstack/react-form';
import PhoneInput, {
  IPhoneInputRef,
  getNationalPhoneNumber,
} from 'rn-international-phone-number';

export default function App() {
  const phoneInputRef = useRef<IPhoneInputRef>(null);

  const form = useForm({
    defaultValues: {
      phone: getNationalPhoneNumber('+12505550199'),
    },
    onSubmit: async ({value}) => {
      console.log(value);
    },
  });

  return (
    <View style={{width: '100%', flex: 1, padding: 24}}>
      <form.Field name="phone">
        {(field) => (
          <PhoneInput
            ref={phoneInputRef}
            defaultPhoneNumber="+12505550199"
            value={field.state.value}
            onChangePhoneNumber={(next) => field.handleChange(next)}
          />
        )}
      </form.Field>
    </View>
  );
}
```
