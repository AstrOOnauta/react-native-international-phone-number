import { TextInput } from 'react-native';

import { ICountry } from './country';
import { PhoneInputProps } from './phoneInputProps';

export interface IPhoneInputRef extends TextInput {
  props: PhoneInputProps;
  onFocus: () => void;
  focus: () => void;
  getValue: () => string;
  value: string;
  getFullPhoneNumber: () => string;
  fullPhoneNumber: string;
  getSelectedCountry: () => ICountry;
  selectedCountry: ICountry;
}
