<div align = "center">
  <img src="https://github.com/guiliuri13/CO-react-native-international-phone-number/blob/master/gif/preview.gif">
</div>

<br>

<h1 align="center">React Native International Phone Number Input</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/react-native-international-phone-number">
    <img src="https://img.shields.io/npm/v/react-native-international-phone-number.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/react-native-international-phone-number">
    <img src="https://img.shields.io/npm/dm/react-native-international-phone-number.svg?style=flat-square&color=success">
  </a>
  <a href="https://github.com/guiliuri13/CO-react-native-international-phone-number">
    <img src="https://img.shields.io/github/stars/guiliuri13/CO-react-native-international-phone-number?style=flat-square&color=success"/>
  </a>
  <a href="https://github.com/guiliuri13/CO-react-native-international-phone-number/issues">
    <img src="https://img.shields.io/github/issues/guiliuri13/CO-react-native-international-phone-number?style=flat-square&color=blue"/>
  </a>
  <a href="https://github.com/guiliuri13/CO-react-native-international-phone-number/pulls">
    <img src="https://img.shields.io/github/issues-pr/guiliuri13/CO-react-native-international-phone-number?style=flat-square&color=blue"/>
  </a>
  <a href="https://github.com/guiliuri13/CO-react-native-international-phone-number/blob/master/LICENSE.md">
    <img src="https://img.shields.io/:license-isc-yellow.svg?style=flat-square"/>
  </a>
</p>

