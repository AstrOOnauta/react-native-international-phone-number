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
} from 'react-native';
import {
  CountryPicker,
  CountryButton,
} from 'react-native-country-codes-picker';

import getInputMask from './utils/getInputMask';
import getAllCountries from './utils/getAllCountries';
import getCountriesByName from './utils/getCountriesByName';
import getCountriesByCallingCode from './utils/getCountriesByCallingCode';
import getCountryByCca2 from './utils/getCountryByCca2';
import getCountryByPhoneNumber from './utils/getCountryByPhoneNumber';
import isValidPhoneNumber from './utils/isValidPhoneNumber';
import {
  getCountryNotFoundMessage,
  getPhoneNumberInputPlaceholder,
  getPopularCountriesSectionTitle,
  getRestOfCountriesSectionTitle,
  getSearchInputPlaceholder,
} from './utils/getPlaceholders';
import {
  getCaretStyle,
  getContainerStyle,
  getCountryPickerStyle,
  getDividerStyle,
  getFlagContainerStyle,
  getFlagStyle,
  getFlagTextStyle,
  getInputStyle,
  getModalSectionTitleStyle,
} from './utils/getStyles';

const PhoneInput = forwardRef(
  (
    {
      theme,
      language,
      placeholder,
      placeholderTextColor,
      selectionColor,
      phoneInputStyles,
      modalStyles,
      disabled,
      modalDisabled,
      modalHeight,
      defaultCountry,
      defaultValue,
      onChangePhoneNumber,
      selectedCountry,
      onChangeSelectedCountry,
      customMask,
      showOnly,
      excludedCountries,
      popularCountries,
      popularCountriesSectionTitle,
      restOfCountriesSectionTitle,
      modalSectionTitleDisabled,
      modalSearchInputPlaceholder,
      modalSearchInputPlaceholderTextColor,
      modalSearchInputSelectionColor,
      modalNotFoundCountryMessage,
      customCaret,
      rtl,
      allowZeroAfterCallingCode,
      testID,
      accessibilityRoleFlagContainerButton,
      accessibilityLabelFlagContainerButton,
      accessibilityHintFlagContainerButton,
      accessibilityRolePhoneInput,
      accessibilityLabelPhoneInput,
      accessibilityHintPhoneInput,
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
      getValue: () => inputValue,
      value: inputValue,
      getFullPhoneNumber: () =>
        `${countryValue?.callingCode} ${inputValue}`,
      fullPhoneNumber: `${countryValue?.callingCode} ${inputValue}`,
      getSelectedCountry: () => countryValue,
      selectedCountry: countryValue,
      isValid: isValidPhoneNumber(inputValue, selectedCountry),
      props: {
        theme,
        language,
        placeholder,
        placeholderTextColor,
        selectionColor,
        phoneInputStyles,
        modalStyles,
        disabled,
        modalDisabled,
        modalHeight,
        defaultCountry,
        defaultValue,
        onChangePhoneNumber,
        selectedCountry,
        onChangeSelectedCountry,
        customMask,
        showOnly,
        excludedCountries,
        popularCountries,
        popularCountriesSectionTitle,
        restOfCountriesSectionTitle,
        modalSectionTitleDisabled,
        modalSearchInputPlaceholder,
        modalSearchInputPlaceholderTextColor,
        modalSearchInputSelectionColor,
        modalNotFoundCountryMessage,
        customCaret,
        rtl,
        allowZeroAfterCallingCode,
        testID,
        accessibilityRoleFlagContainerButton,
        accessibilityLabelFlagContainerButton,
        accessibilityHintFlagContainerButton,
        accessibilityRolePhoneInput,
        accessibilityLabelPhoneInput,
        accessibilityHintPhoneInput,
        ...rest,
      },
    };

    function updateRef(phoneNumber, country) {
      if (ref) {
        ref.current = {
          ...refBase,
          getValue: () => phoneNumber,
          value: phoneNumber,
          getFullPhoneNumber: () =>
            `${country?.callingCode} ${phoneNumber}`,
          fullPhoneNumber: `${country?.callingCode} ${phoneNumber}`,
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
        const newValue = {
          name: country.name,
          cca2: country.code,
          flag: country.flag,
          callingCode: country.dial_code,
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
            phoneNumber.replace(matchingCountry.callingCode, ''),
            null
          );
        }

        return;
      }

      const res = getInputMask(
        phoneNumber,
        callingCode ? callingCode : countryValue?.callingCode,
        countryValue?.cca2,
        customMask ? customMask : null,
        allowZeroAfterCallingCode === false ? false : true
      );

      if (ref) {
        setInputValue(res);
        updateRef(res, countryValue);
      } else {
        onChangePhoneNumber(res);
      }
    }

    useEffect(() => {
      if (!countryValue && !defaultCountry) {
        const defaultCountry = getCountryByCca2('BR');

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
            "The default number provided (defaultValue) don't match with anyone country. Please, correct it to be shown in the input. For more information: https://github.com/AstrOOnauta/react-native-international-phone-number#intermediate-usage---typescript--default-phone-number-value"
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

    if (
      ref &&
      (rest.value ||
        onChangePhoneNumber ||
        selectedCountry ||
        onChangeSelectedCountry)
    ) {
      throw new Error(
        "Error: Don't use the useRef hook combined with the useState hook to manage the phoneNumber and selectedCountry values. Instead, choose to use just one of them (useRef or useState)."
      );
    } else {
      // Create a separate constant for each part of the component
      const touchableStart = (
        <>
          <Text style={getFlagStyle(phoneInputStyles?.flag)}>
            {countryValue?.flag}
          </Text>
          {customCaret || (
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
        >
          {countryValue?.callingCode}
        </Text>
      );

      const touchablePart = (
        <TouchableOpacity
          testID={
            testID
              ? `${testID}FlagContainerButton`
              : `countryPickerFlagContainerButton`
          }
          accessibillityRole={
            accessibilityRoleFlagContainerButton || 'button'
          }
          accessibilityLabel={
            accessibilityLabelFlagContainerButton ||
            'Countries button'
          }
          accessibilityHint={
            accessibilityHintFlagContainerButton ||
            'Click to open the countries modal'
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
              : getPhoneNumberInputPlaceholder(language || 'en')
          }
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
          value={inputValue}
          onChangeText={onChangeText}
          keyboardType="number-pad"
          ref={textInputRef}
          testID={
            testID ? `${testID}PhoneInput` : `countryPickerPhoneInput`
          }
          accessibillityRole={accessibilityRolePhoneInput || 'input'}
          accessibilityLabel={
            accessibilityLabelPhoneInput || 'Phone Number input'
          }
          accessibilityHint={
            accessibilityHintPhoneInput || 'Write the phone number'
          }
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
            <CountryPicker
              show={show}
              lang={language}
              inputPlaceholder={
                modalSearchInputPlaceholder ||
                getSearchInputPlaceholder(language || 'en')
              }
              inputPlaceholderTextColor={
                modalSearchInputPlaceholderTextColor ||
                (theme === 'dark' ? '#CCCCCC' : '#AAAAAA')
              }
              selectionColor={
                modalSearchInputSelectionColor ||
                (theme === 'dark'
                  ? 'rgba(255,255,255, .4)'
                  : 'rgba(0 ,0 ,0 , .4)')
              }
              searchMessage={
                modalNotFoundCountryMessage ||
                getCountryNotFoundMessage(language || 'en')
              }
              enableModalAvoiding
              style={getCountryPickerStyle(
                theme,
                modalHeight,
                modalStyles
              )}
              pickerButtonOnPress={onSelect}
              onBackdropPress={() => setShow(false)}
              onRequestClose={() => setShow(false)}
              showOnly={showOnly}
              excludedCountries={excludedCountries}
              popularCountries={popularCountries}
              ListHeaderComponent={({ countries, lang, onPress }) => {
                return (
                  <View>
                    {!modalSectionTitleDisabled && (
                      <Text
                        style={getModalSectionTitleStyle(
                          theme,
                          modalStyles
                        )}
                      >
                        {popularCountriesSectionTitle ||
                          getPopularCountriesSectionTitle(
                            language || 'en'
                          )}
                      </Text>
                    )}
                    {countries.map((country, index) => {
                      return (
                        <CountryButton
                          key={index}
                          item={country}
                          name={country?.name?.[lang || 'en']}
                          onPress={() => onPress(country)}
                          style={getCountryPickerStyle(
                            theme,
                            modalHeight,
                            modalStyles
                          )}
                        />
                      );
                    })}
                    {!modalSectionTitleDisabled && (
                      <Text
                        style={getModalSectionTitleStyle(
                          theme,
                          modalStyles
                        )}
                      >
                        {restOfCountriesSectionTitle ||
                          getRestOfCountriesSectionTitle(
                            language || 'en'
                          )}
                      </Text>
                    )}
                  </View>
                );
              }}
            />
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
};
