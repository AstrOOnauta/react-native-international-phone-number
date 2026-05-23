import { useEffect, useMemo, useRef, useState } from 'react';
import {
  getCountryByCca2,
} from 'rn-country-select';
import parsePhoneNumber, {
  formatIncompletePhoneNumber,
  Metadata,
} from 'libphonenumber-js';

import getCountryByPhoneNumber from '../utils/getCountryByPhoneNumber';
import { getInternationalPhoneNumberLength } from '../utils/getPhoneNumberLength';
import isValidPhoneNumber from '../utils/isValidPhoneNumber';
import getPhoneNumberType from '../utils/getPhoneNumberType';
import tryParseInternational from '../utils/tryParseInternational';

function applyMaskTemplate(value, mask) {
  const numbers = value.replace(/\D/g, '');
  let result = '';
  let numberIndex = 0;
  for (let i = 0; i < mask.length && numberIndex < numbers.length; i++) {
    if (mask[i] === '#') {
      result += numbers[numberIndex];
      numberIndex++;
    } else {
      result += mask[i];
    }
  }
  return result;
}

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

  const initialE164Seed = tryParseInternational(initialExternalValue);

  const initialCountryFromExternalValue = initialE164Seed?.country
    ? getCountryByCca2(initialE164Seed.country) ||
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

  const initialInputValue = (() => {
    if (!initialExternalValue) return '';
    if (initialE164Seed && initialCountry) {
      const full = formatIncompletePhoneNumber(
        `${initialE164Seed.callingCode}${initialE164Seed.nationalNumber}`
      );
      return full && full.startsWith(initialE164Seed.callingCode)
        ? full.substring(initialE164Seed.callingCode.length).trim()
        : initialE164Seed.nationalNumber;
    }
    if (customMask) {
      return applyMaskTemplate(initialExternalValue, customMask);
    }
    return initialExternalValue;
  })();

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

  function formatPhoneNumberInternal(phoneNumber, callingCode, opts = {}) {
    const { emitChange = true, countryOverride = null } = opts;
    const sanitizedPhoneNumber = typeof phoneNumber === 'string' ? phoneNumber : '';
    const effectiveCountry = countryOverride || currentCountry;
    try {
      let formattedNumber = '';
      const metadata = new Metadata();
      metadata.selectNumberingPlan(effectiveCountry?.cca2);
      const possibleLengths = effectiveCountry ? metadata.possibleLengths() : [];
      const validCallingCode = callingCode ? callingCode : effectiveCountry?.idd?.root;
      const normalizedCallingCode = typeof validCallingCode === 'string' ? validCallingCode : '';
      const res = formatIncompletePhoneNumber(`${normalizedCallingCode}${sanitizedPhoneNumber}`);
      formattedNumber = res;
      if (res.startsWith('0')) {
        formattedNumber = parsePhoneNumber(res)?.formatNational();
      } else if (normalizedCallingCode && res && res.startsWith(normalizedCallingCode)) {
        formattedNumber = res.substring(normalizedCallingCode.length).trim();
      }
      const basePossibleLength = possibleLengths.slice(-1)[0];
      const maxPossibleLength = Number.isFinite(basePossibleLength)
        ? (formattedNumber.startsWith('0') ? basePossibleLength + 1 : basePossibleLength)
        : Infinity;
      if (formattedNumber?.replace(/\D/g, '')?.length > maxPossibleLength) return;
      setPhoneValue(formattedNumber, { emitChange });
    } catch {
      setPhoneValue(sanitizedPhoneNumber, { emitChange });
    }
  }

  function formatPhoneNumberWithCustomMaskInternal(phoneNumber, opts = {}) {
    const { emitChange = true } = opts;
    if (!customMask || !phoneNumber) {
      setPhoneValue(phoneNumber || '', { emitChange });
      return;
    }
    setPhoneValue(applyMaskTemplate(phoneNumber, customMask), { emitChange });
  }

  function onChangePhoneNumberInternal(phoneNumber, callingCode, opts = {}) {
    const { emitChange = true } = opts;
    const sanitizedPhoneNumber = typeof phoneNumber === 'string' ? phoneNumber : '';

    const parsed = tryParseInternational(sanitizedPhoneNumber);
    if (parsed) {
      const resolvedCountry = getCountryByCca2(parsed.country);
      if (resolvedCountry) {
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
          return formatPhoneNumberWithCustomMaskInternal(nationalFormatted, { emitChange });
        }
        return formatPhoneNumberInternal(
          nationalFormatted,
          resolvedCountry?.idd?.root || null,
          { emitChange, countryOverride: resolvedCountry }
        );
      }
    }

    if (customMask) {
      return formatPhoneNumberWithCustomMaskInternal(sanitizedPhoneNumber, { emitChange });
    }
    formatPhoneNumberInternal(sanitizedPhoneNumber, callingCode, { emitChange });
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
