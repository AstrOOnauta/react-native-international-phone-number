import { TextInput } from 'react-native';
import { ICountry } from 'rn-country-select';

import { PhoneInputProps } from './phoneInputProps';

export interface IPhoneInputRef extends TextInput {
  props: PhoneInputProps;
  // Métodos nativos do TextInput
  onFocus: () => void;
  focus: () => void;
  blur: () => void;
  clear: () => void;
  isFocused: () => boolean;
  setNativeProps: (nativeProps: object) => void;
  measure: (
    callback: (
      x: number,
      y: number,
      width: number,
      height: number,
      pageX: number,
      pageY: number
    ) => void
  ) => void;
  measureInWindow: (
    callback: (
      x: number,
      y: number,
      width: number,
      height: number
    ) => void
  ) => void;
  measureLayout: (
    relativeToNativeNode: number,
    onSuccess: (
      x: number,
      y: number,
      width: number,
      height: number
    ) => void,
    onFail: () => void
  ) => void;
  getValue: () => string;
  value: string;
  getValueFormatted: () => string;
  valueFormatted: string;
  getFullPhoneNumber: () => string;
  fullPhoneNumber: string;
  phoneNumberLength: number;
  getSelectedCountry: () => ICountry;
  selectedCountry: ICountry;
  isValid: boolean;
}
