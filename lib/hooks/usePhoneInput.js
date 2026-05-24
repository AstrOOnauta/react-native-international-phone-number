import { useEffect, useMemo, useRef, useState } from 'react';
import { getCountryByCca2 } from 'rn-country-select';

import getCountryByPhoneNumber from '../utils/getCountryByPhoneNumber';
import { getInternationalPhoneNumberLength } from '../utils/getPhoneNumberLength';
import isValidPhoneNumber from '../utils/isValidPhoneNumber';
import getPhoneNumberType from '../utils/getPhoneNumberType';
import getE164Seed from '../utils/getE164Seed';
import getInitialFormattedInputValue from '../utils/getInitialFormattedInputValue';
import formatPhoneNumberValue from '../utils/formatPhoneNumberValue';
import applyMaskTemplate from '../utils/applyMaskTemplate';

export default function usePhoneInput(options = {}) {
  const {
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
  } = options;

  const normalizedDefaultPhoneNumber =
    typeof defaultPhoneNumber === 'string' && defaultPhoneNumber.length > 0
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

  const initialInputValue = getInitialFormattedInputValue(
    initialExternalValue,
    initialE164Seed,
    customMask
  );

  const [inputValueState, setInputValueState] = useState(initialInputValue);
  const [countryValue, setCountryValue] = useState(initialCountry);

  const currentCountry = isCountryControlled ? country : countryValue;
  const inputValue = isPhoneControlled ? value : inputValueState;

  const phoneNumberType = useMemo(() => {
    if (!inputValue || !currentCountry?.idd?.root) return null;
    const fullNumber = `${currentCountry.idd.root}${inputValue.replace(/\D/g, '')}`;
    return getPhoneNumberType(fullNumber);
  }, [inputValue, currentCountry]);

  const isValid = useMemo(
    () => isValidPhoneNumber(inputValue, currentCountry),
    [inputValue, currentCountry]
  );

  const internationalPhoneNumberLength = useMemo(
    () => getInternationalPhoneNumberLength(currentCountry, inputValue),
    [currentCountry, inputValue]
  );

  function setPhoneValue(nextPhoneValue, opts = {}) {
    const { emitChange = true } = opts;
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

  function onChangePhoneNumberInternal(phoneNumber, callingCode, opts = {}) {
    const { emitChange = true } = opts;
    const sanitizedPhoneNumber =
      typeof phoneNumber === 'string' ? phoneNumber : '';

    // Smart paste path: detect international or formatted input.
    const seed = getE164Seed(sanitizedPhoneNumber);
    if (seed) {
      const resolvedCountry = getCountryByCca2(seed.cca2);
      if (resolvedCountry) {
        if (resolvedCountry.cca2 !== currentCountry?.cca2) {
          setCountry(resolvedCountry);
        }
        if (customMask) {
          setPhoneValue(applyMaskTemplate(seed.nationalDigits, customMask), {
            emitChange,
          });
        } else {
          setPhoneValue(seed.nationalFormatted, { emitChange });
        }
        return;
      }
    }

    // Typing path under currentCountry.
    if (customMask) {
      setPhoneValue(applyMaskTemplate(sanitizedPhoneNumber, customMask), {
        emitChange,
      });
      return;
    }
    const result = formatPhoneNumberValue(
      sanitizedPhoneNumber,
      callingCode,
      currentCountry
    );
    if (result !== null) {
      setPhoneValue(result, { emitChange });
    }
  }

  const prevTypeRef = useRef(phoneNumberType);
  useEffect(() => {
    if (prevTypeRef.current === phoneNumberType) return;
    prevTypeRef.current = phoneNumberType;
    if (onPhoneNumberTypeChange) {
      onPhoneNumberTypeChange(phoneNumberType);
    }
  }, [phoneNumberType, onPhoneNumberTypeChange]);

  const prevValidRef = useRef(isValid);
  useEffect(() => {
    if (prevValidRef.current === isValid) return;
    prevValidRef.current = isValid;
    if (onValidationChange) {
      onValidationChange(isValid, phoneNumberType, currentCountry);
    }
  }, [isValid, phoneNumberType, currentCountry, onValidationChange]);

  const nationalPhoneNumber = inputValue?.replace(/\D/g, '') || '';
  const internationalPhoneNumber = `${currentCountry?.idd?.root || ''}${nationalPhoneNumber}`;
  const internationalPhoneNumberFormatted = `${currentCountry?.idd?.root || ''} ${inputValue || ''}`;

  return {
    nationalPhoneNumber,
    nationalPhoneNumberFormatted: inputValue || '',
    internationalPhoneNumber,
    internationalPhoneNumberFormatted,
    internationalPhoneNumberLength,
    country: currentCountry,
    isValidPhoneNumber: isValid,
    phoneNumberType,
    setCountry,
    setPhoneNumber: (nextValue) => onChangePhoneNumberInternal(nextValue, null),
    onChangePhoneNumber: (text) => onChangePhoneNumberInternal(text, null),
  };
}
