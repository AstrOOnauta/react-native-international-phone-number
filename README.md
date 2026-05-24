<br>

<div align="center">
  <img src="https://astroonauta.github.io/react-native-international-phone-number/img/preview.png" alt="rn-international-phone-number preview - React Native international phone number input, country dial code selector, flag picker with auto phone mask, validation and i18n (33 languages)">
</div>

<br>

<h1 align="center">React Native International Phone Number Input</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/rn-international-phone-number">
    <img src="https://img.shields.io/npm/v/rn-international-phone-number.svg?style=flat-square" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/rn-international-phone-number">
    <img src="https://img.shields.io/npm/dt/rn-international-phone-number.svg?style=flat-square&color=success" alt="npm downloads">
  </a>
  <a href="https://github.com/AstrOOnauta/react-native-international-phone-number">
    <img src="https://img.shields.io/github/stars/AstrOOnauta/react-native-international-phone-number?style=flat-square&color=success" alt="GitHub stars"/>
  </a>
  <a href="https://github.com/AstrOOnauta/react-native-international-phone-number/issues">
    <img src="https://img.shields.io/github/issues/AstrOOnauta/react-native-international-phone-number?style=flat-square&color=blue" alt="GitHub issues"/>
  </a>
  <a href="https://github.com/AstrOOnauta/react-native-international-phone-number/pulls">
    <img src="https://img.shields.io/github/issues-pr/AstrOOnauta/react-native-international-phone-number?style=flat-square&color=blue" alt="GitHub pull requests"/>
  </a>
  <a href="LICENSE.md">
    <img src="https://img.shields.io/:license-isc-yellow.svg?style=flat-square" alt="ISC License"/>
  </a>
</p>

<br>

<div align="center">

### 📚 Full documentation: **<a href="https://astroonauta.github.io/react-native-international-phone-number/">astroonauta.github.io/react-native-international-phone-number</a>**

</div>

<br>

International mobile phone input for **React Native**, **Expo** and **React Native Web**. Country dial code selector, flag picker, auto phone mask, validation, line-type detection, smart paste, and i18n for 33 languages.

## Features

- 🌎 **Phone Input Mask** – Auto-formatting per selected country
- ✅ **Validation** – Optional `onValidationChange` callback
- 📞 **Line Type Detection** – Tell `MOBILE`, `FIXED_LINE`, `TOLL_FREE`, `VOIP` and more apart
- 📋 **Smart Paste** – Paste an E.164 number and the country switches automatically
- 💡 **Dynamic Placeholder** – Country-aware example number as placeholder (`placeholderType="number"`)
- 🪝 **Headless Hook** – `usePhoneInput` exposes all state + setters for fully custom UIs
- 📱 **Cross-Platform** – iOS, Android and Web
- 🧩 **Integration** – React Native CLI & Expo, functional & class components
- 🈶 **i18n** – 33 languages (ISO 639-1 / ISO 639-2)
- ♿ **Accessibility** – Screen reader friendly

## Try it out

[Live demo on Expo Snack →](https://snack.expo.dev/@astroonauta/react-native-international-phone-number)

## Installation

```bash
npm install rn-international-phone-number react-native-safe-area-context
npx pod-install ios
```

For Web (React Native CLI / Expo font setup) and full configuration, see the [Installation guide](https://astroonauta.github.io/react-native-international-phone-number/installation).

## Quick start

```tsx
import React, {useState} from 'react';
import {View} from 'react-native';
import PhoneInput, {ICountry} from 'rn-international-phone-number';

export default function App() {
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState<ICountry | null>(null);

  return (
    <View style={{flex: 1, padding: 24}}>
      <PhoneInput
        value={phone}
        onChangePhoneNumber={setPhone}
        country={country}
        onChangeCountry={setCountry}
      />
    </View>
  );
}
```

## Documentation

| Topic | Link |
| --- | --- |
| Installation | [astroonauta.github.io/.../installation](https://astroonauta.github.io/react-native-international-phone-number/installation) |
| Quick Start | [astroonauta.github.io/.../quick-start](https://astroonauta.github.io/react-native-international-phone-number/quick-start) |
| Props API (51 props) | [astroonauta.github.io/.../api/props](https://astroonauta.github.io/react-native-international-phone-number/api/props) |
| Ref API | [astroonauta.github.io/.../api/ref](https://astroonauta.github.io/react-native-international-phone-number/api/ref) |
| `usePhoneInput` hook | [astroonauta.github.io/.../api/hooks](https://astroonauta.github.io/react-native-international-phone-number/api/hooks) |
| Utility functions | [astroonauta.github.io/.../api/utilities](https://astroonauta.github.io/react-native-international-phone-number/api/utilities) |
| Theming & styles | [astroonauta.github.io/.../guides/theming](https://astroonauta.github.io/react-native-international-phone-number/guides/theming) |
| i18n (33 languages) | [astroonauta.github.io/.../guides/i18n](https://astroonauta.github.io/react-native-international-phone-number/guides/i18n) |
| Accessibility | [astroonauta.github.io/.../guides/accessibility](https://astroonauta.github.io/react-native-international-phone-number/guides/accessibility) |
| Testing | [astroonauta.github.io/.../guides/testing](https://astroonauta.github.io/react-native-international-phone-number/guides/testing) |
| React Hook Form / Formik / TanStack Form | [astroonauta.github.io/.../examples](https://astroonauta.github.io/react-native-international-phone-number/examples/react-hook-form) |

## Contributing

Fork the repo, fix or improve, and open a PR. See the [Contributing guide](https://astroonauta.github.io/react-native-international-phone-number/contributing).

## License

[ISC](LICENSE.md)

<br>

<div align="center">
  <a href="https://www.buymeacoffee.com/astroonautadev" target="_blank">
    <img src="https://survivingmexico.files.wordpress.com/2018/07/button-gif.gif" alt="Buy Me A Coffee - Support rn-international-phone-number" style="height: auto !important;width: 60% !important;">
  </a>
  <br>
  Thanks for stopping by! 😁
</div>
