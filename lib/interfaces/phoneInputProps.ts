import {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { ICountry } from './country';

export interface PhoneInputProps extends TextInputProps {
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
}
