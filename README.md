<br>

<div align="center">
  <img src="https://astroonauta.github.io/react-native-international-phone-number/lib/assets/images/preview.png" alt="React Native International Phone Number Input Lib preview">
</div>

<br>

<h1 align="center">React Native International Phone Number Input</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/rn-international-phone-number">
    <img src="https://img.shields.io/npm/v/rn-international-phone-number.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/rn-international-phone-number">
    <img src="https://img.shields.io/npm/dt/rn-international-phone-number.svg?style=flat-square&color=success">
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

<div align="center">
    <a href="https://www.buymeacoffee.com/astroonautadev" target="_blank">
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

- [Installation](#installation)
- [Additional Config to WEB](#additional-config-to-web)
  - [React Native CLI](#using-react-native-cli)
  - [Expo](#using-expo)
- [Discovering the PhoneInput](#discovering-the-phoneinput)
  - [Basic Usage (Class Component)](#basic-usage-class-component)
  - [Basic Usage (Function Component)](#basic-usage-function-component)
  - [Using useRef](#using-useref)
  - [Setting a Default Value](#setting-a-default-value)
  - [Controlled by React Hook Form](#controlled-by-react-hook-form)
  - [Controlled by Formik](#controlled-by-formik)
  - [Controlled by TanStack Form](#controlled-by-tanstack-form)
- [Customizing Lib](#customizing-lib)
- [Lib Props](#component-props-phoneinputprops)
- [Ref Properties](#ref-properties-iphoneinputref)
- [Lib Functions](#functions)
- [Supported languages](#supported-languages)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [Contributing](#contributing)
- [License](#license)

<br>

## Installation

To use this library, make sure you have **rn-international-phone-number** installed along with its required dependency **react-native-safe-area-context**:

```bash
npm install rn-international-phone-number react-native-safe-area-context
```

Since **react-native-safe-area-context** includes native code, you’ll need to install the iOS pods on macOS to complete the linking:

```bash
npx pod-install ios
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
    './node_modules/rn-country-select/lib/assets/fonts',
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
    'TwemojiMozilla': require('./node_modules/rn-country-select/lib/assets/fonts/TwemojiMozilla.woff2'),
  });

  ...
```

> Observation: you need to recompile your project after adding new fonts.

<br>

## Discovering the PhoneInput

- ### Basic Usage (Class Component)

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import PhoneInput, { ICountry } from 'rn-international-phone-number';

type State = {
  phone: string;
  country: ICountry | null;
};

export default class App extends React.Component {
  state: State = {
    phone: '',
    country: null,
  };

  render() {
    return (
      <View style={{ width: '100%', flex: 1, padding: 24 }}>
        <PhoneInput
          value={this.state.phone}
          onChangePhoneNumber={(next) => this.setState({ phone: next })}
          country={this.state.country}
          onChangeCountry={(nextCountry) =>
            this.setState({ country: nextCountry })
          }
        />

        <Text style={{ marginTop: 12 }}>
          {`Country: ${this.state.country?.translations?.eng?.common || '-'}
National: ${this.state.phone}`}
        </Text>
      </View>
    );
  }
}
```

<br>

- ### Basic Usage (Function Component)

```tsx
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import PhoneInput, { ICountry } from 'rn-international-phone-number';

export default function App() {
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState<ICountry | null>(null);

  return (
    <View style={{ width: '100%', flex: 1, padding: 24 }}>
      <PhoneInput
        value={phone}
        onChangePhoneNumber={setPhone}
        country={country}
        onChangeCountry={setCountry}
      />

      <Text style={{ marginTop: 12 }}>
        {`Country: ${country?.translations?.eng?.common || '-'}
National: ${phone}`}
      </Text>
    </View>
  );
}
```

<br>

- ### Using useRef

```tsx
import React, { useRef } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import PhoneInput, { IPhoneInputRef } from 'rn-international-phone-number';

export default function App() {
  const phoneInputRef = useRef<IPhoneInputRef>(null);

  function onSubmit() {
    Alert.alert(
      'Result',
      `Country: ${phoneInputRef.current?.country?.translations?.eng?.common}
National phone number: ${phoneInputRef.current?.nationalPhoneNumber}
National phone number formatted: ${phoneInputRef.current?.nationalPhoneNumberFormatted}
International phone number: ${phoneInputRef.current?.internationalPhoneNumber}
International phone number formatted: ${phoneInputRef.current?.internationalPhoneNumberFormatted}
isValidPhoneNumber: ${phoneInputRef.current?.isValidPhoneNumber}`
    );
  }

  return (
    <View style={{ width: '100%', flex: 1, padding: 24 }}>
      <PhoneInput ref={phoneInputRef} />
      <TouchableOpacity onPress={onSubmit} style={{ marginTop: 12 }}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
```

<br>

- ### Setting a default value

```tsx
import React, { useRef } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import PhoneInput, { IPhoneInputRef } from 'rn-international-phone-number';

export default function App() {
  const phoneInputRef = useRef<IPhoneInputRef>(null);

  function onSubmit() {
    Alert.alert(
      'Result',
      `Country: ${phoneInputRef.current?.country?.translations?.eng?.common}
National phone number: ${phoneInputRef.current?.nationalPhoneNumber}
National phone number formatted: ${phoneInputRef.current?.nationalPhoneNumberFormatted}
International phone number: ${phoneInputRef.current?.internationalPhoneNumber}
International phone number formatted: ${phoneInputRef.current?.internationalPhoneNumberFormatted}
isValidPhoneNumber: ${phoneInputRef.current?.isValidPhoneNumber}`
    );
  }

  return (
    <View style={{ width: '100%', flex: 1, padding: 24 }}>
      <PhoneInput ref={phoneInputRef} defaultPhoneNumber="+12505550199" />
      <TouchableOpacity onPress={onSubmit} style={{ marginTop: 12 }}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
```

> Observations:
>
> 1. Use `defaultPhoneNumber` with the following format: `+(country code)(area code)(number)`.
> 2. If `defaultPhoneNumber` is not E.164-compatible, the component keeps the best possible local formatting.

<br>

- ### Controlled by React Hook Form

```tsx
import React, { useRef } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useForm } from 'react-hook-form';
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
  const { setValue, handleSubmit } = useForm<FormValues>({
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
    <View style={{ width: '100%', flex: 1, padding: 24 }}>
      <PhoneInput ref={phoneInputRef} defaultPhoneNumber="+12505550199" />
      <TouchableOpacity onPress={onPressSubmit} style={{ marginTop: 12 }}>
        <Text>Submit with RHF</Text>
      </TouchableOpacity>
    </View>
  );
}
```

> Observations:
>
> 1. Use `defaultPhoneNumber` with the following format: `+(country code)(area code)(number)`.
> 2. If `defaultPhoneNumber` is not E.164-compatible, the component keeps the best possible local formatting.

<br>

- ### Controlled by Formik

```tsx
import React, { useRef } from 'react';
import { View } from 'react-native';
import { useFormik } from 'formik';
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
    <View style={{ width: '100%', flex: 1, padding: 24 }}>
      <PhoneInput
        ref={phoneInputRef}
        defaultPhoneNumber="+12505550199"
        value={formik.values.phone}
        onChangePhoneNumber={(next) =>
          formik.setFieldValue('phone', next)
        }
      />
    </View>
  );
}
```

<br>

- ### Controlled by TanStack Form

```tsx
import React, { useRef } from 'react';
import { View } from 'react-native';
import { useForm } from '@tanstack/react-form';
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
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <View style={{ width: '100%', flex: 1, padding: 24 }}>
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

| Prop                                   | Type                               | Description                                                               |
| -------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------- |
| `theme`                                | `ITheme`                           | Theme configuration for the component                                     |
| `language`                             | `ILanguage`                        | Language for country names and UI                                         |
| `defaultPhoneNumber`                   | `string`                           | Default phone number value (format: `+(country code)(area code)(number)`) |
| `defaultValue`                         | `string`                           | Deprecated alias of `defaultPhoneNumber`                                  |
| `value`                                | `string`                           | Controlled phone number value                                              |
| `onChangePhoneNumber`                  | `(phoneNumber: string) => void`    | Callback fired when the phone number changes                              |
| `defaultCountry`                       | `ICountryCca2`                     | Default selected country (ISO 3166-1 alpha-2). |
| `country`                              | `ICountry \| null`                 | Controlled selected country                                                |
| `onChangeCountry`                      | `(country: ICountry) => void`      | Callback fired when selected country changes                              |
| `placeholder`                          | `string`                           | Placeholder text for phone input                                          |
| `phoneInputPlaceholderTextColor`       | `string`                           | Color of placeholder text                                                 |
| `phoneInputSelectionColor`             | `string`                           | Color of text selection                                                   |
| `phoneInputStyles`                     | `IPhoneInputStyles`                | Custom styles for phone input component                                   |
| `modalStyles`                          | `ICountrySelectStyles`             | Custom styles for country selection modal                                 |
| `disabled`                             | `boolean`                          | Disable the entire phone input                                            |
| `modalDisabled`                        | `boolean`                          | Disable only the country selection modal                                  |
| `customMask`                           | `string`                           | Custom phone number mask (format like this: `(###) ###-####`)             |
| `visibleCountries`                     | `ICountryCca2[]`                   | Array of country codes to show in modal                                   |
| `hiddenCountries`                      | `ICountryCca2[]`                   | Array of country codes to hide from modal                                 |
| `popularCountries`                     | `ICountryCca2[]`                   | Array of country codes to show in popular section                         |
| `customCaret`                          | `() => ReactNode`                  | Custom dropdown arrow component                                           |
| `customFlag`                           | `(country: ICountry) => ReactNode` | Custom flag component to replace default flag emoji                       |
| `rtl`                                  | `boolean`                          | Enable right-to-left layout                                               |
| `isFullScreen`                         | `boolean`                          | Show modal in full screen mode                                            |
| `modalType`                            | `'bottomSheet' \| 'popup'`         | Type of modal presentation                                                |
| `modalDragHandleIndicatorComponent`    | `() => ReactNode`                  | Custom drag handle indicator component                                    |
| `modalSearchInputPlaceholderTextColor` | `string`                           | Color of modal search placeholder text                                    |
| `modalSearchInputPlaceholder`          | `string`                           | Placeholder text for modal search input                                   |
| `modalSearchInputSelectionColor`       | `string`                           | Color of modal search text selection                                      |
| `modalPopularCountriesTitle`           | `string`                           | Title for popular countries section                                       |
| `modalAllCountriesTitle`               | `string`                           | Title for all countries section                                           |
| `modalSectionTitleComponent`           | `(item: ISectionTitle) => ReactElement` | Custom section title component                                       |
| `modalCountryItemComponent`            | `(item: ICountry) => ReactElement`      | Custom country item component                                        |
| `modalCloseButtonComponent`            | `() => ReactNode`                  | Custom close button component                                             |
| `modalSectionTitleDisabled`            | `boolean`                          | Disable section titles in modal                                           |
| `modalNotFoundCountryMessage`          | `string`                           | Message when no countries found                                           |
| `disabledModalBackdropPress`           | `boolean`                          | Disable modal close on backdrop press                                     |
| `removedModalBackdrop`                 | `boolean`                          | Remove modal backdrop entirely                                            |
| `onModalBackdropPress`                 | `(closeModal: () => void) => void` | Callback when modal backdrop is pressed                                   |
| `onModalRequestClose`                  | `() => void`                       | Callback when modal close is requested                                    |
| `showModalAlphabetFilter`              | `boolean`                          | Show alphabet filter in modal                                             |
| `showModalSearchInput`                 | `boolean`                          | Show search input in modal                                                |
| `showModalCloseButton`                 | `boolean`                          | Show close button in modal                                                |
| `showModalScrollIndicator`             | `boolean`                          | Show scroll indicator in modal                                            |
| `allowFontScaling`                     | `boolean`                          | Allow font scaling based on device settings (default: `true`)             |
| `initialBottomsheetHeight`             | `number \| string`                 | Initial height of the bottom sheet modal                                  |
| `minBottomsheetHeight`                 | `number \| string`                 | Minimum height of the bottom sheet modal                                  |
| `maxBottomsheetHeight`                 | `number \| string`                 | Maximum height of the bottom sheet modal                                  |
| `ref`                                  | `Ref<IPhoneInputRef>`              | Ref to access national/international values, country, isValidPhoneNumber and native input methods |

<br>

## Ref Properties ([IPhoneInputRef](lib/interfaces/phoneInputRef.ts))

The `ref` prop gives imperative access to the component. Below is the full interface:

### Phone Number Values

| Property / Method                    | Type       | Description                                              |
| ------------------------------------ | ---------- | -------------------------------------------------------- |
| `nationalPhoneNumber`                | `string`   | National number without country code (digits only)       |
| `getNationalPhoneNumber()`           | `string`   | Method form of `nationalPhoneNumber`                     |
| `nationalPhoneNumberFormatted`       | `string`   | National number with formatting applied                  |
| `getNationalPhoneNumberFormatted()`  | `string`   | Method form of `nationalPhoneNumberFormatted`            |
| `internationalPhoneNumber`           | `string`   | Country calling code + national number (digits only)     |
| `getInternationalPhoneNumber()`      | `string`   | Method form of `internationalPhoneNumber`                |
| `internationalPhoneNumberFormatted`  | `string`   | Country calling code + national number with formatting   |
| `getInternationalPhoneNumberFormatted()` | `string` | Method form of `internationalPhoneNumberFormatted`      |
| `internationalPhoneNumberLength`     | `number`   | Total digit count of calling code + phone number         |

### Country & Validation

| Property / Method      | Type       | Description                                                  |
| ---------------------- | ---------- | ------------------------------------------------------------ |
| `country`              | `ICountry` | Currently selected country object                            |
| `getCountry()`         | `ICountry` | Method form of `country`                                     |
| `isValidPhoneNumber`   | `boolean`  | Whether the current number is valid for the selected country |
| `props`                | `PhoneInputProps` | All props passed to the component                     |

### TextInput Methods (forwarded)

| Method                  | Description                                  |
| ----------------------- | -------------------------------------------- |
| `focus()`               | Focus the input                              |
| `blur()`                | Blur the input                               |
| `clear()`               | Clear the input                              |
| `isFocused()`           | Returns `true` if the input is focused       |
| `setNativeProps(props)` | Set native props on the underlying TextInput |
| `measure(callback)`     | Measure component dimensions                 |
| `measureInWindow(callback)` | Measure dimensions relative to the window |
| `measureLayout(node, onSuccess, onFail)` | Measure position relative to another node |

> **Tip:** `ref.isValidPhoneNumber` uses the currently selected country automatically. The exported `isValidPhoneNumber(phoneNumber, country)` function requires passing the country explicitly — useful for validation outside the component.

<br>

## Functions

| Function                    | Parameters                                 | Return Type               | Description                                                           |
| --------------------------- | ------------------------------------------ | ------------------------- | --------------------------------------------------------------------- |
| `getAllCountries`                 | `()`                                       | `ICountry[]`              | Returns an array of all available countries                           |
| `getNationalPhoneNumber`          | `(internationalPhoneNumber: string)`                    | `string`                  | Returns the national phone number from an international phone number               |
| `getCountriesByCallingCode`       | `(callingCode: string)`                    | `ICountry[] \| undefined` | Returns countries that match the given calling code                   |
| `getCountryByCca2`                | `(cca2: string)`                           | `ICountry \| undefined`   | Returns a country by its ISO 3166-1 alpha-2 code                      |
| `getCountriesByName`              | `(name: string, language: ILanguage)`      | `ICountry[] \| undefined` | Returns countries that match the given name in the specified language |
| `getCountryByPhoneNumber`         | `(phoneNumber: string)`                    | `ICountry \| undefined`   | Returns the country that matches the given phone number               |
| `isValidPhoneNumber`              | `(phoneNumber: string, country: ICountry)` | `boolean`                 | Validates if a phone number is valid for the given country            |
| `getInternationalPhoneNumberLength` | `(country: ICountry, phoneNumber: string)` | `number`                | Returns total digits of calling code + phone number                   |

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

| Prop                                  | Description                                          |
| ------------------------------------- | ---------------------------------------------------- |
| `accessibilityLabelPhoneInput`        | Accessibility label for the phone input              |
| `accessibilityHintPhoneInput`         | Accessibility hint for the phone input               |
| `accessibilityLabelCountriesButton`   | Accessibility label for the countries button to open modal |
| `accessibilityHintCountriesButton`    | Accessibility hint for the countries button to open modal  |
| `accessibilityLabelBackdrop`          | Accessibility label for the backdrop                 |
| `accessibilityHintBackdrop`           | Accessibility hint for the backdrop                  |
| `accessibilityLabelCloseButton`       | Accessibility label for the close button             |
| `accessibilityHintCloseButton`        | Accessibility hint for the close button              |
| `accessibilityLabelSearchInput`       | Accessibility label for the search input             |
| `accessibilityHintSearchInput`        | Accessibility hint for the search input              |
| `accessibilityLabelCountriesList`     | Accessibility label for the countries list           |
| `accessibilityHintCountriesList`      | Accessibility hint for the countries list            |
| `accessibilityLabelCountryItem`       | Accessibility label for individual country items     |
| `accessibilityHintCountryItem`        | Accessibility hint for individual country items      |
| `accessibilityLabelAlphabetFilter`    | Accessibility label for the alphabet filter list     |
| `accessibilityHintAlphabetFilter`     | Accessibility hint for the alphabet filter list      |
| `accessibilityLabelAlphabetLetter`    | Accessibility label for individual alphabet filter letters |
| `accessibilityHintAlphabetLetter`     | Accessibility hint for individual alphabet filter letters  |

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
