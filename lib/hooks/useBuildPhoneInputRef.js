import { useImperativeHandle } from 'react';

import { getInternationalPhoneNumberLength } from '../utils/getPhoneNumberLength';

export default function useBuildPhoneInputRef(ref, params) {
  const {
    textInputRef,
    inputValue,
    currentCountry,
    isValid,
    phoneNumberType,
    propsSnapshot,
  } = params;

  useImperativeHandle(ref, () => ({
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
    props: { ...propsSnapshot, value: inputValue },
  }));
}
