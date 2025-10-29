<br>

<div align = "center">
  <img src="https://astroonauta.github.io/react-native-international-phone-number/lib/assets/images/preview.png" alt="React Native International Phone Number Input Lib preview">
</div>

<br>

<h1 align="center">React Native International Phone Number Input</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/react-native-international-phone-number">
    <img src="https://img.shields.io/npm/v/react-native-international-phone-number.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/react-native-international-phone-number">
    <img src="https://img.shields.io/npm/dt/react-native-international-phone-number.svg?style=flat-square&color=success">
  </a>
  <a href="https://github.com/AstrOOnauta/react-native-international-phone-number">
    <img src="https://img.shields.io/github/stars/AstrOOnauta/react-native-international-phone-number?style=flat-square&color=success"/>
  </a>
  <a href="https://github.com/AstrOOnauta/react-native-international-phone-number/issues">
    <img src="https://img.shields.io/github/issues/AstrOOnauta/react-native-international-phone-number?style=flat-square&color=blue"/>
  </a>
  <a href="https://github.com/AstrOOnauta/react-native-international-phone-number/pulls">
    <img src="https://img.shields.io/github/issues-pr/AstrOOnauta/react-native-international-phone-number?style=flat-square&color=blue"/>
  </a>
  <a href="LICENSE.md">
    <img src="https://img.shields.io/:license-isc-yellow.svg?style=flat-square"/>
  </a>
</p>

<br>

<div align = "center">
    <a href="https://www.buymeacoffee.com/astroonauta" target="_blank">
        <img src="https://survivingmexico.files.wordpress.com/2018/07/button-gif.gif" alt="Buy Me A Coffee" style="height: auto !important;width: 60% !important;">
    </a>
</div>

<br>

## Features

- 🌎 **Phone Input Mask** – Auto-formatting per selected country
- ✅ **Validation** - Check phone number;
- 📱 **Cross-Platform** – Works seamlessly on **iOS, Android and Web**;
- 🧩 **Flexible Integration** – Supports both **React Native CLI & Expo**;
- 👨‍💻 **Component Versatility** - Works with **functional & class components**;
- 🎨 **Modern UI** - Custom component with sleek design;
- 🈶 **internationalization** - Supports **32 languages**;
- 🧪 **Test Ready** – Smooth testing integration;
- ♿ **Accessibility** – Accessibility standards to screen readers.

<br>

## Try it out

