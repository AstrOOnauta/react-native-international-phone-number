/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef, forwardRef} from 'react';
import {View, Text, TouchableOpacity, TextInput, Platform} from 'react-native';
import CountrySelect, {
  getAllCountries,
  getCountriesByName,
  getCountriesByCallingCode,
  getCountryByCca2,
} from 'react-native-country-select';
import parsePhoneNumber, {
  formatIncompletePhoneNumber,
  Metadata,
} from 'libphonenumber-js';

import getCountryByPhoneNumber from './utils/getCountryByPhoneNumber';
import isValidPhoneNumber from './utils/isValidPhoneNumber';
import {getPhoneNumberInputPlaceholder} from './utils/getPlaceholders';
import {
  getCaretStyle,
  getContainerStyle,
  getDividerStyle,
  getFlagContainerStyle,
  getFlagStyle,
  getFlagTextStyle,
  getInputStyle,
} from './utils/getStyles';

const PhoneInput = forwardRef(
  (
    {
      theme,
      language,
      placeholder,
      phoneInputPlaceholderTextColor,
      phoneInputSelectionColor,
      phoneInputStyles,
      modalStyles,
      disabled,
      modalDisabled,
      defaultCountry,
      defaultValue,
      onChangePhoneNumber,
      selectedCountry,
      onChangeSelectedCountry,
      customMask,
      visibleCountries,
      hiddenCountries,
      popularCountries,
      customCaret,
      rtl,
      isFullScreen = false,
      modalType = Platform.OS === 'web' ? 'popup' : 'bottomSheet',
      modalDragHandleIndicatorComponent,
      modalSearchInputPlaceholderTextColor,
      modalSearchInputPlaceholder,
      modalSearchInputSelectionColor,
      modalPopularCountriesTitle,
      modalAllCountriesTitle,
      modalSectionTitleComponent,
      modalCountryItemComponent,
      modalCloseButtonComponent,
      modalSectionTitleDisabled,
      modalNotFoundCountryMessage,
      disabledModalBackdropPress,
      removedModalBackdrop,
      onModalBackdropPress,
      onModalRequestClose,
      showModalSearchInput,
      showModalCloseButton,
      showModalScrollIndicator,
      ...rest
    },
    ref,
  ) => {
    const [show, setShow] = useState(false);
    const [defaultCca2, setDefaultCca2] = useState('');
    const [inputValue, setInputValue] = useState(null);
    const [countryValue, setCountryValue] = useState(null);

    const textInputRef = useRef(null);

    const refBase = {
      ...textInputRef.current,
      onFocus: () => textInputRef.current?.focus(),
      focus: () => textInputRef.current?.focus(),
      blur: () => textInputRef.current?.blur(),
      clear: () => textInputRef.current?.clear(),
      getValue: () => inputValue,
      value: inputValue,
      getFullPhoneNumber: () => `${countryValue?.idd?.root} ${inputValue}`,
      fullPhoneNumber: `${countryValue?.idd?.root} ${inputValue}`,
      getSelectedCountry: () => countryValue,
      selectedCountry: countryValue,
      isValid: isValidPhoneNumber(inputValue, selectedCountry),
      props: {
        theme,
        language,
        placeholder,
        phoneInputPlaceholderTextColor,
        phoneInputSelectionColor,
        phoneInputStyles,
        modalStyles,
        disabled,
        modalDisabled,
        defaultCountry,
        defaultValue,
        onChangePhoneNumber,
        selectedCountry,
        onChangeSelectedCountry,
        customMask,
        visibleCountries,
        hiddenCountries,
        popularCountries,
        customCaret,
        rtl,
        isFullScreen,
        modalType,
        modalSearchInputPlaceholderTextColor,
        modalSearchInputPlaceholder,
        modalSearchInputSelectionColor,
        modalPopularCountriesTitle,
        modalAllCountriesTitle,
        modalSectionTitleComponent,
        modalCountryItemComponent,
        modalCloseButtonComponent,
        modalSectionTitleDisabled,
        modalNotFoundCountryMessage,
        disabledModalBackdropPress,
        removedModalBackdrop,
        onModalBackdropPress,
        onModalRequestClose,
        showModalSearchInput,
        showModalCloseButton,
        showModalScrollIndicator,
        ...rest,
      },
    };

    function updateRef(phoneNumber, country) {
      if (ref) {
        ref.current = {
          ...refBase,
          getValue: () => phoneNumber?.replace(/\D/g, ''),
          value: phoneNumber?.replace(/\D/g, ''),
          getValueFormatted: () => phoneNumber,
          valueFormatted: phoneNumber,
          getFullPhoneNumber: () => `${country?.idd?.root} ${phoneNumber}`,
          fullPhoneNumber: `${country?.idd?.root} ${phoneNumber}`,
          getSelectedCountry: () => country,
          selectedCountry: country,
          isValid: isValidPhoneNumber(phoneNumber, country),
          props: {
            ...refBase.props,
            value: phoneNumber,
            selectedCountry: country,
          },
        };
      }
    }

    function onSelect(country) {
      setShow(false);

      if (ref) {
        setInputValue('');
      } else {
        onChangePhoneNumber('');
      }

      if (onChangeSelectedCountry || ref) {
        if (ref) {
          setCountryValue(country);
          updateRef('', country);
        } else {
          onChangeSelectedCountry(country);
        }
      }
    }

    function formatPhoneNumberWithCustomMask(phoneNumber) {
      if (!customMask || !phoneNumber) {
        return phoneNumber;
      }

      const numbers = phoneNumber.replace(/\D/g, '');

      let result = '';
      let numberIndex = 0;

      for (
        let i = 0;
        i < customMask.length && numberIndex < numbers.length;
        i++
      ) {
        if (customMask[i] === '#') {
          result += numbers[numberIndex];
          numberIndex++;
        } else {
          result += customMask[i];
        }
      }

      return result;
    }

    function formatPhoneNumber(phoneNumber, callingCode) {
      let formattedNumber = '';

      const metadata = new Metadata();
      metadata.selectNumberingPlan(selectedCountry.cca2);
      const possibleLengths = metadata.possibleLengths();

      let validCallingCode = callingCode
        ? callingCode
        : countryValue?.idd?.root;

      const res = formatIncompletePhoneNumber(
        `${validCallingCode}${phoneNumber}`,
      );

      formattedNumber = res;

      if (res.startsWith(0)) {
        formattedNumber = parsePhoneNumber(res)?.formatNational();
      } else {
        if (validCallingCode && res && res.startsWith(validCallingCode)) {
          formattedNumber = res.substring(validCallingCode.length).trim();
        }
      }

      const possibleLength = formattedNumber.startsWith(0)
        ? possibleLengths.slice(-1)[0] + 1
        : possibleLengths.slice(-1)[0];

      if (formattedNumber?.replace(/\D/g, '')?.length > possibleLength) {
        return phoneNumber.slice(0, -1);
      }

      return formattedNumber;
    }

    function onChangeText(phoneNumber, callingCode) {
      if (phoneNumber.includes('+')) {
        const matchingCountry = getCountryByPhoneNumber(phoneNumber);

        if (matchingCountry) {
          setDefaultCca2(matchingCountry.cca2);

          if (ref) {
            setCountryValue(matchingCountry);
            updateRef('', matchingCountry);
          } else {
            onChangeSelectedCountry(matchingCountry);
          }

          onChangeText(
            phoneNumber.replace(matchingCountry?.idd?.root, ''),
            null,
          );
        }

        return;
      }

      let formattedNumber = '';

      if (customMask) {
        formattedNumber = formatPhoneNumberWithCustomMask(phoneNumber);
      } else {
        formattedNumber = formatPhoneNumber(phoneNumber, callingCode);
      }

      if (ref) {
        setInputValue(formattedNumber);
        updateRef(formattedNumber, countryValue);
      } else {
        onChangePhoneNumber(formattedNumber);
      }
    }

    useEffect(() => {
      if (!countryValue && !defaultCountry) {
        const country = getCountryByCca2('BR');

        if (ref) {
          setCountryValue(country);
          updateRef('', country);
        } else {
          onChangeSelectedCountry(country);
        }
      } else {
        if (ref) {
          updateRef('', countryValue);
        }
      }
    }, []);

    useEffect(() => {
      if (defaultCountry) {
        if (ref) {
          setCountryValue(getCountryByCca2(defaultCountry));
          updateRef('', getCountryByCca2(defaultCountry));
        } else {
          onChangeSelectedCountry(getCountryByCca2(defaultCountry));
        }
      }
    }, [defaultCountry]);

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
            "The default number provided (defaultValue) don't match with anyone country. Please, correct it to be shown in the input. For more information: https://github.com/AstrOOnauta/react-native-international-phone-number#intermediate-usage---typescript--default-phone-number-value",
          );
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
        const callingCode = countryValue?.idd?.root;

        let phoneNumber = defaultValue;

        onChangeText(phoneNumber, callingCode);
      }
    }, [countryValue]);

    useEffect(() => {
      if (!ref) {
        setInputValue(rest.value);
        setCountryValue(selectedCountry);
      }
    }, [selectedCountry]);

    if (
      ref &&
      (rest.value ||
        onChangePhoneNumber ||
        selectedCountry ||
        onChangeSelectedCountry)
    ) {
      throw new Error(
        "Error: Don't use the useRef hook combined with the useState hook to manage the phoneNumber and selectedCountry values. Instead, choose to use just one of them (useRef or useState).",
      );
    } else {
      // Create a separate constant for each part of the component
      const touchableStart = (
        <>
          <Text style={getFlagStyle(phoneInputStyles?.flag)}>
            {countryValue?.flag || countryValue?.cca2}
          </Text>
          {(customCaret && customCaret()) || (
            <View style={phoneInputStyles?.caret}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingTop: 4,
                }}>
                <View style={getCaretStyle(theme, phoneInputStyles?.caret)} />
              </View>
            </View>
          )}
        </>
      );

      const touchableMiddle = (
        <View style={getDividerStyle(theme, phoneInputStyles?.divider)} />
      );

      const touchableEnd = (
        <Text style={getFlagTextStyle(theme, phoneInputStyles?.callingCode)}>
          {countryValue?.idd?.root}
        </Text>
      );

      const touchablePart = (
        <TouchableOpacity
          testID="countryPickerFlagContainerButton"
          accessibillityRole="button"
          accessibilityLabel="Countries button"
          accessibilityHint="Click to open the countries modal"
          activeOpacity={disabled || modalDisabled ? 1 : 0.6}
          onPress={() => (disabled || modalDisabled ? null : setShow(true))}
          style={getFlagContainerStyle(theme, phoneInputStyles?.flagContainer)}>
          {/* LTR Display */}
          {!rtl && touchableStart}
          {!rtl && touchableMiddle}
          {!rtl && touchableEnd}

          {/* RTL Display */}
          {rtl && touchableEnd}
          {rtl && touchableMiddle}
          {rtl && touchableStart}
        </TouchableOpacity>
      );

      const inputPart = (
        <TextInput
          style={getInputStyle(theme, phoneInputStyles?.input)}
          placeholder={
            placeholder === '' || placeholder
              ? placeholder
              : getPhoneNumberInputPlaceholder(language || 'en')
          }
          placeholderTextColor={
            phoneInputPlaceholderTextColor ||
            (theme === 'dark' ? '#CCCCCC' : '#AAAAAA')
          }
          selectionColor={
            phoneInputSelectionColor ||
            (theme === 'dark' ? 'rgba(255,255,255, .4)' : 'rgba(0 ,0 ,0 , .4)')
          }
          editable={!disabled}
          value={inputValue}
          onChangeText={onChangeText}
          keyboardType="number-pad"
          ref={textInputRef}
          testID="countryPickerPhoneInput"
          accessibillityRole="input"
          accessibilityLabel="Phone Number input"
          accessibilityHint="Write the phone number"
          {...rest}
        />
      );

      return (
        <>
          <View
            style={getContainerStyle(
              theme,
              phoneInputStyles?.container,
              disabled,
            )}>
            {/* LTR Display */}
            {!rtl && touchablePart}
            {!rtl && inputPart}

            {/* RTL Display */}
            {rtl && inputPart}
            {rtl && touchablePart}
          </View>
          {!disabled && !modalDisabled && show ? (
            <>
              <CountrySelect
                visible={show}
                onClose={() => setShow(false)}
                onSelect={onSelect}
                theme={theme}
                language={language}
                searchPlaceholder={modalSearchInputPlaceholder}
                searchPlaceholderTextColor={
                  modalSearchInputPlaceholderTextColor
                }
                hiddenCountries={
                  hiddenCountries
                    ? ['HM', 'AQ', ...hiddenCountries]
                    : ['HM', 'AQ']
                }
                visibleCountries={visibleCountries}
                popularCountries={popularCountries}
                onBackdropPress={() => onModalBackdropPress || setShow(false)}
                onRequestClose={() => onModalRequestClose || setShow(false)}
                countrySelectStyle={modalStyles}
                isFullScreen={isFullScreen}
                modalType={modalType}
                allCountriesTitle={modalAllCountriesTitle}
                popularCountriesTitle={modalPopularCountriesTitle}
                sectionTitleComponent={
                  modalSectionTitleDisabled
                    ? () => ''
                    : modalSectionTitleComponent
                }
                countryItemComponent={modalCountryItemComponent}
                modalDragHandleIndicatorComponent={
                  modalDragHandleIndicatorComponent
                }
                showCloseButton={showModalCloseButton}
                closeButtonComponent={modalCloseButtonComponent}
                disabledBackdropPress={disabledModalBackdropPress}
                removedBackdrop={removedModalBackdrop}
                showSearchInput={showModalSearchInput}
                countryNotFoundMessage={modalNotFoundCountryMessage}
              />
            </>
          ) : null}
        </>
      );
    }
  },
);

export default PhoneInput;

export {
  getAllCountries,
  getCountryByPhoneNumber,
  getCountryByCca2,
  getCountriesByCallingCode,
  getCountriesByName,
  isValidPhoneNumber,
};
