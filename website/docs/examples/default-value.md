---
id: default-value
title: Default Value
description: Pre-fill the PhoneInput with an E.164 phone number — country is detected automatically.
sidebar_position: 3
keywords:
  - PhoneInput defaultPhoneNumber
  - E.164
---

# Setting a default value

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
isValidPhoneNumber: ${phoneInputRef.current?.isValidPhoneNumber}`
    );
  }

  return (
    <View style={{width: '100%', flex: 1, padding: 24}}>
      <PhoneInput ref={phoneInputRef} defaultPhoneNumber="+12505550199" />
      <TouchableOpacity onPress={onSubmit} style={{marginTop: 12}}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
```

:::note Observations
1. Use `defaultPhoneNumber` with the format: `+(country code)(area code)(number)`.
2. If `defaultPhoneNumber` is not E.164-compatible, the component keeps the best possible local formatting.
:::
