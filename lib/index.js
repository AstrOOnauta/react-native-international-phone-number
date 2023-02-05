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

import { phoneMask } from './utils/inputMask';

function PhoneInput({
  placeholder,
  placeholderTextColor,
  selectionColor,
  containerStyle,
  flagContainerStyle,
  inputStyle,
  withDarkTheme,
  disabled,
  selectedCountry,
  setSelectedCountry,
  ...rest
}) {
  const [containerWidth, setContainerWidth] = useState(
    Dimensions.get('window').width
  );

  const onSelect = (country) => {
    if (setSelectedCountry) {
      setSelectedCountry({
        ...country,
        callingCode: [`+${country.callingCode[0]}`],
      });
    }
  };

  useEffect(() => {
    setSelectedCountry({
      callingCode: ['+55'],
      cca2: 'BR',
      currency: ['BRL'],
      flag: 'flag-br',
      name: 'Brazil',
      region: 'Americas',
      subregion: 'South America',
    });
  }, []);

  return (
    <View
      style={[
        withDarkTheme ? styles.darkContainer : styles.lightContainer,
        containerStyle ? containerStyle : {},
      ]}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <CountryPicker
        containerButtonStyle={[
          flagContainerBase,
          flagContainerStyle ? flagContainerStyle : {},
        ]}
        onSelect={onSelect}
        withFilter
        withAlphaFilter
        withCallingCode
        withCallingCodeButton
        theme={withDarkTheme ? DARK_THEME : DEFAULT_THEME}
        countryCode={selectedCountry ? selectedCountry.cca2 : 'BR'}
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
            ? selectedColor
            : withDarkTheme
            ? '#F3F3F3'
            : '#0A0A0A'
        }
        editable={!disabled}
        keyboardType="numeric"
        {...rest}
      />
    </View>
  );
}

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

export { PhoneInput, phoneMask };
