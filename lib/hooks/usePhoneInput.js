import { useEffect, useMemo, useRef, useState } from 'react';
import { getCountryByCca2 } from 'rn-country-select';

import getCountryByPhoneNumber from '../utils/getCountryByPhoneNumber.js';
import isValidPhoneNumber from '../utils/isValidPhoneNumber.js';
import getPhoneNumberType from '../utils/getPhoneNumberType.js';
import getE164Seed from '../utils/getE164Seed.js';
import getPhoneNumberParts from '../utils/getPhoneNumberParts.js';
import getInitialFormattedInputValue from '../utils/getInitialFormattedInputValue.js';
import formatPhoneNumberValue from '../utils/formatPhoneNumberValue.js';
import applyMaskTemplate from '../utils/applyMaskTemplate.js';

// Never equal to a real validity or line type, so the first effect run counts as a
// transition.
const UNREPORTED = Symbol('unreported');

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

  // Parsed once per keystroke; everything below derives from this.
  const {
    national: nationalPhoneNumber,
    international: internationalPhoneNumber,
    internationalFormatted: internationalPhoneNumberFormatted,
  } = useMemo(
    () => getPhoneNumberParts(inputValue, currentCountry),
    [inputValue, currentCountry]
  );

  const phoneNumberType = useMemo(() => {
    if (!inputValue || !currentCountry) return null;
    return getPhoneNumberType(internationalPhoneNumber);
  }, [inputValue, currentCountry, internationalPhoneNumber]);

  const isValid = useMemo(
    () => isValidPhoneNumber(inputValue, currentCountry),
    [inputValue, currentCountry]
  );

  const internationalPhoneNumberLength = internationalPhoneNumber.replace(
    /\D/g,
    ''
  ).length;

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
    const { emitChange = true, fromTyping = false } = opts;
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

    // `null` means the number overflows the country's plan. While typing that means
    // "ignore this keystroke", and the previous value stands. A programmatic set has no
    // previous value to stand on — under a controlled `value` the parent is simply never
    // told, which turns `defaultPhoneNumber` into a silent no-op. Keep the raw value so
    // it stays visible and `isValidPhoneNumber` can report it as invalid.
    if (result === null && fromTyping) {
      return;
    }

    setPhoneValue(result === null ? sanitizedPhoneNumber : result, {
      emitChange,
    });
  }

  // Both callbacks below fire on transitions only. A pre-filled input seeds UNREPORTED
  // so its initial state still gets reported — otherwise a form opening on a valid
  // number is never told. An empty one seeds its real state and stays silent, rather
  // than announcing "invalid" before the user has typed.
  const startsPrefilled = Boolean(inputValue);

  const prevTypeRef = useRef(startsPrefilled ? UNREPORTED : phoneNumberType);
  useEffect(() => {
    if (prevTypeRef.current === phoneNumberType) return;
    prevTypeRef.current = phoneNumberType;
    if (onPhoneNumberTypeChange) {
      onPhoneNumberTypeChange(phoneNumberType);
    }
  }, [phoneNumberType, onPhoneNumberTypeChange]);

  const prevValidRef = useRef(startsPrefilled ? UNREPORTED : isValid);
  useEffect(() => {
    if (prevValidRef.current === isValid) return;
    prevValidRef.current = isValid;
    if (onValidationChange) {
      onValidationChange(isValid, phoneNumberType, currentCountry);
    }
  }, [isValid, phoneNumberType, currentCountry, onValidationChange]);

  // Controlled `value` country re-detect: when the parent updates the
  // controlled value to a new E.164 number, switch the country accordingly.
  useEffect(() => {
    if (!isPhoneControlled || !value) return;
    const seed = getE164Seed(value);
    if (!seed) return;
    const resolvedCountry = getCountryByCca2(seed.cca2);
    if (resolvedCountry && resolvedCountry.cca2 !== currentCountry?.cca2) {
      setCountry(resolvedCountry);
    }
  }, [value, isPhoneControlled, currentCountry?.cca2]);

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
    setPhoneNumber: (nextValue, opts) =>
      onChangePhoneNumberInternal(nextValue, null, opts),
    onChangePhoneNumber: (text) =>
      onChangePhoneNumberInternal(text, null, { fromTyping: true }),
  };
}
