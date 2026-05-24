import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import {
  getCountriesButtonAccessibilityHint,
  getCountriesButtonAccessibilityLabel,
} from '../utils/getTranslations';
import {
  getCaretStyle,
  getDividerStyle,
  getFlagContainerStyle,
  getFlagStyle,
  getFlagTextStyle,
} from '../utils/getStyles';

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
  const flag = (
    <>
      {(customFlag && currentCountry && customFlag(currentCountry)) || (
        <Text
          style={getFlagStyle(phoneInputStyles?.flag)}
          allowFontScaling={allowFontScaling}
        >
          {currentCountry?.flag || currentCountry?.cca2}
        </Text>
      )}
    </>
  );

  const caret = (
    <>
      {(customCaret && customCaret()) || (
        <View style={phoneInputStyles?.caret}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 4,
            }}
          >
            <View style={getCaretStyle(theme, phoneInputStyles?.caret)} />
          </View>
        </View>
      )}
    </>
  );

  const divider = (
    <View style={getDividerStyle(theme, phoneInputStyles?.divider)} />
  );

  const callingCode = (
    <Text
      style={getFlagTextStyle(theme, phoneInputStyles?.callingCode)}
      allowFontScaling={allowFontScaling}
    >
      {currentCountry?.idd?.root}
    </Text>
  );

  return (
    <TouchableOpacity
      testID="countryPickerFlagContainerButton"
      accessibilityRole="button"
      accessibilityLabel={
        accessibilityLabelCountriesButton ||
        getCountriesButtonAccessibilityLabel(language || 'eng')
      }
      accessibilityHint={
        accessibilityHintCountriesButton ||
        getCountriesButtonAccessibilityHint(language || 'eng')
      }
      activeOpacity={disabled || modalDisabled ? 1 : 0.6}
      onPress={() => (disabled || modalDisabled ? null : onPress())}
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