- [Demo](https://snack.expo.dev/@astroonauta/react-native-international-phone-number)

<br>

## List of Contents

- [Old Versions](#old-versions)
- [Installation](#installation)
- [Additional Config to WEB](#additional-config-to-web)
  - [React Native CLI](#using-react-native-cli)
  - [Expo](#using-expo)
- [Basic Usage](#basic-usage)
  - [With Class Component](#class-component)
  - [With Function Component](#function-component)
  - [With Typescript + defaultValue](#typescript)
- [Intermediate Usage](#intermediate-usage)
  - [Typescript + useRef + defaultValue](#typescript--useref)
- [Advanced Usage](#advanced-usage)
  - [React-Hook-Form + Typescript + defaultValue](#react-hook-form--typescript--default-phone-number-value)
- [Customizing Lib](#customizing-lib)
- [Lib Props](#component-props-phoneinputprops)
- [Lib Functions](#functions)
- [Supported languages](#supported-languages)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [Contributing](#contributing)
- [License](#license)

<br>

## Old Versions

- [Version 0.10.x](https://github.com/AstrOOnauta/react-native-international-phone-number/tree/v0.10.x)
- [Version 0.9.x](https://github.com/AstrOOnauta/react-native-international-phone-number/tree/v0.9.x)
- [Version 0.8.x](https://github.com/AstrOOnauta/react-native-international-phone-number/tree/v0.8.x)
- [Version 0.7.x](https://github.com/AstrOOnauta/react-native-international-phone-number/tree/v0.7.x)
- [Version 0.6.x](https://github.com/AstrOOnauta/react-native-international-phone-number/tree/v0.6.x)
- [Version 0.5.x](https://github.com/AstrOOnauta/react-native-international-phone-number/tree/v0.5.x)
- [Version 0.4.x](https://github.com/AstrOOnauta/react-native-international-phone-number/tree/v0.4.x)

<br>

## Installation

```bash
$ npm i --save react-native-international-phone-number
```

OR

```bash
$ yarn add react-native-international-phone-number
```

## Additional config to WEB

- ### Using React Native CLI:

Create a `react-native.config.js` file at the root of your react-native project with:

```bash
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: [
    './node_modules/react-native-country-select/lib/assets/fonts',
  ],
};
```

Then link the font to your native projects with:

```bash
npx react-native-asset
```

- ### Using Expo:

1. Install [expo-fonts](https://docs.expo.dev/versions/latest/sdk/font/): `npx expo install expo-font`;
2. Initialize the `expo-font`:

```bash
  import { useFonts } from 'expo-font';

  ...

  useFonts({
    'TwemojiMozilla': require('./node_modules/react-native-country-select/lib/assets/fonts/TwemojiMozilla.woff2'),
  });

  ...
```

> Observation: you need to recompile your project after adding new fonts.

<br>

## Basic Usage

- ### Class Component:

```jsx
import React from 'react';
import { View, Text } from 'react-native';
import PhoneInput, { isValidPhoneNumber } from 'react-native-international-phone-number';

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCountry: null,
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
          value={this.state.inputValue}
          onChangePhoneNumber={this.handleInputValue}
          selectedCountry={this.state.selectedCountry}
          onChangeSelectedCountry={this.handleSelectedCountry}
        />
        <View style={{ marginTop: 10 }}>
          <Text>
            Country:{' '}
            {`${this.state.selectedCountry?.translations?.eng?.common} (${this.state.selectedCountry?.cca2})`}
          </Text>
          <Text>
            Phone Number: {`${this.state.selectedCountry?.idd?.root} ${this.state.inputValue}`}
          </Text>
          <Text>
            isValid:{' '}
            {isValidPhoneNumber(this.state.inputValue, this.state.selectedCountry)
              ? 'true'
              : 'false'}
          </Text>
        </View>
      </View>
    );
  }
}
```

- ### Function Component:

```jsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import PhoneInput, {
  isValidPhoneNumber,
} from 'react-native-international-phone-number';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
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
          {`${selectedCountry?.translations?.eng?.common} (${selectedCountry?.cca2})`}
        </Text>
        <Text>
          Phone Number:{' '}
          {`${selectedCountry?.idd?.root} ${inputValue}`}
        </Text>
        <Text>
          isValid:{' '}
          {isValidPhoneNumber(inputValue, selectedCountry)
            ? 'true'
            : 'false'}
        </Text>
      </View>
    </View>
  );
}
```

- ### Typescript + DefaultValue

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import PhoneInput, {
  ICountry,
  isValidPhoneNumber,
} from 'react-native-international-phone-number';

export default function App() {
  const [selectedCountry, setSelectedCountry] =
    useState<null | ICountry>(null);
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
          {`${selectedCountry?.translations?.eng?.common} (${selectedCountry?.cca2})`}
        </Text>
        <Text>
          Phone Number:{' '}
          {`${selectedCountry?.idd?.root} ${inputValue}`}
        </Text>
        <Text>
          isValid:{' '}
          {isValidPhoneNumber(inputValue, selectedCountry)
            ? 'true'
            : 'false'}
        </Text>
      </View>
    </View>
  );
}
```

<br>

## Intermediate Usage

- ### Typescript + useRef + defaultValue

```tsx
import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import PhoneInput, {
  ICountry,
  IPhoneInputRef,
} from 'react-native-international-phone-number';

export default function App() {
  const phoneInputRef = useRef<IPhoneInputRef>(null);

  function onSubmitRef() {
    Alert.alert(
      'Intermediate Result',
      `Country: ${inputRef.current?.selectedCountry?.translations?.eng?.common} \nPhone Number: ${inputRef.current?.fullPhoneNumber} \nisValid: ${inputRef.current?.isValid}`
    );
  }

  return (
    <View style={{ width: '100%', flex: 1, padding: 24 }}>
      <PhoneInput ref={phoneInputRef} defaultValue="+12505550199" />
      <TouchableOpacity
        style={{
          width: '100%',
          paddingVertical: 12,
          backgroundColor: '#2196F3',
          borderRadius: 4,
          marginTop: 10,
        }}
        onPress={onSubmit}
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

<br>

## Advanced Usage

- ### React-Hook-Form + Typescript + defaultValue

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import PhoneInput, {
  ICountry,
  isValidPhoneNumber,
} from 'react-native-international-phone-number';
import { Controller, FieldValues } from 'react-hook-form';

interface FormProps extends FieldValues {
  phoneNumber: string;
}

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<
    undefined | ICountry
  >(undefined);

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }

  function onSubmit(form: FormProps) {
    const phoneNumber = `${selectedCountry?.idd?.root} ${form.phoneNumber}`;
    const isValid = isValidPhoneNumber(
      form.phoneNumber,
      selectedCountry as ICountry
    );

    Alert.alert(
      'Advanced Result',
      `Country: ${selectedCountry?.translations?.eng?.common} \nPhone Number: ${phoneNumber} \nisValid: ${isValid}`
    );
  }

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

### PhoneInput Styles ([phoneInputStyles](lib/interfaces/phoneInputStyles.ts))

| Property        | Type      | Description                 |
| --------------- | --------- | --------------------------- |
| `container`     | ViewStyle | Main input container        |
| `flagContainer` | ViewStyle | Flag and dropdown container |
| `flag`          | TextStyle | Flag emoji styling          |
| `caret`         | TextStyle | Dropdown arrow              |
| `divider`       | ViewStyle | Separator line              |
| `callingCode`   | TextStyle | Country calling code        |
| `input`         | TextStyle | Phone number input          |

### Modal Styles ([modalStyles](https://github.com/AstrOOnauta/react-native-country-select/blob/main/lib/interface/countrySelectStyles.ts))

| Property                     | Type      | Description               |
| ---------------------------- | --------- | ------------------------- |
| `backdrop`                   | ViewStyle | Modal background overlay  |
| `container`                  | ViewStyle | Modal main container      |
| `content`                    | ViewStyle | Modal content area        |
| `dragHandleContainer`        | ViewStyle | Drag Handle area          |
| `dragHandleIndicator`        | ViewStyle | Drag Handle Indicator     |
| `searchContainer`            | ViewStyle | Search input wrapper      |
| `searchInput`                | TextStyle | Search input field        |
| `list`                       | ViewStyle | Countries list container  |
| `countryItem`                | ViewStyle | Individual country row    |
| `flag`                       | TextStyle | Country flag in list      |
| `countryInfo`                | ViewStyle | Country details container |
| `callingCode`                | TextStyle | Calling code in list      |
| `countryName`                | TextStyle | Country name in list      |
| `sectionTitle`               | TextStyle | Section headers           |
| `closeButton`                | ViewStyle | Close button container    |
| `closeButtonText`            | TextStyle | Close button text         |
| `countryNotFoundContainer`   | ViewStyle | No results container      |
| `countryNotFoundMessage`     | TextStyle | No results message        |
| `alphabetContainer`          | ViewStyle | Alphabet filter container |
| `alphabetLetter`             | ViewStyle | Alphabet letter item      |
| `alphabetLetterText`         | TextStyle | Alphabet letter text      |
| `alphabetLetterActive`       | ViewStyle | Active letter state       |
| `alphabetLetterDisabled`     | ViewStyle | Disabled letter state     |
| `alphabetLetterTextActive`   | TextStyle | Active letter text        |
| `alphabetLetterTextDisabled` | TextStyle | Disabled letter text      |

<br>

## Component Props ([PhoneInputProps](lib/interfaces/phoneInputProps.ts))

| Prop                                   | Type                            | Description                                                               |
| -------------------------------------- | ------------------------------- | ------------------------------------------------------------------------- |
| `theme`                                | `ITheme`                        | Theme configuration for the component                                     |
| `language`                             | `ILanguage`                     | Language for country names and UI                                         |
| `defaultValue`                         | `string`                        | Default phone number value (format: `+(country code)(area code)(number)`) |
| `value`                                | `string`                        | Controlled phone number value                                             |
| `onChangePhoneNumber`                  | `(phoneNumber: string) => void` | Callback when phone number changes                                        |
| `defaultCountry`                       | `ICountryCca2`                  | Default selected country (ISO 3166-1 alpha-2)                             |
| `selectedCountry`                      | `ICountry`                      | Currently selected country object                                         |
| `onChangeSelectedCountry`              | `(country: ICountry) => void`   | Callback when country selection changes                                   |
| `placeholder`                          | `string`                        | Placeholder text for phone input                                          |
| `phoneInputPlaceholderTextColor`       | `string`                        | Color of placeholder text                                                 |
| `phoneInputSelectionColor`             | `string`                        | Color of text selection                                                   |
| `phoneInputStyles`                     | `IPhoneInputStyles`             | Custom styles for phone input component                                   |
| `modalStyles`                          | `ICountrySelectStyles`          | Custom styles for country selection modal                                 |
| `disabled`                             | `boolean`                       | Disable the entire phone input                                            |
| `modalDisabled`                        | `boolean`                       | Disable only the country selection modal                                  |
| `customMask`                           | `string`                        | Custom phone number mask (format like this: `(###) ###-####`)             |
| `visibleCountries`                     | `ICountryCca2[]`                | Array of country codes to show in modal                                   |
| `hiddenCountries`                      | `ICountryCca2[]`                | Array of country codes to hide from modal                                 |
| `popularCountries`                     | `ICountryCca2[]`                | Array of country codes to show in popular section                         |
| `customCaret`                          | `() => ReactNode`               | Custom dropdown arrow component                                           |
| `rtl`                                  | `boolean`                       | Enable right-to-left layout                                               |
| `isFullScreen`                         | `boolean`                       | Show modal in full screen mode                                            |
| `modalType`                            | `'bottomSheet' \| 'popup'`      | Type of modal presentation                                                |
| `modalDragHandleIndicatorComponent`    | `() => ReactNode`               | Custom drag handle indicator component                                    |
| `modalSearchInputPlaceholderTextColor` | `string`                        | Color of modal search placeholder text                                    |
| `modalSearchInputPlaceholder`          | `string`                        | Placeholder text for modal search input                                   |
| `modalSearchInputSelectionColor`       | `string`                        | Color of modal search text selection                                      |
| `modalPopularCountriesTitle`           | `string`                        | Title for popular countries section                                       |
| `modalAllCountriesTitle`               | `string`                        | Title for all countries section                                           |
| `modalSectionTitleComponent`           | `() => ReactNode`               | Custom section title component                                            |
| `modalCountryItemComponent`            | `() => ReactNode`               | Custom country item component                                             |
| `modalCloseButtonComponent`            | `() => ReactNode`               | Custom close button component                                             |
| `modalSectionTitleDisabled`            | `boolean`                       | Disable section titles in modal                                           |
| `modalNotFoundCountryMessage`          | `string`                        | Message when no countries found                                           |
| `disabledModalBackdropPress`           | `boolean`                       | Disable modal close on backdrop press                                     |
| `removedModalBackdrop`                 | `boolean`                       | Remove modal backdrop entirely                                            |
| `onModalBackdropPress`                 | `() => void`                    | Callback when modal backdrop is pressed                                   |
| `onModalRequestClose`                  | `() => void`                    | Callback when modal close is requested                                    |
| `showModalAlphabetFilter`              | `boolean`                       | Show alphabet filter in modal                                             |
| `showModalSearchInput`                 | `boolean`                       | Show search input in modal                                                |
| `showModalCloseButton`                 | `boolean`                       | Show close button in modal                                                |
| `showModalScrollIndicator`             | `boolean`                       | Show scroll indicator in modal                                            |
| `allowFontScaling`                     | `boolean`                       | Allow font scaling based on device settings (default: `true`)             |
| `initialBottomsheetHeight`             | `number \| string`              | Initial height of the bottom sheet modal                                  |
| `minBottomsheetHeight`                 | `number \| string`              | Minimum height of the bottom sheet modal                                  |
| `maxBottomsheetHeight`                 | `number \| string`              | Maximum height of the bottom sheet modal                                  |
| `ref`                                  | `Ref<IPhoneInputRef>`           | Ref to access component methods                                           |

<br>

## Functions

| Function                    | Parameters                                 | Return Type               | Description                                                           |
| --------------------------- | ------------------------------------------ | ------------------------- | --------------------------------------------------------------------- |
| `getAllCountries`           | `()`                                       | `ICountry[]`              | Returns an array of all available countries                           |
| `getCountriesByCallingCode` | `(callingCode: string)`                    | `ICountry[] \| undefined` | Returns countries that match the given calling code                   |
| `getCountryByCca2`          | `(cca2: string)`                           | `ICountry \| undefined`   | Returns a country by its ISO 3166-1 alpha-2 code                      |
| `getCountriesByName`        | `(name: string, language: ILanguage)`      | `ICountry[] \| undefined` | Returns countries that match the given name in the specified language |
| `getCountryByPhoneNumber`   | `(phoneNumber: string)`                    | `ICountry \| undefined`   | Returns the country that matches the given phone number               |
| `isValidPhoneNumber`        | `(phoneNumber: string, country: ICountry)` | `boolean`                 | Validates if a phone number is valid for the given country            |
| `getPhoneNumberLength`      | `(country: ICountry, phoneNumber: string)` | `number`                  | Returns total digits of calling code + phone number                   |

</br>

## Supported languages

The `language` prop supports the following values:

| Code       | Language            |
| ---------- | ------------------- |
| `ara`      | Arabic              |
| `bel`      | Belarusian          |
| `bre`      | Breton              |
| `bul`      | Bulgarian           |
| `ces`      | Czech               |
| `deu`      | German              |
| `ell`      | Greek               |
| `eng`      | English             |
| `est`      | Estonian            |
| `fin`      | Finnish             |
| `fra`      | French              |
| `heb`      | Hebrew              |
| `hrv`      | Croatian            |
| `hun`      | Hungarian           |
| `ita`      | Italian             |
| `jpn`      | Japanese            |
| `kor`      | Korean              |
| `nld`      | Dutch               |
| `per`      | Persian             |
| `pol`      | Polish              |
| `por`      | Portuguese          |
| `ron`      | Romanian            |
| `rus`      | Russian             |
| `slk`      | Slovak              |
| `spa`      | Spanish             |
| `srp`      | Serbian             |
| `swe`      | Swedish             |
| `tur`      | Turkish             |
| `ukr`      | Ukrainian           |
| `urd`      | Urdu                |
| `zho`      | Chinese             |
| `zho-Hans` | Simplified Chinese  |
| `zho-Hant` | Traditional Chinese |

<br>

## Testing

When utilizing this package, you may need to target the PhoneInput component in your automated tests. To facilitate this, we provide a testID props for the PhoneInput component. The testID can be integrated with popular testing libraries such as @testing-library/react-native or Maestro. This enables you to efficiently locate and interact with PhoneInput elements within your tests, ensuring a robust and reliable testing experience.

```jsx
const phoneInput = getByTestId('countryPickerPhoneInput');
const flagContainerButton = getByTestId(
  'countryPickerFlagContainerButton'
);
const countrySelectModalContainer = getByTestId(
  'countrySelectContainer'
);
const countrySelectModalContent = getByTestId('countrySelectContent');
const countrySelectBackdrop = getByTestId('countrySelectBackdrop');
const countrySelectList = getByTestId('countrySelectList');
const countrySelectSearchInput = getByTestId(
  'countrySelectSearchInput'
);
const countrySelectItem = getByTestId('countrySelectItem');
const countrySelectCloseButton = getByTestId(
  'countrySelectCloseButton'
);
const countrySelectAlphabetFilter = getByTestId(
  'countrySelectAlphabetFilter'
);
```

<br>

## Accessibility

Ensure your app is inclusive and usable by everyone by leveraging built-in React Native accessibility features. The accessibility props are covered and customizable by this package.

### Custom Accessibility Props Available

- `accessibilityLabelPhoneInput`: Accessibility label for the phone input;
- `accessibilityHintPhoneInput`: Accessibility hint for the phone input;
- `accessibilityLabelCountriesButton`: Accessibility label for the countries button to open modal;
- `accessibilityHintCountriesButton`: Accessibility hint for the countries button to open modal;
- `accessibilityLabelBackdrop`: Accessibility label for the backdrop;
- `accessibilityHintBackdrop`: Accessibility hint for the backdrop;
- `accessibilityLabelCloseButton`: Accessibility label for the close button;
- `accessibilityHintCloseButton`: Accessibility hint for the close button;
- `accessibilityLabelSearchInput`: Accessibility label for the search input;
- `accessibilityHintSearchInput`: Accessibility hint for the search input;
- `accessibilityLabelCountriesList`: Accessibility label for the countries list;
- `accessibilityHintCountriesList`: Accessibility hint for the countries list;
- `accessibilityLabelCountryItem`: Accessibility label for individual country items;
- `accessibilityHintCountryItem`: Accessibility hint for individual country;
- `accessibilityLabelAlphabetFilter`: Accessibility label for alphabet filter list;
- `accessibilityHintAlphabetFilter`: Accessibility hint for alphabet filter list;
- `accessibilityLabelAlphabetLetter`: Accessibility label for individual alphabet filter letter;
- `accessibilityHintAlphabetLetter`: Accessibility hint for individual alphabet filter letter.

<br>

## Contributing

- Fork or clone this repository

```bash
  $ git clone https://github.com/AstrOOnauta/react-native-international-phone-number.git
```

- Repair, Update and Enjoy 🛠️🚧⚙️

- Create a new PR to this repository

<br>

## License

[ISC](LICENSE.md)

<br>

<div align = "center">
	<br>
	  Thanks for stopping by! 😁
	<br>
</div>
