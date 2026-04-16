import { TextInput } from 'react-native';
import { ICountry } from 'rn-country-select';

import { PhoneInputProps } from './phoneInputProps';

export interface IPhoneInputRef extends TextInput {
  props: PhoneInputProps;
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
  getNationalPhoneNumber: () => string;
  nationalPhoneNumber: string;
  getNationalPhoneNumberFormatted: () => string;
  nationalPhoneNumberFormatted: string;
  getInternationalPhoneNumber: () => string;
  internationalPhoneNumber: string;
  getInternationalPhoneNumberFormatted: () => string;
  internationalPhoneNumberFormatted: string;
  internationalPhoneNumberLength: number;
  getCountry: () => ICountry;
  country: ICountry;
  isValidPhoneNumber: boolean;
}
