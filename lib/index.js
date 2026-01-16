/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
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
import { getPhoneNumberLength } from './utils/getPhoneNumberLength';
import isValidPhoneNumber from './utils/isValidPhoneNumber';
import {
  getCountriesButtonAccessibilityHint,
  getCountriesButtonAccessibilityLabel,
  getPhoneNumberInputAccessibilityHint,
  getPhoneNumberInputAccessibilityLabel,
  getPhoneNumberInputPlaceholder,
} from './utils/getTranslations';
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
      minBottomsheetHeight,
      maxBottomsheetHeight,
      initialBottomsheetHeight,
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
      showModalAlphabetFilter = true,
      showModalSearchInput,
      showModalCloseButton,
      showModalScrollIndicator,
      allowFontScaling = true,
      customFlag,
      accessibilityLabelPhoneInput,
      accessibilityHintPhoneInput,
      accessibilityLabelCountriesButton,
      accessibilityHintCountriesButton,
      accessibilityLabelBackdrop,
      accessibilityHintBackdrop,
      accessibilityLabelCloseButton,
      accessibilityHintCloseButton,
      accessibilityLabelSearchInput,
      accessibilityHintSearchInput,
      accessibilityLabelCountriesList,
      accessibilityHintCountriesList,
      accessibilityLabelCountryItem,
      accessibilityHintCountryItem,
      accessibilityLabelAlphabetFilter,
      accessibilityHintAlphabetFilter,
      accessibilityLabelAlphabetLetter,
      accessibilityHintAlphabetLetter,
      ...rest
    },
    ref
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
      isFocused: () => textInputRef.current?.isFocused(),
      setNativeProps: (nativeProps) =>
        textInputRef.current?.setNativeProps(nativeProps),
      measure: (callback) => textInputRef.current?.measure(callback),
      measureInWindow: (callback) =>
        textInputRef.current?.measureInWindow(callback),
      measureLayout: (relativeToNativeNode, onSuccess, onFail) =>
        textInputRef.current?.measureLayout(
          relativeToNativeNode,
          onSuccess,
          onFail
        ),
      getValue: () => inputValue,
      value: inputValue,
      getFullPhoneNumber: () =>
        `${countryValue?.idd?.root} ${inputValue}`,
      fullPhoneNumber: `${countryValue?.idd?.root} ${inputValue}`,
      phoneNumberLength: getPhoneNumberLength(
        countryValue,
        inputValue
      ),
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
        minBottomsheetHeight,
        maxBottomsheetHeight,
        initialBottomsheetHeight,
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
        customFlag,
        accessibilityLabelPhoneInput,
        accessibilityHintPhoneInput,
        accessibilityLabelCountriesButton,
        accessibilityHintCountriesButton,
        accessibilityLabelBackdrop,
        accessibilityHintBackdrop,
        accessibilityLabelCloseButton,
        accessibilityHintCloseButton,
        accessibilityLabelSearchInput,
        accessibilityHintSearchInput,
        accessibilityLabelCountriesList,
        accessibilityHintCountriesList,
        accessibilityLabelCountryItem,
        accessibilityHintCountryItem,
        allowFontScaling,
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
          getFullPhoneNumber: () =>
            `${country?.idd?.root} ${phoneNumber}`,
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
      setInputValue('');
      setCountryValue(country);
      if (onChangePhoneNumber) {
        onChangePhoneNumber('');
      }
      if (onChangeSelectedCountry) {
        onChangeSelectedCountry(country);
      }
      updateRef('', country);
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

      setInputValue(result);
      if (onChangePhoneNumber) {
        onChangePhoneNumber(result);
      }
      updateRef(result, countryValue);
    }

    function formatPhoneNumber(phoneNumber, callingCode) {
      try {
        let formattedNumber = '';

        const metadata = new Metadata();
        metadata.selectNumberingPlan(countryValue?.cca2);

        const possibleLengths = countryValue
          ? metadata.possibleLengths()
          : [];

        let validCallingCode = callingCode
          ? callingCode
          : countryValue?.idd?.root;

        const res = formatIncompletePhoneNumber(
          `${validCallingCode}${phoneNumber}`
        );

        formattedNumber = res;

        if (res.startsWith(0)) {
          formattedNumber = parsePhoneNumber(res)?.formatNational();
        } else {
          if (
            validCallingCode &&
            res &&
            res.startsWith(validCallingCode)
          ) {
            formattedNumber = res
              .substring(validCallingCode.length)
              .trim();
          }
        }

        const possibleLength = formattedNumber.startsWith(0)
          ? possibleLengths.slice(-1)[0] + 1
          : possibleLengths.slice(-1)[0];

        if (
          formattedNumber?.replace(/\D/g, '')?.length > possibleLength
        ) {
          return;
        }

        setInputValue(formattedNumber);
        if (onChangePhoneNumber) {
          onChangePhoneNumber(formattedNumber);
        }
        updateRef(formattedNumber, countryValue);
      } catch  {
        setInputValue(phoneNumber);
        if (onChangePhoneNumber) {
          onChangePhoneNumber(phoneNumber);
        }
        updateRef(phoneNumber, countryValue);
      }
    }

    function onChangeText(phoneNumber, callingCode) {
      if (phoneNumber.includes('+')) {
        const matchingCountry = getCountryByPhoneNumber(phoneNumber);

        if (matchingCountry) {
          setDefaultCca2(matchingCountry.cca2);

          setCountryValue(matchingCountry);
          if (onChangeSelectedCountry) {
            onChangeSelectedCountry(matchingCountry);
          }
          updateRef('', matchingCountry);

          onChangeText(
            phoneNumber.replace(matchingCountry?.idd?.root, ''),
            null
          );
        }

        return;
      }

      if (customMask) {
        return formatPhoneNumberWithCustomMask(phoneNumber);
      }
      formatPhoneNumber(phoneNumber, callingCode);
    }

    useEffect(() => {
      if (!countryValue && !defaultCountry) {
        const country = getCountryByCca2('BR');
        setCountryValue(country);
        if (onChangeSelectedCountry) {
          onChangeSelectedCountry(country);
        }
        updateRef('', country);
      } else if (countryValue) {
        updateRef(inputValue, countryValue);
      }
    }, []);

    useEffect(() => {
      if (defaultCountry) {
        const c = getCountryByCca2(defaultCountry);
        setCountryValue(c);
        if (onChangeSelectedCountry) {
          onChangeSelectedCountry(c);
        }
        updateRef('', c);
      }
    }, [defaultCountry]);

    useEffect(() => {
      if (defaultValue) {
        const matchingCountry = getCountryByPhoneNumber(defaultValue);

        if (matchingCountry) {
          setDefaultCca2(matchingCountry.cca2);

          setCountryValue(matchingCountry);
          if (onChangeSelectedCountry) {
            onChangeSelectedCountry(matchingCountry);
          }
          updateRef('', matchingCountry);
        } else {
          // console.warn(
          //   "The default number provided (defaultValue) don't match with anyone country. Please, correct it to be shown in the input. For more information: https://github.com/AstrOOnauta/react-native-international-phone-number#intermediate-usage---typescript--default-phone-number-value",
          // );
        }
      }
    }, [defaultValue]);

    useEffect(() => {
      if (
        defaultValue &&
        countryValue &&
        countryValue.cca2 === defaultCca2
      ) {
        const callingCode = countryValue?.idd?.root;

        let phoneNumber = defaultValue;

        onChangeText(phoneNumber, callingCode);
      }
    }, [countryValue]);

    useEffect(() => {
      if (typeof rest.value === 'string') {
        setInputValue(rest.value);
      }
      if (selectedCountry) {
        setCountryValue(selectedCountry);
      }
    }, [selectedCountry, rest.value]);

    {
      // Create a separate constant for each part of the component
      const touchableStart = (
        <>
          {(customFlag &&
            countryValue &&
            customFlag(countryValue)) || (
            <Text
              style={getFlagStyle(phoneInputStyles?.flag)}
              allowFontScaling={allowFontScaling}
            >
              {countryValue?.flag || countryValue?.cca2}
            </Text>
          )}
          {(customCaret && customCaret()) || (
            <View style={phoneInputStyles?.caret}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingTop: 4,
                }}
              >
                <View
                  style={getCaretStyle(
                    theme,
                    phoneInputStyles?.caret
                  )}
                />
              </View>
            </View>
          )}
        </>
      );

      const touchableMiddle = (
        <View
          style={getDividerStyle(theme, phoneInputStyles?.divider)}
        />
      );

      const touchableEnd = (
        <Text
          style={getFlagTextStyle(
            theme,
            phoneInputStyles?.callingCode
          )}
          allowFontScaling={allowFontScaling}
        >
          {countryValue?.idd?.root}
        </Text>
      );

      const touchablePart = (
        <TouchableOpacity
          testID="countryPickerFlagContainerButton"
          accessibillityRole="button"
          accessibilityLabel={
            accessibilityLabelCountriesButton ||
            getCountriesButtonAccessibilityLabel(language || 'eng')
          }
          accessibilityHint={
            accessibilityHintCountriesButton ||
            getCountriesButtonAccessibilityHint(language || 'eng')
          }
          activeOpacity={disabled || modalDisabled ? 1 : 0.6}
          onPress={() =>
            disabled || modalDisabled ? null : setShow(true)
          }
          style={getFlagContainerStyle(
            theme,
            phoneInputStyles?.flagContainer
          )}
        >
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
              : getPhoneNumberInputPlaceholder(language || 'eng')
          }
          placeholderTextColor={
            phoneInputPlaceholderTextColor ||
            (theme === 'dark' ? '#CCCCCC' : '#AAAAAA')
          }
          selectionColor={
            phoneInputSelectionColor ||
            (theme === 'dark'
              ? 'rgba(255,255,255, .4)'
              : 'rgba(0 ,0 ,0 , .4)')
          }
          editable={!disabled}
          value={inputValue}
          onChangeText={onChangeText}
          keyboardType="number-pad"
          ref={textInputRef}
          testID="countryPickerPhoneInput"
          accessibillityRole="input"
          accessibilityLabel={
            accessibilityLabelPhoneInput ||
            getPhoneNumberInputAccessibilityLabel(language || 'eng')
          }
          accessibilityHint={
            accessibilityHintPhoneInput ||
            getPhoneNumberInputAccessibilityHint(language || 'eng')
          }
          allowFontScaling={allowFontScaling}
          {...rest}
        />
      );

      return (
        <>
          <View
            style={getContainerStyle(
              theme,
              phoneInputStyles?.container,
              disabled
            )}
          >
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
                onBackdropPress={(closeModal) =>
                  onModalBackdropPress
                    ? onModalBackdropPress(closeModal)
                    : setShow(false)
                }
                onRequestClose={() =>
                  onModalRequestClose
                    ? onModalRequestClose()
                    : setShow(false)
                }
                countrySelectStyle={modalStyles}
                isFullScreen={isFullScreen}
                modalType={modalType}
                minBottomsheetHeight={minBottomsheetHeight}
                maxBottomsheetHeight={maxBottomsheetHeight}
                initialBottomsheetHeight={initialBottomsheetHeight}
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
                showAlphabetFilter={showModalAlphabetFilter}
                countryNotFoundMessage={modalNotFoundCountryMessage}
                customFlag={customFlag}
                accessibilityLabelBackdrop={
                  accessibilityLabelBackdrop
                }
                accessibilityHintBackdrop={accessibilityHintBackdrop}
                accessibilityLabelCloseButton={
                  accessibilityLabelCloseButton
                }
                accessibilityHintCloseButton={
                  accessibilityHintCloseButton
                }
                accessibilityLabelSearchInput={
                  accessibilityLabelSearchInput
                }
                accessibilityHintSearchInput={
                  accessibilityHintSearchInput
                }
                accessibilityLabelCountriesList={
                  accessibilityLabelCountriesList
                }
                accessibilityHintCountriesList={
                  accessibilityHintCountriesList
                }
                accessibilityLabelCountryItem={
                  accessibilityLabelCountryItem
                }
                accessibilityHintCountryItem={
                  accessibilityHintCountryItem
                }
                accessibilityLabelAlphabetFilter={
                  accessibilityLabelAlphabetFilter
                }
                accessibilityHintAlphabetFilter={
                  accessibilityHintAlphabetFilter
                }
                accessibilityLabelAlphabetLetter={
                  accessibilityLabelAlphabetLetter
                }
                accessibilityHintAlphabetLetter={
                  accessibilityHintAlphabetLetter
                }
                allowFontScaling={allowFontScaling}
              />
            </>
          ) : null}
        </>
      );
    }
  }
);

export default PhoneInput;

export {
  getAllCountries,
  getCountryByPhoneNumber,
  getCountryByCca2,
  getCountriesByCallingCode,
  getCountriesByName,
  isValidPhoneNumber,
  getPhoneNumberLength,
};
