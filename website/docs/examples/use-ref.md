---
id: use-ref
title: useRef
description: Read national, international, validation and line-type values imperatively via the PhoneInput ref.
sidebar_position: 2
keywords:
  - PhoneInput useRef
  - IPhoneInputRef
---

# Using `useRef`

```tsx
import React, {useRef} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import PhoneInput, {IPhoneInputRef} from 'rn-international-phone-number';

export default function App() {
  const phoneInputRef = useRef<IPhoneInputRef>(null);

  function onSubmit() {
    Alert.alert(
      'Result',
      `Country: ${phoneInputRef.current?.country?.name?.common}
National phone number: ${phoneInputRef.current?.nationalPhoneNumber}
National phone number formatted: ${phoneInputRef.current?.nationalPhoneNumberFormatted}
International phone number: ${phoneInputRef.current?.internationalPhoneNumber}
International phone number formatted: ${phoneInputRef.current?.internationalPhoneNumberFormatted}
isValidPhoneNumber: ${phoneInputRef.current?.isValidPhoneNumber}
phoneNumberType: ${phoneInputRef.current?.phoneNumberType}`
    );
  }

  return (
    <View style={{width: '100%', flex: 1, padding: 24}}>
      <PhoneInput ref={phoneInputRef} />
      <TouchableOpacity onPress={onSubmit} style={{marginTop: 12}}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
```

See [Ref properties](../api/ref.md) for the full ref interface.
