<div align = "center">
  <img src="https://github.com/AstrOOnauta/react-native-international-phone-number/blob/master/gif/preview.gif">
</div>

<br>

<h1 align="center">React Native International Phone Number Input</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/react-native-international-phone-number">
    <img src="https://img.shields.io/npm/v/react-native-international-phone-number.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/react-native-international-phone-number">
    <img src="https://img.shields.io/npm/dm/react-native-international-phone-number.svg?style=flat-square">
  </a>
  <a href="https://github.com/AstrOOnauta/react-native-international-phone-number">
    <img src="https://img.shields.io/github/stars/AstrOOnauta/react-native-international-phone-number"/>
  </a>
  <a href="https://github.com/AstrOOnauta/react-native-international-phone-number/issues">
    <img src="https://img.shields.io/github/issues/AstrOOnauta/react-native-international-phone-number"/>
  </a>
  <a href="https://github.com/AstrOOnauta/react-native-international-phone-number/pulls">
    <img src="https://img.shields.io/github/issues-pr/AstrOOnauta/react-native-international-phone-number"/>
  </a>
</p>

## Installation

```bash
$ npm i --save react-native-international-phone-number
```

OR

```bash
$ yarn add react-native-international-phone-number
```

AND

> Update your `metro.config.js` file:
>
> ```bash
> module.exports = {
>  ...
>  resolver: {
>    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json'],
>  },
> };
> ```

## Features

- 📱 Works with iOS, Android (Cross-platform) and Expo;
- 🎨 Lib with UI customizable;
- 🌎 Phone Input Mask according to the selected country.

## Basic Usage

```jsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
  phoneMask,
  PhoneInput,
} from 'react-native-international-phone-number';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState(undefined);
  const [phoneInput, setPhoneInput] = useState('');

  return (
    <View style={{ width: '100%', flex: 1, padding: 24 }}>
      <PhoneInput
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        value={phoneInput}
        onChangeText={(newValue) =>
          setPhoneInput(
            phoneMask(newValue, selectedCountry.callingCode[0])
          )
        }
      />
      <View style={{ marginTop: 10 }}>
        <Text>
          Country:{' '}
          {`${selectedCountry?.name} (${selectedCountry?.cca2})`}
        </Text>
        <Text>
          Phone: {`${selectedCountry?.callingCode[0]} ${phoneInput}`}
        </Text>
      </View>
    </View>
  );
}
```

## Basic Usage - Typescript

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
  phoneMask,
  PhoneInput,
} from 'react-native-international-phone-number';
import { Country } from 'react-native-country-picker-modal';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<
    undefined | Country
  >(undefined);
  const [phoneInput, setPhoneInput] = useState<string>('');

  return (
    <View style={{ width: '100%', flex: 1, padding: 24 }}>
      <PhoneInput
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        value={phoneInput}
        onChangeText={(newValue) =>
          setPhoneInput(
            phoneMask(newValue, selectedCountry?.callingCode[0])
          )
        }
      />
      <View style={{ marginTop: 10 }}>
        <Text>
          Country:{' '}
          {`${selectedCountry?.name} (${selectedCountry?.cca2})`}
        </Text>
        <Text>
          Phone: {`${selectedCountry?.callingCode[0]} ${phoneInput}`}
        </Text>
      </View>
    </View>
  );
}
```

## Advanced Usage - React-Hook-Form and Typescript

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import {
  phoneMask,
  PhoneInput,
} from 'react-native-international-phone-number';
import { Country } from 'react-native-country-picker-modal';
import { Controller, FieldValues, useForm } from 'react-hook-form';

interface FormProps extends FieldValues {
  phoneNumber: string;
}

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<undefined | Country>(undefined);

  const { control, handleSubmit, resetField } = useForm<FormProps>();

  function onSubmit(form: FormProps) {
    Alert.alert(
      'Advanced Result',
      `${selectedCountry?.callingCode[0]} ${form.phoneNumber}`
    );
    resetField('phoneNumber');
  }

  useEffect(()=>{
    resetField('phoneNumber')
  },[selectedCountry])

  return (
    <View style={{ width: '100%', flex: 1, padding: 24 }}>
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            value={value}
            onChangeText={(newValue) =>
              onChange(
                phoneMask(newValue, selectedCountry?.callingCode[0])
              )
            }
          />
        )}
      />
      <Button
        style={{
          width: '100%',
          marginTop: 10,
          backgroundColor: '#90d7ff',
        }}
        onPress={handleSubmit(onSubmit)}
      />
        <Text>Submit</Text>
      </Button>
    </View>
  );
}
```

## Customizing lib

### Dark mode:

```jsx
  <PhoneInput
    ...
    withDarkTheme
  />
```

### Custom Lib Styles:

<div>
  <img src="https://github.com/AstrOOnauta/react-native-international-phone-number/blob/master/images/custom-styles.png">
</div>

```jsx
  <PhoneInput
    ...
    inputStyle={{
      color: '#F3F3F3',
    }}
    containerStyle={{
      backgroundColor: '#575757',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#F3F3F3',
      marginVertical: 16,
    }}
    flagContainerStyle={{
      borderTopLeftRadius: 7,
      borderBottomLeftRadius: 7,
      backgroundColor: '#808080',
      justifyContent: 'center',
    }}
  />
```

## Props

- `value?`: string
- `onChangeText?`: (text: string) => void
- `containerStyle?`: StyleProp<ViewStyle>
- `flagContainerStyle?`: StyleProp<ViewStyle>
- `inputStyle?`: StyleProp<InputStyle>
- `withDarkTheme?`: boolean
- `disabled?`: boolean
- `placeholder?`: string
- `placeholderTextColor?`: string

## Methods

- `phoneMask`: (phoneNumber: string, callingCode: string) => string

## Contributing

- Fork or clone this repository

```bash
  $ git clone https://github.com/AstrOOnauta/react-native-international-phone-number.git
```

- Repair, Update and Enjoy 🛠️🚧⚙️

- Create a new PR to this repository

<br>

<div align = "center">
	<br>
	  Thanks for stopping by! 😁
	<br>
</div>
