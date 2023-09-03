import {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { ICountry } from './country';
import { Ref } from 'react';
import { IPhoneInputRef } from './phoneInputRef';

interface IPhoneInputPropsWithoutRef extends TextInputProps {
  placeholder?: string;
  placeholderTextColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  flagContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  withDarkTheme?: boolean;
  disabled?: boolean;
  modalDisabled?: boolean;
  defaultValue?: string;
  value: string;
  onChangePhoneNumber: (phoneNumber: string) => void;
  selectedCountry: undefined | ICountry;
  onChangeSelectedCountry: (country: ICountry) => void;
  ref?: never;
}

interface IPhoneInputPropsWithRef extends TextInputProps {
  placeholder?: string;
  placeholderTextColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  flagContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  withDarkTheme?: boolean;
  disabled?: boolean;
  modalDisabled?: boolean;
  defaultValue?: string;
  value?: never;
  onChangePhoneNumber?: never;
  selectedCountry?: never;
  onChangeSelectedCountry?: never;
  ref: Ref<IPhoneInputRef>;
}

export type PhoneInputProps =
  | IPhoneInputPropsWithRef
  | IPhoneInputPropsWithoutRef;
