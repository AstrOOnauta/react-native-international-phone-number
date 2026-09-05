import { useImperativeHandle } from 'react';

// A projection of what `usePhoneInput` already computed. Deriving these values again
// here would parse the number twice per keystroke and let the two surfaces drift.
export default function useBuildPhoneInputRef(ref, params) {
  const {
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
    propsSnapshot,
  } = params;

  useImperativeHandle(ref, () => ({
    focus: () => textInputRef.current?.focus(),
    blur: () => textInputRef.current?.blur(),
    isFocused: () => textInputRef.current?.isFocused(),
    // The TextInput is controlled, so its native clear() is undone on the next render.
    clear: () => setPhoneNumber(''),
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

    getNationalPhoneNumber: () => nationalPhoneNumber,
    nationalPhoneNumber,
    getNationalPhoneNumberFormatted: () => inputValue,
    nationalPhoneNumberFormatted: inputValue,
    getInternationalPhoneNumber: () => internationalPhoneNumber,
    internationalPhoneNumber,
    getInternationalPhoneNumberFormatted: () =>
      internationalPhoneNumberFormatted,
    internationalPhoneNumberFormatted,
    internationalPhoneNumberLength,
    getCountry: () => currentCountry,
    country: currentCountry,
    isValidPhoneNumber: isValid,
    phoneNumberType,
    getPhoneNumberType: () => phoneNumberType,
    props: { ...propsSnapshot, value: inputValue },
  }));
}
