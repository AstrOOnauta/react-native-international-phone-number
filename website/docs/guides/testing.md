---
id: testing
title: Testing
description: testID values exposed by PhoneInput and the country selector modal — works with @testing-library/react-native and Maestro.
sidebar_label: Testing
sidebar_position: 6
keywords:
  - react native phone input testing
  - testID
  - testing-library/react-native
  - Maestro
---

# Testing

To target the PhoneInput component in your automated tests, the library exposes `testID` values for every interactive element. These integrate with [@testing-library/react-native](https://callstack.github.io/react-native-testing-library/) and [Maestro](https://maestro.mobile.dev/).

```jsx
const phoneInput = getByTestId('countryPickerPhoneInput');
const flagContainerButton = getByTestId('countryPickerFlagContainerButton');

const countrySelectModalContainer = getByTestId('countrySelectContainer');
const countrySelectModalContent = getByTestId('countrySelectContent');
const countrySelectBackdrop = getByTestId('countrySelectBackdrop');
const countrySelectList = getByTestId('countrySelectList');
const countrySelectSearchInput = getByTestId('countrySelectSearchInput');
const countrySelectItem = getByTestId('countrySelectItem');
const countrySelectCloseButton = getByTestId('countrySelectCloseButton');
const countrySelectAlphabetFilter = getByTestId('countrySelectAlphabetFilter');
```
