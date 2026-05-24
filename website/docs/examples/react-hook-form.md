---
id: react-hook-form
title: React Hook Form
description: Wire the PhoneInput into React Hook Form using a ref to sync the international phone number into form state at submit time.
sidebar_position: 4
keywords:
  - react hook form phone input
  - RHF phone
---

# Controlled by React Hook Form

```tsx
import React, {useRef} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {useForm} from 'react-hook-form';
import PhoneInput, {
  IPhoneInputRef,
  getNationalPhoneNumber,
} from 'rn-international-phone-number';

type FormValues = {
  name: string;
  phone: string;
};

export default function App() {
  const phoneInputRef = useRef<IPhoneInputRef>(null);
  const {setValue, handleSubmit} = useForm<FormValues>({
    defaultValues: {
      name: '',
      phone: getNationalPhoneNumber('+12505550199'),
    },
  });

  const onSubmit = handleSubmit((data) => {
    Alert.alert('Result', JSON.stringify(data, null, 2));
  });

  function onPressSubmit() {
    // Sync ref value into RHF right before submit.
    setValue(
      'phone',
      phoneInputRef.current?.internationalPhoneNumberFormatted || ''
    );
    onSubmit();
  }

  return (
    <View style={{width: '100%', flex: 1, padding: 24}}>
      <PhoneInput ref={phoneInputRef} defaultPhoneNumber="+12505550199" />
      <TouchableOpacity onPress={onPressSubmit} style={{marginTop: 12}}>
        <Text>Submit with RHF</Text>
      </TouchableOpacity>
    </View>
  );
}
```

:::note Observations
1. Use `defaultPhoneNumber` with the format: `+(country code)(area code)(number)`.
2. If `defaultPhoneNumber` is not E.164-compatible, the component keeps the best possible local formatting.
:::
