import React, { useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
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
  containerStyle,
  inputStyle,
  withDarkTheme,
  disabled,
  selectedCountry,
  setSelectedCountry,
  ...rest
}) {
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
      style={[styles.container, containerStyle ? containerStyle : {}]}
    >
      <CountryPicker
        containerButtonStyle={{
          paddingLeft: 20,
        }}
        onSelect={onSelect}
        withFilter
        withCallingCodeButton
        theme={withDarkTheme ? DARK_THEME : DEFAULT_THEME}
        countryCode={selectedCountry ? selectedCountry.cca2 : 'BR'}
      />
      <TextInput
        style={[styles.input, inputStyle ? inputStyle : {}]}
        placeholder={
          placeholder ? placeholder : 'Insert your phone number'
        }
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : '#DDDDDD'
        }
        editable={!disabled}
        keyboardType="numeric"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DDDDDD',
    borderRadius: 8,
  },
  input: {
    width: Dimensions.get('window').width - 100,
    paddingVertical: Platform.OS === 'ios' ? 16 : 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
  },
});

export { PhoneInput, phoneMask };
