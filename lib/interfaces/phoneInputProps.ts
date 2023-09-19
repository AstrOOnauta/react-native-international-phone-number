import { Ref } from 'react';
import {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { ICountry } from './country';
import { ICountryCca2 } from './countryCca2';
import { ILanguage } from './language';
import { ITheme } from './theme';
import { IModalStyle } from './modalStyle';
import { IPhoneInputRef } from './phoneInputRef';

interface IPhoneInputPropsWithoutRef extends TextInputProps {
  language?: ILanguage;
  placeholder?: string;
  placeholderTextColor?: string;
  selectionColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  flagContainerStyle?: StyleProp<ViewStyle>;
  flagTextStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  modalStyle?: IModalStyle;
  theme?: ITheme;
  disabled?: boolean;
  modalDisabled?: boolean;
  modalHeight?: number | string;
  defaultCountry?: ICountryCca2;
  defaultValue?: string;
  value: string;
  onChangePhoneNumber: (phoneNumber: string) => void;
  selectedCountry: ICountry | undefined | null;
  onChangeSelectedCountry: (country: ICountry) => void;
  customMask?: Array<string>;
  ref?: never;
}

interface IPhoneInputPropsWithRef extends TextInputProps {
  language?: ILanguage;
  placeholder?: string;
  placeholderTextColor?: string;
  selectionColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  flagContainerStyle?: StyleProp<ViewStyle>;
  flagTextStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  modalStyle?: IModalStyle;
  theme?: ITheme;
  disabled?: boolean;
  modalDisabled?: boolean;
  modalHeight?: number | string;
  defaultCountry?: ICountryCca2;
  defaultValue?: string;
  value?: never;
  onChangePhoneNumber?: never;
  selectedCountry?: never;
  onChangeSelectedCountry?: never;
  customMask?: Array<string>;
  ref: Ref<IPhoneInputRef>;
}

export type PhoneInputProps =
  | IPhoneInputPropsWithRef
  | IPhoneInputPropsWithoutRef;
