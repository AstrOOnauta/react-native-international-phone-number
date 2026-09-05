import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import {
  getCountriesButtonAccessibilityHint,
  getCountriesButtonAccessibilityLabel,
} from '../utils/getTranslations.js';
import {
  getCaretStyle,
  getDividerStyle,
  getFlagContainerStyle,
  getFlagStyle,
  getFlagTextStyle,
} from '../utils/getStyles.js';
import getCallingCode from '../utils/getCallingCode.js';

export default function FlagContainer({
  currentCountry,
  theme,
  language,
  phoneInputStyles,
  customFlag,
  customCaret,
  allowFontScaling,
  disabled,
  modalDisabled,
  accessibilityLabelCountriesButton,
  accessibilityHintCountriesButton,
  rtl,
  onPress,
}) {
  const isDisabled = Boolean(disabled || modalDisabled);

  // `undefined` keeps the default; `null` renders nothing. A falsy check would collapse
  // the two and make the element impossible to hide.
  const withDefault = (custom, fallback) =>
    custom === undefined ? fallback : custom;

  const flag = withDefault(
    customFlag && currentCountry ? customFlag(currentCountry) : undefined,
    <Text
      style={getFlagStyle(phoneInputStyles?.flag)}
      allowFontScaling={allowFontScaling}
    >
      {currentCountry?.flag || currentCountry?.cca2}
    </Text>
  );

  const caret = withDefault(
    customCaret ? customCaret() : undefined,
    // `phoneInputStyles.caret` is a TextStyle; getCaretStyle translates it into the
    // triangle's borders. Do not also spread it raw onto a wrapper — `color` and
    // `fontSize` are not valid View style keys.
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 4,
      }}
    >
      <View style={getCaretStyle(theme, phoneInputStyles?.caret)} />
    </View>
  );

  const divider = (
    <View style={getDividerStyle(theme, phoneInputStyles?.divider)} />
  );

  const callingCode = (
    <Text
      style={getFlagTextStyle(theme, phoneInputStyles?.callingCode)}
      allowFontScaling={allowFontScaling}
    >
      {getCallingCode(currentCountry)}
    </Text>
  );

  return (
    <TouchableOpacity
      testID="countryPickerFlagContainerButton"
      accessibilityRole="button"
      accessibilityLabel={
        accessibilityLabelCountriesButton ||
        getCountriesButtonAccessibilityLabel(language)
      }
      accessibilityHint={
        accessibilityHintCountriesButton ||
        getCountriesButtonAccessibilityHint(language)
      }
      // Without this a screen reader announces a plain button that silently does
      // nothing when the picker is locked.
      disabled={isDisabled}
      accessibilityState={{ disabled: isDisabled }}
      activeOpacity={0.6}
      onPress={onPress}
      style={[
        rtl && {
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
        getFlagContainerStyle(theme, phoneInputStyles?.flagContainer),
      ]}
    >
      {!rtl && flag}
      {!rtl && caret}
      {!rtl && divider}
      {!rtl && callingCode}

      {rtl && callingCode}
      {rtl && divider}
      {rtl && caret}
      {rtl && flag}
    </TouchableOpacity>
  );
}