<br>

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Basic Usage](#basic-usage)
  - With Function Component
  - With Class Component
- [Basic Usage - Typescript](#basic-usage---typescript)
- [Intermediate Usage - Typescrypt + Default Phone Number Value](#intermediate-usage---typescript--default-phone-number-value)
- [Advanced Usage - React Hook Form + Typescript + Default Phone Number Value](#advanced-usage---react-hook-form--typescript--default-phone-number-value)
- [Customizing Lib](#customizing-lib)
  - Theme Mode: Light (default) and Dark
  - Custom Lib Styles
  - Disabled Mode
  - Custom Disabled Mode Style
- [Lib Props](#props)
- [Contributing](#contributing)
- [License](#license)

<br>

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

<br>

## Features

- 📱 Works with iOS, Android (Cross-platform) and Expo;
- 🎨 Lib with UI customizable;
- 🌎 Phone Input Mask according to the selected country;
- 👨‍💻 Functional and class component support.

<br>

## Basic Usage

- Function Component:

```jsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { PhoneInput } from 'react-native-international-phone-number';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState(undefined);
  const [inputValue, setInputValue] = useState('');

  function handleInputValue(phoneNumber) {
    setInputValue(phoneNumber);
  }

  function handleSelectedCountry(country) {
    setSelectedCountry(country);
  }

  return (
    <View style={{ width: '100%', flex: 1, padding: 24 }}>
      <PhoneInput
        value={inputValue}
        onChangePhoneNumber={handleInputValue}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={handleSelectedCountry}
      />
      <View style={{ marginTop: 10 }}>
        <Text>
          Country:{' '}
          {`${selectedCountry?.name} (${selectedCountry?.cca2})`}
        </Text>
        <Text>
          Phone Number:{' '}
          {`${selectedCountry?.callingCode} ${inputValue}`}
        </Text>
      </View>
    </View>
  );
}
```

- Class Component:

```jsx
import React from 'react';
import { View, Text } from 'react-native';
import { PhoneInput } from 'react-native-international-phone-number';

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCountry: undefined,
      inputValue: ''
    }
  }

  function handleSelectedCountry(country) {
    this.setState({
      selectedCountry: country
    })
  }

  function handleInputValue(phoneNumber) {
    this.setState({
      inputValue: phoneNumber
    })
  }

  render(){
    return (
      <View style={{ width: '100%', flex: 1, padding: 24 }}>
        <PhoneInput
          value={this.inputValue}
          onChangePhoneNumber={this.handleInputValue}
          selectedCountry={this.selectedCountry}
          onChangeSelectedCountry={this.handleSelectedCountry}
        />
        <View style={{ marginTop: 10 }}>
          <Text>
            Country:{' '}
            {`${this.selectedCountry?.name} (${this.selectedCountry?.cca2})`}
          </Text>
          <Text>
            Phone Number: {`${this.selectedCountry?.callingCode} ${this.inputValue}`}
          </Text>
        </View>
      </View>
    );
  }
}
```

<br>

## Basic Usage - Typescript

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
  PhoneInput,
  ICountry,
} from 'react-native-international-phone-number';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<
    undefined | ICountry
  >(undefined);
  const [inputValue, setInputValue] = useState<string>('');

  function handleInputValue(phoneNumber: string) {
    setInputValue(phoneNumber);
  }

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }

  return (
    <View style={{ width: '100%', flex: 1, padding: 24 }}>
      <PhoneInput
        value={inputValue}
        onChangePhoneNumber={handleInputValue}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={handleSelectedCountry}
      />
      <View style={{ marginTop: 10 }}>
        <Text>
          Country:{' '}
          {`${selectedCountry?.name} (${selectedCountry?.cca2})`}
        </Text>
        <Text>
          Phone Number:{' '}
          {`${selectedCountry?.callingCode} ${inputValue}`}
        </Text>
      </View>
    </View>
  );
}
```

<br>

## Intermediate Usage - Typescript + Default Phone Number Value

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
  PhoneInput,
  ICountry,
} from 'react-native-international-phone-number';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<
    undefined | ICountry
  >(undefined);
  const [inputValue, setInputValue] = useState<string>('');

  function handleInputValue(phoneNumber: string) {
    setInputValue(phoneNumber);
  }

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }

  return (
    <View style={{ width: '100%', flex: 1, padding: 24 }}>
      <PhoneInput
        defaultValue="+12505550199"
        value={inputValue}
        onChangePhoneNumber={handleInputValue}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={handleSelectedCountry}
      />
      <View style={{ marginTop: 10 }}>
        <Text>
          Country:{' '}
          {`${selectedCountry?.name} (${selectedCountry?.cca2})`}
        </Text>
        <Text>
          Phone Number:{' '}
          {`${selectedCountry?.callingCode} ${inputValue}`}
        </Text>
      </View>
    </View>
  );
}
```

> Observations:
>
> 1. You need to use a default value with the following format: `+(country callling code)(area code)(number phone)`
> 2. The lib has the mechanism to set the flag and mask of the supplied `defaultValue`. However, if the supplied `defaultValue` does not match any international standard, the `input mask of the defaultValue` will be set to "BR" (please make sure that the default value is in the format mentioned above).

<br>

## Advanced Usage - React-Hook-Form + Typescript + Default Phone Number Value

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import {
  PhoneInput,
  ICountry,
} from 'react-native-international-phone-number';
import { Controller, FieldValues, useForm } from 'react-hook-form';

interface FormProps extends FieldValues {
  phoneNumber: string;
}

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<
    undefined | ICountry
  >(undefined);

  const { control, handleSubmit, setValue, watch } =
    useForm<FormProps>();

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }

  function onSubmit(form: FormProps) {
    Alert.alert(
      'Advanced Result',
      `${selectedCountry?.callingCode} ${form.phoneNumber}`
    );
  }

  useEffect(() => {
    const watchPhoneNumber = watch('phoneNumber');

    setValue('phoneNumber', watchPhoneNumber);
  }, []);

  return (
    <View style={{ width: '100%', flex: 1, padding: 24 }}>
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            defaultValue="+12505550199"
            value={value}
            onChangePhoneNumber={onChange}
            selectedCountry={selectedCountry}
            onChangeSelectedCountry={handleSelectedCountry}
          />
        )}
      />
      <TouchableOpacity
        style={{
          width: '100%',
          paddingVertical: 12,
          backgroundColor: '#2196F3',
          borderRadius: 4,
        }}
        onPress={handleSubmit(onSubmit)}
      >
        <Text
          style={{
            color: '#F3F3F3',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

> Observations:
>
> 1. You need to use a default value with the following format: `+(country callling code)(area code)(number phone)`
> 2. The lib has the mechanism to set the flag and mask of the supplied `defaultValue`. However, if the supplied `defaultValue` does not match any international standard, the `input mask of the defaultValue` will be set to "BR" (please make sure that the default value is in the format mentioned above).

<br>

## Customizing lib

- Dark Mode:

```jsx
  <PhoneInput
    ...
    withDarkTheme
  />
```

- Custom Lib Styles:

<div>
  <img src="https://github.com/guiliuri13/CO-react-native-international-phone-number/blob/master/images/custom-styles.png">
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

- Disabled Mode:

```jsx
  <PhoneInput
    ...
    disabled
  />
```

- Custom Disabled Mode Style:

```jsx
  ...
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  ...
  <PhoneInput
    ...
    containerStyle={ isDisabled ? { backgroundColor: 'yellow' } : {} }
    disabled={isDisabled}
  />
  ...
```

</br>

## Props

- `defaultValue?:` string;
- `value:` string;
- `onChangePhoneNumber:` (phoneNumber: string) => void;
- `selectedCountry:` undefined | ICountry;
- `onChangeSelectedCountry:` (country: ICountry) => void;
- `disabled?:` boolean;
- `withDarkTheme?:` boolean;
- `containerStyle?:` StyleProp<[ViewStyle](https://reactnative.dev/docs/view-style-props)>;
- `flagContainerStyle?:` StyleProp<[ViewStyle](https://reactnative.dev/docs/view-style-props)>;
- `inputStyle?:` StyleProp<[TextStyle](https://reactnative.dev/docs/text-style-props)>;

</br>

## Contributing

- Fork or clone this repository

```bash
  $ git clone https://github.com/guiliuri13/CO-react-native-international-phone-number.git
```

- Repair, Update and Enjoy 🛠️🚧⚙️

- Create a new PR to this repository

<br>

## License

[ISC](https://github.com/guiliuri13/CO-react-native-international-phone-number/blob/master/LICENSE.md)

<br>

<div align = "center">
	<br>
	  Thanks for stopping by! 😁
	<br>
</div>
