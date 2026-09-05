import React, { forwardRef } from 'react';
import { TextInput, View } from 'react-native';

import {
  getPhoneNumberInputAccessibilityHint,
  getPhoneNumberInputAccessibilityLabel,
} from '../utils/getTranslations.js';
import { getInputStyle } from '../utils/getStyles.js';

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
  // `rest` is spread first, so every prop set below overrides it — which is why each one
  // reads `forwarded` as its own fallback. The rule: a dedicated PhoneInput prop wins
  // over the plain TextInput one, except `style`, which merges last as the escape hatch.
  // `value` and `onChangeText` are owned outright — the component drives the masking.
  const forwarded = rest || {};

  return (
    <View style={{ direction: 'ltr', flex: 1 }}>
      <TextInput
        {...forwarded}
        style={[
          getInputStyle(theme, phoneInputStyles?.input),
          rtl !== undefined
            ? { textAlign: rtl ? 'right' : 'left' }
            : null,
          forwarded.style,
        ]}
        placeholder={placeholder}
        placeholderTextColor={
          placeholderTextColor ||
          forwarded.placeholderTextColor ||
          (theme === 'dark' ? '#CCCCCC' : '#AAAAAA')
        }
        selectionColor={
          selectionColor ||
          forwarded.selectionColor ||
          (theme === 'dark'
            ? 'rgba(255,255,255, .4)'
            : 'rgba(0 ,0 ,0 , .4)')
        }
        // `disabled` stays authoritative; `editable` can only narrow it further.
        editable={!disabled && forwarded.editable !== false}
        value={value}
        onChangeText={(text) => onChangeText(text.replace(BIDI_MARK_REGEX, ''))}
        keyboardType={forwarded.keyboardType || 'number-pad'}
        ref={ref}
        testID={forwarded.testID || 'countryPickerPhoneInput'}
        accessibilityLabel={
          accessibilityLabel ||
          forwarded.accessibilityLabel ||
          getPhoneNumberInputAccessibilityLabel(language)
        }
        accessibilityHint={
          accessibilityHint ||
          forwarded.accessibilityHint ||
          getPhoneNumberInputAccessibilityHint(language)
        }
        allowFontScaling={allowFontScaling}
      />
    </View>
  );
});

export default PhoneTextInput;
