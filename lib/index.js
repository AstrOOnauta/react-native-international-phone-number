import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
} from 'react';
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

import getAllCountries from './utils/getAllCountries';
import getCountriesByName from './utils/getCountriesByName';
import getCountriesByCallingCode from './utils/getCountriesByCallingCode';
import getCountryByCca2 from './utils/getCountryByCca2';
import getCountryByPhoneNumber from './utils/getCountryByPhoneNumber';
import phoneMask from './utils/inputMask';

const PhoneInput = forwardRef(
  (
    {
      placeholder,
      placeholderTextColor,
      selectionColor,
      containerStyle,
      flagContainerStyle,
      inputStyle,
      withDarkTheme,
      disabled,
      modalDisabled,
      defaultValue,
      onChangePhoneNumber,
      selectedCountry,
      onChangeSelectedCountry,
      ...rest
    },
    ref
  ) => {
    const [containerWidth, setContainerWidth] = useState(
      Dimensions.get('window').width
    );
    const [defaultCca2, setDefaultCca2] = useState('');
    const [inputValue, setInputValue] = useState(null);
    const [countryValue, setCountryValue] = useState(null);

    const textInputRef = useRef(null);

    const refBase = {
      ...textInputRef.current,
      onFocus: textInputRef.current?.focus,
      focus: textInputRef.current?.focus,
      getValue: () => inputValue,
      value: inputValue,
      getSelectedCountry: () => countryValue,
      selectedCountry: countryValue,
      props: {
        placeholder,
        placeholderTextColor,
        selectionColor,
        containerStyle,
        flagContainerStyle,
        inputStyle,
        withDarkTheme,
        disabled,
        modalDisabled,
        defaultValue,
        onChangePhoneNumber,
        selectedCountry,
        onChangeSelectedCountry,
        ...rest,
      },
    };

    function updateRef(phoneNumber, country) {
      if (ref) {
        ref.current = {
          ...refBase,
          getValue: () => phoneNumber,
          value: phoneNumber,
          getSelectedCountry: () => country,
          selectedCountry: country,
          props: {
            ...refBase.props,
            value: phoneNumber,
            selectedCountry: country,
          },
        };
      }
    }

    function onSelect(country) {
      if (ref) {
        setInputValue('');
      } else {
        onChangePhoneNumber('');
      }

      if (onChangeSelectedCountry || ref) {
        const newValue = {
          name: country.name,
          cca2: country.cca2,
          flag: country.flag,
          callingCode: `+${country.callingCode[0]}`,
        };

        if (ref) {
          setCountryValue(newValue);
          updateRef('', newValue);
        } else {
          onChangeSelectedCountry(newValue);
        }
      }
    }

    function onChangeText(phoneNumber, callingCode) {
      const res = phoneMask(
        phoneNumber,
        callingCode ? callingCode : countryValue?.callingCode,
        countryValue?.cca2
      );

      if (ref) {
        setInputValue(res);
        updateRef(res, countryValue);
      } else {
        onChangePhoneNumber(res);
      }
    }

    useEffect(() => {
      if (ref) {
        setInputValue('');
      } else {
        onChangePhoneNumber('');
      }

      if (defaultValue) {
        const matchingCountry = getCountryByPhoneNumber(defaultValue);

        if (matchingCountry) {
          setDefaultCca2(matchingCountry.cca2);

          if (ref) {
            setCountryValue(matchingCountry);
            updateRef('', matchingCountry);
          } else {
            onChangeSelectedCountry(matchingCountry);
          }
        } else {
          setDefaultCca2(null);

          if (ref) {
            setCountryValue(null);
            updateRef('', null);
          } else {
            onChangeSelectedCountry(null);
          }

          onChangeText('', null);

          console.warn(
            "The default number provided (defaultValue) don't match with anyone country. Please, correct it to be shown in the input. For more information: https://github.com/AstrOOnauta/react-native-international-phone-number#intermediate-usage---typescript--default-phone-number-value"
          );
        }
      } else {
        if (!countryValue) {
          const defaultCountry = {
            callingCode: '+55',
            cca2: 'BR',
            flag: 'flag-br',
            name: 'Brazil',
          };

          if (ref) {
            setCountryValue(defaultCountry);
            updateRef('', defaultCountry);
          } else {
            onChangeSelectedCountry(defaultCountry);
          }
        } else {
          if (ref) {
            updateRef('', countryValue);
          }
        }
      }
    }, [defaultValue]);

    useEffect(() => {
      if (
        defaultValue &&
        countryValue &&
        countryValue.cca2 === defaultCca2 &&
        !inputValue
      ) {
        const callingCode = countryValue.callingCode;

        let phoneNumber = defaultValue;

        if (
          callingCode === '+1' &&
          countryValue.cca2 !== 'CA' &&
          countryValue.cca2 !== 'US'
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
          countryValue.cca2 === 'VA'
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
    }, [countryValue]);

    useEffect(() => {
      if (!ref) {
        setInputValue(rest.value);
        setCountryValue(selectedCountry);
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
        onLayout={(e) =>
          setContainerWidth(e.nativeEvent.layout.width)
        }
      >
        <CountryPicker
          containerButtonStyle={[
            flagContainerBase,
            countryValue?.cca2 === 'VA' ? { width: 140 } : {},
            flagContainerStyle ? flagContainerStyle : {},
          ]}
          onSelect={onSelect}
          withFilter
          withAlphaFilter
          withCallingCode
          withCallingCodeButton={countryValue || defaultCca2}
          theme={withDarkTheme ? DARK_THEME : DEFAULT_THEME}
          countryCode={
            countryValue ? countryValue?.cca2 : defaultCca2
          }
          modalProps={
            disabled || modalDisabled ? { visible: false } : {}
          }
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
          value={inputValue}
          onChangeText={onChangeText}
          keyboardType="numeric"
          ref={textInputRef}
          {...rest}
        />
      </View>
    );
  }
);

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

export {
  PhoneInput,
  getAllCountries,
  getCountryByPhoneNumber,
  getCountryByCca2,
  getCountriesByCallingCode,
  getCountriesByName,
};
