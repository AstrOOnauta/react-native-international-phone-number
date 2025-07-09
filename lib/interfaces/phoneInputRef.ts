import {TextInput} from 'react-native';
import {ICountry} from 'react-native-country-select';

import {PhoneInputProps} from './phoneInputProps';

export interface IPhoneInputRef extends TextInput {
  props: PhoneInputProps;
  onFocus: () => void;
  focus: () => void;
  getValue: () => string;
  value: string;
  getValueFormatted: () => string;
  valueFormatted: string;
  getFullPhoneNumber: () => string;
  fullPhoneNumber: string;
  getSelectedCountry: () => ICountry;
  selectedCountry: ICountry;
  isValid: boolean;
}
