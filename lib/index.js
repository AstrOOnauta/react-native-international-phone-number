import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
} from 'react-native';
import CountryPicker, {
  DARK_THEME,
  DEFAULT_THEME,
} from 'react-native-country-picker-modal';

import getMatchingCountry from './utils/getMatchingCountry';
import phoneMask from './utils/inputMask';

export function PhoneInput({
  placeholder,
  placeholderTextColor,
  selectionColor,
  containerStyle,
  flagContainerStyle,
  inputStyle,
  withDarkTheme,
  disabled,
  defaultValue,
  onChangePhoneNumber,
  selectedCountry,
  onChangeSelectedCountry,
  ...rest
}) {
  const [containerWidth, setContainerWidth] = useState(
    Dimensions.get('window').width
  );
  const [defaultCca2, setDefaultCca2] = useState('BR');

  function onSelect(country) {
    onChangePhoneNumber('');
    if (onChangeSelectedCountry) {
      onChangeSelectedCountry({
        name: country.name,
        cca2: country.cca2,
        flag: country.flag,
        callingCode: `+${country.callingCode[0]}`,
      });
    }
  }

  function onChangeText(phoneNumber, callingCode) {
    const res = phoneMask(
      phoneNumber,
      callingCode ? callingCode : selectedCountry?.callingCode,
      selectedCountry?.cca2
    );

    onChangePhoneNumber(res);
  }

  useEffect(() => {
    onChangePhoneNumber('');
    if (defaultValue) {
      const matchingCountry = getMatchingCountry(defaultValue);

      if (matchingCountry) {
        setDefaultCca2(matchingCountry.cca2);

        onChangeSelectedCountry({
          name: matchingCountry.name,
          cca2: matchingCountry.cca2,
          flag: matchingCountry.flag,
          callingCode: matchingCountry.callingCode,
        });
      } else {
        onChangeSelectedCountry({
          callingCode: '+55',
          cca2: 'BR',
          flag: 'flag-br',
          name: 'Brazil',
        });

        onChangeText(defaultValue, '+55');
      }
    } else {
      if (!selectedCountry) {
        onChangeSelectedCountry({
          callingCode: '+55',
          cca2: 'BR',
          flag: 'flag-br',
          name: 'Brazil',
        });
      }
    }
  }, [defaultValue]);

  useEffect(() => {
    if (
      defaultValue &&
      selectedCountry &&
      selectedCountry.cca2 === defaultCca2 &&
      !rest.value
    ) {
      const callingCode = selectedCountry.callingCode;

      let phoneNumber = defaultValue;

      if (
        callingCode === '+1' &&
        selectedCountry.cca2 !== 'CA' &&
        selectedCountry.cca2 !== 'US'
      ) {
        phoneNumber = defaultValue
          .replace(/\s/g, '')
          .substring(
            callingCode.length + 3,
            defaultValue.replace(/\D/g, '').length +
              callingCode.length
          );
      } else if (
        callingCode === '+39' &&
        selectedCountry.cca2 === 'VA'
      ) {
        phoneNumber = defaultValue
          .replace(/\s/g, '')
          .substring(
            callingCode.length + 5,
            defaultValue.replace(/\D/g, '').length +
              callingCode.length
          );
      } else {
        phoneNumber = defaultValue
          .replace(/\s/g, '')
          .substring(
            callingCode.length,
            defaultValue.replace(/\D/g, '').length +
              callingCode.length
          );
      }
      onChangeText(phoneNumber, callingCode);
    }
  }, [selectedCountry]);

  return (
    <View
      style={[
        withDarkTheme
          ? {
              ...styles.darkContainer,
              backgroundColor: disabled
                ? '#858585'
                : styles.darkContainer.backgroundColor,
            }
          : {
              ...styles.lightContainer,
              backgroundColor: disabled
                ? '#E3E3E3'
                : styles.lightContainer.backgroundColor,
            },
        containerStyle ? containerStyle : {},
      ]}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <CountryPicker
        containerButtonStyle={[
          flagContainerBase,
          selectedCountry?.cca2 === 'VA' ? { width: 140 } : {},
          flagContainerStyle ? flagContainerStyle : {},
        ]}
        onSelect={onSelect}
        withFilter
        withAlphaFilter
        withCallingCode
        withCallingCodeButton
        theme={withDarkTheme ? DARK_THEME : DEFAULT_THEME}
        countryCode={
          selectedCountry ? selectedCountry.cca2 : defaultCca2
        }
        modalProps={disabled ? { visible: false } : {}}
      />
      <TextInput
        style={[
          withDarkTheme ? styles.darkInput : styles.lightInput,
          { width: containerWidth - 100 },
          inputStyle ? inputStyle : {},
        ]}
        placeholder={
          placeholder ? placeholder : 'Insert your phone number'
        }
        placeholderTextColor={
          placeholderTextColor
            ? placeholderTextColor
            : withDarkTheme
            ? '#CCCCCC'
            : '#DDDDDD'
        }
        selectionColor={
          selectionColor
            ? selectionColor
            : withDarkTheme
            ? 'rgba(255,255,255, .4)'
            : 'rgba(0 ,0 ,0 , .4)'
        }
        editable={!disabled}
        onChangeText={onChangeText}
        keyboardType="numeric"
        {...rest}
      />
    </View>
  );
}

export { getMatchingCountry } from "./utils/getMatchingCountry"
export { phoneMask } from "./utils/inputMask"

const containerBase = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 8,
  width: '100%',
  height: 45,
};

const flagContainerBase = {
  width: 100,
  height: '99%',
  alignItems: 'center',
  justifyContent: 'center',
};

const inputBase = {
  width: Dimensions.get('window').width - 140,
  paddingVertical: 8,
  paddingHorizontal: 16,
  fontSize: 16,
};

const styles = StyleSheet.create({
  lightContainer: {
    ...containerBase,
    backgroundColor: '#FFFFFF',
    borderColor: '#AAAAAA',
  },
  darkContainer: {
    ...containerBase,
    backgroundColor: '#575757',
    borderColor: '#F3F3F3',
  },
  lightInput: {
    ...inputBase,
    color: '#0A0A0A',
  },
  darkInput: {
    ...inputBase,
    color: '#F3F3F3',
  },
});
