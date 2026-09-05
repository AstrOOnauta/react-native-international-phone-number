/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useMemo,
} from 'react';
import { View, Platform } from 'react-native';
import CountrySelect, {
  getAllCountries,
  getCountriesByName,
  getCountriesByCallingCode,
  getCountryByCca2,
} from 'rn-country-select';

import FlagContainer from './components/FlagContainer.js';
import PhoneTextInput from './components/PhoneTextInput.js';

import getCountryByPhoneNumber from './utils/getCountryByPhoneNumber.js';
import {
  getInternationalPhoneNumberLength,
} from './utils/getPhoneNumberLength.js';
import getNationalPhoneNumber from './utils/getNationalPhoneNumber.js';
import isValidPhoneNumber from './utils/isValidPhoneNumber.js';
import getPhoneNumberType from './utils/getPhoneNumberType.js';
import getExampleForCountry from './utils/getExampleForCountry.js';
import { getPhoneNumberInputPlaceholder } from './utils/getTranslations.js';
import { getContainerStyle } from './utils/getStyles.js';
import { COUNTRIES_WITHOUT_NUMBERING_PLAN } from './utils/getCallingCode.js';
import usePhoneInput from './hooks/usePhoneInput.js';
import useBuildPhoneInputRef from './hooks/useBuildPhoneInputRef.js';

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
    const isPhoneControlled = typeof value === 'string';

    const [show, setShow] = useState(false);

    const data = usePhoneInput({
      defaultCountry,
      defaultPhoneNumber,
      defaultValue,
      value,
      country,
      customMask,
      onChangePhoneNumber,
      onChangeCountry,
      onPhoneNumberTypeChange,
      onValidationChange,
    });

    const {
      nationalPhoneNumberFormatted: inputValue,
      country: currentCountry,
      isValidPhoneNumber: isValid,
      phoneNumberType,
      nationalPhoneNumber,
      internationalPhoneNumber,
      internationalPhoneNumberFormatted,
      internationalPhoneNumberLength,
      setCountry,
      setPhoneNumber,
      onChangePhoneNumber: onChangeText,
    } = data;

    const resolvedPlaceholder = useMemo(() => {
      // Explicit placeholder always wins (including '' empty string).
      if (typeof placeholder === 'string') {
        return placeholder;
      }
      if (placeholderType === 'number') {
        const example = getExampleForCountry(currentCountry?.cca2);
        if (example) return example;
      }
      return getPhoneNumberInputPlaceholder(language);
    }, [placeholder, placeholderType, currentCountry, language]);

    const textInputRef = useRef(null);

    useBuildPhoneInputRef(ref, {
      textInputRef,
      inputValue,
      currentCountry,
      isValid,
      phoneNumberType,
      setPhoneNumber,
      nationalPhoneNumber,
      internationalPhoneNumber,
      internationalPhoneNumberFormatted,
      internationalPhoneNumberLength,
      propsSnapshot: {
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
        ...rest,
      },
    });

    function onSelect(country) {
      setShow(false);
      setPhoneNumber('');
      setCountry(country);
    }

    useEffect(() => {
      if (!currentCountry && (!defaultCountry || hasDefaultPhoneNumber)) {
        const defaultCountryValue = getCountryByCca2('BR');
        if (defaultCountryValue) {
          setCountry(defaultCountryValue);
        }
      }
    }, [currentCountry, defaultCountry, hasDefaultPhoneNumber]);

    const didInitialDefaultCountryRef = useRef(false);
    useEffect(() => {
      if (!hasDefaultPhoneNumber && defaultCountry) {
        const c = getCountryByCca2(defaultCountry);
        if (c) {
          setCountry(c);
          // After mount, dynamic defaultCountry change clears stale input
          // (digits from prior country don't fit the new country's format).
          if (didInitialDefaultCountryRef.current) {
            setPhoneNumber('', { emitChange: false });
          }
        }
      }
      didInitialDefaultCountryRef.current = true;
    }, [defaultCountry, hasDefaultPhoneNumber]);

    // Re-apply defaultPhoneNumber on prop change. setPhoneNumber routes through
    // the hook's smart-paste pipeline (country detect + format). emitChange=false
    // when uncontrolled preserves the original mount-silent behavior.
    useEffect(() => {
      if (hasDefaultPhoneNumber) {
        setPhoneNumber(normalizedDefaultPhoneNumber, {
          emitChange: isPhoneControlled,
        });
      }
    }, [normalizedDefaultPhoneNumber, hasDefaultPhoneNumber, isPhoneControlled]);

    // Sync parent's controlled state on mount when only a silent fallback
    // (e.g. BR) was applied. Skipped when defaultCountry or defaultPhoneNumber
    // is set, because the existing effects above already notify the parent.
    const didCountryMountSyncRef = useRef(false);
    useEffect(() => {
      if (didCountryMountSyncRef.current) return;
      didCountryMountSyncRef.current = true;
      if (
        typeof country === 'undefined' &&
        !defaultCountry &&
        !hasDefaultPhoneNumber &&
        currentCountry &&
        onChangeCountry
      ) {
        onChangeCountry(currentCountry);
      }
    }, []);

    const flagContainerPhoneInput = (
      <FlagContainer
        currentCountry={currentCountry}
        theme={theme}
        language={language}
        phoneInputStyles={phoneInputStyles}
        customFlag={customFlag}
        customCaret={customCaret}
        allowFontScaling={allowFontScaling}
        disabled={disabled}
        modalDisabled={modalDisabled}
        accessibilityLabelCountriesButton={accessibilityLabelCountriesButton}
        accessibilityHintCountriesButton={accessibilityHintCountriesButton}
        rtl={rtl}
        onPress={() => setShow(true)}
      />
    );

    const inputPhoneInput = (
      <PhoneTextInput
        ref={textInputRef}
        rest={rest}
        theme={theme}
        phoneInputStyles={phoneInputStyles}
        rtl={rtl}
        placeholder={resolvedPlaceholder}
        placeholderTextColor={phoneInputPlaceholderTextColor}
        selectionColor={phoneInputSelectionColor}
        disabled={disabled}
        value={inputValue}
        onChangeText={onChangeText}
        language={language}
        allowFontScaling={allowFontScaling}
        accessibilityLabel={accessibilityLabelPhoneInput}
        accessibilityHint={accessibilityHintPhoneInput}
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
                    ? [...COUNTRIES_WITHOUT_NUMBERING_PLAN, ...hiddenCountries]
                    : COUNTRIES_WITHOUT_NUMBERING_PLAN
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
                showsVerticalScrollIndicator={showModalScrollIndicator}
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
