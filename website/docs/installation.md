---
id: installation
title: Installation
description: How to install rn-international-phone-number in React Native CLI, Expo, and React Native Web projects.
sidebar_position: 2
keywords:
  - install rn-international-phone-number
  - react native phone input install
  - expo phone input setup
---

# Installation

## Install the package

Install `rn-international-phone-number` along with its required peer `react-native-safe-area-context`:

```bash
npm install rn-international-phone-number react-native-safe-area-context
```

Since `react-native-safe-area-context` ships native code, install the iOS pods on macOS to complete linking:

```bash
npx pod-install ios
```

:::info Why `react-native-safe-area-context`?
The country selector modal is rendered by
[`rn-country-select`](https://github.com/AstrOOnauta/react-native-country-select), which
uses it. You do **not** need to add a `SafeAreaProvider` yourself — the modal ships its
own.
:::

## Additional config for Web

### Using React Native CLI

Create a `react-native.config.js` file at the root of your project:

```js
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

Then link the font to your native projects:

```bash
npx react-native-asset
```

### Using Expo

1. Install [`expo-font`](https://docs.expo.dev/versions/latest/sdk/font/):

   ```bash
   npx expo install expo-font
   ```

2. Load the font at app start:

   ```tsx
   import {useFonts} from 'expo-font';

   useFonts({
     TwemojiMozilla: require('./node_modules/rn-country-select/lib/assets/fonts/TwemojiMozilla.woff2'),
   });
   ```

:::note
Recompile your project after adding new fonts.
:::

## Next

- [Quick start](./quick-start.md) — minimal working example
- [Props API](./api/props.md)
- [FAQ & Troubleshooting](./faq.mdx) — flags rendering as `BR` instead of 🇧🇷, Expo Go, E.164
- [Migrating from `react-native-international-phone-number`](./migration.md)
