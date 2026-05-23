/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
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
} from 'rn-country-select';
import parsePhoneNumber, {
  formatIncompletePhoneNumber,
  Metadata,
} from 'libphonenumber-js';

import getCountryByPhoneNumber from './utils/getCountryByPhoneNumber';
import {
  getInternationalPhoneNumberLength,
} from './utils/getPhoneNumberLength';
import getNationalPhoneNumber from './utils/getNationalPhoneNumber';
import isValidPhoneNumber from './utils/isValidPhoneNumber';
import getPhoneNumberType from './utils/getPhoneNumberType';
import tryParseInternational from './utils/tryParseInternational';
import getExampleForCountry from './utils/getExampleForCountry';
import usePhoneInput from './hooks/usePhoneInput';
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
      placeholderType = 'number',
      phoneInputPlaceholderTextColor,
      phoneInputSelectionColor,
      phoneInputStyles,
      modalStyles,
      disabled,
      modalDisabled,
      defaultCountry,
      defaultPhoneNumber,
      defaultValue,
      value,
      onChangePhoneNumber,
      country,
      onChangeCountry,
      onPhoneNumberTypeChange,
      onValidationChange,
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
      modalSearchInputFocusedBorderColor,
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
    const normalizedDefaultPhoneNumber =
      typeof defaultPhoneNumber === 'string' &&
      defaultPhoneNumber.length > 0
        ? defaultPhoneNumber
        : typeof defaultValue === 'string' && defaultValue.length > 0
          ? defaultValue
          : '';
    const hasDefaultPhoneNumber = normalizedDefaultPhoneNumber.length > 0;
    const initialExternalValue =
      typeof value === 'string' && value.length > 0
        ? value
        : normalizedDefaultPhoneNumber;
    const isPhoneControlled = typeof value === 'string';
    const isCountryControlled = typeof country !== 'undefined';

    const getE164Seed = (value) => {
      const parsed = tryParseInternational(value);
      if (!parsed) return null;

      const fullFormatted = formatIncompletePhoneNumber(
        `${parsed.callingCode}${parsed.nationalNumber}`
      );
      const nationalFormatted =
        fullFormatted && fullFormatted.startsWith(parsed.callingCode)
          ? fullFormatted.substring(parsed.callingCode.length).trim()
          : parsed.nationalNumber;

      return {
        cca2: parsed.country,
        callingCode: parsed.callingCode,
        nationalDigits: parsed.nationalNumber,
        nationalFormatted,
      };
    };

    const initialE164Seed = getE164Seed(initialExternalValue);

    const initialCountryFromExternalValue = initialE164Seed?.cca2
      ? getCountryByCca2(initialE164Seed.cca2) ||
        getCountryByPhoneNumber(initialExternalValue)
      : null;

    const initialCountryFromDefaultCountry =
      !hasDefaultPhoneNumber && defaultCountry
      ? getCountryByCca2(defaultCountry)
      : null;

    const initialCountry =
      country ||
      initialCountryFromExternalValue ||
      initialCountryFromDefaultCountry ||
      getCountryByCca2('BR');

    const applyCustomMaskLocally = (value) => {
      if (!customMask || typeof value !== 'string') {
        return value;
      }

      const numbers = value.replace(/\D/g, '');
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
    };

    const getInitialFormattedInputValue = () => {
      if (!initialExternalValue) {
        return null;
      }

      // If we got E.164 (+...), format deterministically on the first render.
      if (initialE164Seed) {
        if (customMask) {
          return applyCustomMaskLocally(initialE164Seed.nationalDigits);
        }
        return initialE164Seed.nationalFormatted;
      }

      // Non-E.164: show whatever parent/default passed initially.
      return customMask
        ? applyCustomMaskLocally(initialExternalValue)
        : initialExternalValue;
    };

    const [show, setShow] = useState(false);
    const [inputValueState, setInputValueState] = useState(
      getInitialFormattedInputValue
    );
    const [countryValue, setCountryValue] = useState(initialCountry);
    const currentCountry = isCountryControlled ? country : countryValue;
    const inputValue = isPhoneControlled ? value : inputValueState;

    function setPhoneValue(nextPhoneValue, options = {}) {
      const { emitChange = true } = options;
      if (!isPhoneControlled) {
        setInputValueState(nextPhoneValue);
      }
      if (emitChange && onChangePhoneNumber) {
        onChangePhoneNumber(nextPhoneValue);
      }
    }

    function setCountry(nextCountry) {
      if (!isCountryControlled) {
        setCountryValue(nextCountry);
      }
      if (onChangeCountry) {
        onChangeCountry(nextCountry);
      }
    }

    const resolvedPlaceholder = useMemo(() => {
      // Explicit placeholder always wins (including '' empty string).
      if (typeof placeholder === 'string') {
        return placeholder;
      }
      if (placeholderType === 'number') {
        const example = getExampleForCountry(currentCountry?.cca2);
        if (example) return example;
      }
      // Fall through to translated default behavior.
      return getPhoneNumberInputPlaceholder(language || 'eng');
    }, [placeholder, placeholderType, currentCountry, language]);

    const phoneNumberType = useMemo(() => {
      if (!inputValue || !currentCountry?.idd?.root) return null;
      const fullNumber = `${currentCountry.idd.root}${inputValue.replace(/\D/g, '')}`;
      return getPhoneNumberType(fullNumber);
    }, [inputValue, currentCountry]);

    const prevPhoneNumberTypeRef = useRef(phoneNumberType);
    useEffect(() => {
      if (prevPhoneNumberTypeRef.current === phoneNumberType) return;
      prevPhoneNumberTypeRef.current = phoneNumberType;
      if (onPhoneNumberTypeChange) {
        onPhoneNumberTypeChange(phoneNumberType);
      }
    }, [phoneNumberType, onPhoneNumberTypeChange]);

    const isValid = useMemo(
      () => isValidPhoneNumber(inputValue, currentCountry),
      [inputValue, currentCountry]
    );

    const prevIsValidRef = useRef(isValid);
    useEffect(() => {
      if (prevIsValidRef.current === isValid) return;
      prevIsValidRef.current = isValid;
      if (onValidationChange) {
        onValidationChange(isValid, phoneNumberType, currentCountry);
      }
    }, [isValid, phoneNumberType, currentCountry, onValidationChange]);

    const textInputRef = useRef(null);

    useImperativeHandle(
      ref,
      () => ({
        focus: () => textInputRef.current?.focus(),
        blur: () => textInputRef.current?.blur(),
        clear: () => textInputRef.current?.clear(),
        isFocused: () => textInputRef.current?.isFocused(),
        setNativeProps: (nativeProps) =>
          textInputRef.current?.setNativeProps(nativeProps),
        measure: (callback) =>
          textInputRef.current?.measure(callback),
        measureInWindow: (callback) =>
          textInputRef.current?.measureInWindow(callback),
        measureLayout: (relativeToNativeNode, onSuccess, onFail) =>
          textInputRef.current?.measureLayout(
            relativeToNativeNode,
            onSuccess,
            onFail
          ),

        // Custom methods and properties
        getNationalPhoneNumber: () => inputValue?.replace(/\D/g, ''),
        nationalPhoneNumber: inputValue?.replace(/\D/g, ''),
        getNationalPhoneNumberFormatted: () => inputValue,
        nationalPhoneNumberFormatted: inputValue,
        getInternationalPhoneNumber: () =>
          `${currentCountry?.idd?.root || ''}${
            (inputValue || '').replace(/\D/g, '') || ''
          }`,
        internationalPhoneNumber: `${currentCountry?.idd?.root || ''}${
          (inputValue || '').replace(/\D/g, '') || ''
        }`,
        getInternationalPhoneNumberFormatted: () =>
          `${currentCountry?.idd?.root || ''} ${inputValue || ''}`,
        internationalPhoneNumberFormatted: `${currentCountry?.idd?.root || ''} ${
          inputValue || ''
        }`,
        internationalPhoneNumberLength: getInternationalPhoneNumberLength(
          currentCountry,
          inputValue
        ),
        getCountry: () => currentCountry,
        country: currentCountry,
        isValidPhoneNumber: isValid,
        phoneNumberType,
        getPhoneNumberType: () => phoneNumberType,
        props: {
          theme,
          language,
          placeholder,
          placeholderType,
          phoneInputPlaceholderTextColor,
          phoneInputSelectionColor,
          phoneInputStyles,
          modalStyles,
          disabled,
          modalDisabled,
          defaultCountry,
          defaultPhoneNumber,
          defaultValue,
          value,
          onChangePhoneNumber,
          country,
          onChangeCountry,
          onPhoneNumberTypeChange,
          onValidationChange,
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
          value: inputValue,
          ...rest,
        },
      }),
    );

    function onSelect(country) {
      setShow(false);
      setPhoneValue('');
      setCountry(country);
    }

    function formatPhoneNumberWithCustomMask(phoneNumber, options = {}) {
      const { emitChange = true } = options;
      if (!customMask) {
        return phoneNumber;
      }

      const numbers = (phoneNumber || '').replace(/\D/g, '');

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

      setPhoneValue(result, { emitChange });
    }

    function formatPhoneNumber(phoneNumber, callingCode, options = {}) {
      const { emitChange = true, countryOverride = null } = options;
      const sanitizedPhoneNumber =
        typeof phoneNumber === 'string' ? phoneNumber : '';
      const effectiveCountry = countryOverride || currentCountry;
      try {
        let formattedNumber = '';

        const metadata = new Metadata();
        metadata.selectNumberingPlan(effectiveCountry?.cca2);

        const possibleLengths = effectiveCountry
          ? metadata.possibleLengths()
          : [];

        const validCallingCode = callingCode
          ? callingCode
          : effectiveCountry?.idd?.root;
        const normalizedCallingCode =
          typeof validCallingCode === 'string' ? validCallingCode : '';

        const res = formatIncompletePhoneNumber(
          `${normalizedCallingCode}${sanitizedPhoneNumber}`
        );

        formattedNumber = res;

        if (res.startsWith('0')) {
          formattedNumber = parsePhoneNumber(res)?.formatNational();
        } else {
          if (
            normalizedCallingCode &&
            res &&
            res.startsWith(normalizedCallingCode)
          ) {
            formattedNumber = res
              .substring(normalizedCallingCode.length)
              .trim();
          }
        }

        const basePossibleLength = possibleLengths.slice(-1)[0];
        const maxPossibleLength = Number.isFinite(basePossibleLength)
          ? (formattedNumber.startsWith('0')
            ? basePossibleLength + 1
            : basePossibleLength)
          : Infinity;

        if (formattedNumber?.replace(/\D/g, '')?.length > maxPossibleLength) {
          return;
        }

        setPhoneValue(formattedNumber, { emitChange });
      } catch  {
        setPhoneValue(sanitizedPhoneNumber, { emitChange });
      }
    }

    function onChangeText(phoneNumber, callingCode, options = {}) {
      const { emitChange = true } = options;
      const sanitizedPhoneNumber =
        typeof phoneNumber === 'string' ? phoneNumber : '';

      // Smart paste path: detect international or formatted input.
      const parsed = tryParseInternational(sanitizedPhoneNumber);
      if (parsed) {
        const resolvedCountry = getCountryByCca2(parsed.country);
        if (resolvedCountry) {
          // Build the full international form, then strip the calling-code prefix
          // to leave only the national-format portion stored in the input.
          const fullFormatted = formatIncompletePhoneNumber(
            `${parsed.callingCode}${parsed.nationalNumber}`
          );
          const nationalFormatted =
            fullFormatted && fullFormatted.startsWith(parsed.callingCode)
              ? fullFormatted.substring(parsed.callingCode.length).trim()
              : parsed.nationalNumber;

          if (resolvedCountry.cca2 !== currentCountry?.cca2) {
            setCountry(resolvedCountry);
          }
          if (customMask) {
            return formatPhoneNumberWithCustomMask(nationalFormatted, {
              emitChange,
            });
          }
          // Use country override so we don't race against the setCountry state update.
          return formatPhoneNumber(
            nationalFormatted,
            resolvedCountry?.idd?.root || null,
            { emitChange, countryOverride: resolvedCountry }
          );
        }
      }

      // No international hint or parse failed — treat as typing under currentCountry.
      if (customMask) {
        return formatPhoneNumberWithCustomMask(sanitizedPhoneNumber, {
          emitChange,
        });
      }
      formatPhoneNumber(sanitizedPhoneNumber, callingCode, { emitChange });
    }

    function applyDefaultPhoneNumber(phoneNumber, options = {}) {
      const { emitChange = false } = options;
      if (typeof phoneNumber !== 'string' || phoneNumber.length === 0) {
        return;
      }

      // If it's E.164, format using the same deterministic strategy used for
      // first-render initialization (no dependency on async state updates).
      const seed = getE164Seed(phoneNumber);
      if (seed) {
        const matchingCountry =
          (seed.cca2 ? getCountryByCca2(seed.cca2) : null) ||
          getCountryByPhoneNumber(phoneNumber);

        if (matchingCountry) {
          setCountry(matchingCountry);
        }

        setPhoneValue(
          customMask
            ? applyCustomMaskLocally(seed.nationalDigits)
            : seed.nationalFormatted,
          { emitChange }
        );
        return;
      }

      onChangeText(phoneNumber, null, { emitChange });
    }

    useEffect(() => {
      if (!currentCountry && (!defaultCountry || hasDefaultPhoneNumber)) {
        const defaultCountryValue = getCountryByCca2('BR');
        if (defaultCountryValue) {
          setCountry(defaultCountryValue);
        }
      }
    }, [currentCountry, defaultCountry, hasDefaultPhoneNumber]);

    useEffect(() => {
      if (!hasDefaultPhoneNumber && defaultCountry) {
        const c = getCountryByCca2(defaultCountry);
        if (c) {
          setCountry(c);
        }
      }
    }, [defaultCountry, hasDefaultPhoneNumber]);

    useEffect(() => {
      if (hasDefaultPhoneNumber) {
        applyDefaultPhoneNumber(normalizedDefaultPhoneNumber, {
          emitChange: isPhoneControlled,
        });
      }
    }, [normalizedDefaultPhoneNumber, hasDefaultPhoneNumber, isPhoneControlled]);

    useEffect(() => {
      if (isPhoneControlled) {
        onChangeText(value, null, { emitChange: false });
      }
    }, [value, isPhoneControlled, currentCountry?.cca2]);

    const flagPhoneInput = (
      <>
      {(customFlag &&
            currentCountry &&
            customFlag(currentCountry)) || (
            <Text
              style={getFlagStyle(phoneInputStyles?.flag)}
              allowFontScaling={allowFontScaling}
            >
              {currentCountry?.flag || currentCountry?.cca2}
            </Text>
          )}
      </>
    )

    const caretPhoneInput = (
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
    )
    
    const dividerPhoneInput = (
      <View
          style={getDividerStyle(theme, phoneInputStyles?.divider)}
        />
    )

    const callingCodePhoneInput = (
      <Text
          style={getFlagTextStyle(
            theme,
            phoneInputStyles?.callingCode
          )}
          allowFontScaling={allowFontScaling}
        >
          {currentCountry?.idd?.root}
        </Text>
    )

    const flagContainerPhoneInput = (
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
          onPress={() =>
            disabled || modalDisabled ? null : setShow(true)
          }
          style={[rtl && {
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }, getFlagContainerStyle(
            theme,
            phoneInputStyles?.flagContainer
          )]}
        >
          {/* LTR Display */}
          {!rtl && flagPhoneInput}
          {!rtl && caretPhoneInput}
          {!rtl && dividerPhoneInput}
          {!rtl && callingCodePhoneInput}

          {/* RTL Display */}
          {rtl && callingCodePhoneInput}
          {rtl && dividerPhoneInput}
          {rtl && caretPhoneInput}
          {rtl && flagPhoneInput}
        </TouchableOpacity>
    )

    const inputPhoneInput = (
      <View style={{ direction: 'ltr', flex: 1 }}>
          <TextInput
            {...rest}
            style={[
              getInputStyle(theme, phoneInputStyles?.input),
              rtl !== undefined ? { textAlign: rtl ? 'right' : 'left' } : null,
            ]}
            placeholder={resolvedPlaceholder}
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
            onChangeText={(text) =>
              onChangeText(
                text.replace(/[\u200E\u200F\u061C\u202A-\u202E\u2066-\u2069]/g, '')
              )
            }
            keyboardType="number-pad"
            ref={textInputRef}
            testID="countryPickerPhoneInput"
            accessibilityLabel={
              accessibilityLabelPhoneInput ||
              getPhoneNumberInputAccessibilityLabel(language || 'eng')
            }
            accessibilityHint={
              accessibilityHintPhoneInput ||
              getPhoneNumberInputAccessibilityHint(language || 'eng')
            }
            allowFontScaling={allowFontScaling}
          />
        </View>
    )



      

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
            {!rtl && flagContainerPhoneInput}
            {!rtl && inputPhoneInput}

            {/* RTL Display */}
            {rtl && inputPhoneInput}
            {rtl && flagContainerPhoneInput}
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
                searchSelectionColor={modalSearchInputSelectionColor}
                searchFocusedBorderColor={modalSearchInputFocusedBorderColor}
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
);

export default PhoneInput;

export {
  getAllCountries,
  getNationalPhoneNumber,
  getCountryByPhoneNumber,
  getCountryByCca2,
  getCountriesByCallingCode,
  getCountriesByName,
  isValidPhoneNumber,
  getInternationalPhoneNumberLength,
  getPhoneNumberType,
  usePhoneInput,
};
