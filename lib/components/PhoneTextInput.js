import React, { forwardRef } from 'react';
import { TextInput, View } from 'react-native';

import {
  getPhoneNumberInputAccessibilityHint,
  getPhoneNumberInputAccessibilityLabel,
} from '../utils/getTranslations';
import { getInputStyle } from '../utils/getStyles';

const BIDI_MARK_REGEX =
  /[‎‏؜‪-‮⁦-⁩]/g;

const PhoneTextInput = forwardRef(function PhoneTextInput(
  {
    rest,
    theme,
    phoneInputStyles,
    rtl,
    placeholder,
    placeholderTextColor,
    selectionColor,
    disabled,
    value,
    onChangeText,
    language,
    allowFontScaling,
    accessibilityLabel,
    accessibilityHint,
  },
  ref
) {
  return (
    <View style={{ direction: 'ltr', flex: 1 }}>
      <TextInput
        {...(rest || {})}
        style={[
          getInputStyle(theme, phoneInputStyles?.input),
          rtl !== undefined
            ? { textAlign: rtl ? 'right' : 'left' }
            : null,
        ]}
        placeholder={placeholder}
        placeholderTextColor={
          placeholderTextColor ||
          (theme === 'dark' ? '#CCCCCC' : '#AAAAAA')
        }
        selectionColor={
          selectionColor ||
          (theme === 'dark'
            ? 'rgba(255,255,255, .4)'
            : 'rgba(0 ,0 ,0 , .4)')
        }
        editable={!disabled}
        value={value}
        onChangeText={(text) => onChangeText(text.replace(BIDI_MARK_REGEX, ''))}
        keyboardType="number-pad"
        ref={ref}
        testID="countryPickerPhoneInput"
        accessibilityLabel={
          accessibilityLabel ||
          getPhoneNumberInputAccessibilityLabel(language || 'eng')
        }
        accessibilityHint={
          accessibilityHint ||
          getPhoneNumberInputAccessibilityHint(language || 'eng')
        }
        allowFontScaling={allowFontScaling}
      />
    </View>
  );
});

export default PhoneTextInput;
