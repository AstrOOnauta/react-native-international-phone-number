---
id: formik
title: Formik
description: Wire the PhoneInput into a Formik form using value + onChangePhoneNumber.
sidebar_position: 5
keywords:
  - formik phone input
  - useFormik phone
---

# Controlled by Formik

```tsx
import React, {useRef} from 'react';
import {View} from 'react-native';
import {useFormik} from 'formik';
import PhoneInput, {
  IPhoneInputRef,
  getNationalPhoneNumber,
} from 'rn-international-phone-number';

type FormValues = {
  phone: string;
};

export default function App() {
  const phoneInputRef = useRef<IPhoneInputRef>(null);

  const formik = useFormik<FormValues>({
    initialValues: {
      phone: getNationalPhoneNumber('+12505550199'),
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <View style={{width: '100%', flex: 1, padding: 24}}>
      <PhoneInput
        ref={phoneInputRef}
        defaultPhoneNumber="+12505550199"
        value={formik.values.phone}
        onChangePhoneNumber={(next) => formik.setFieldValue('phone', next)}
      />
    </View>
  );
}
```
