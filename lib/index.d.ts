import { Dispatch, SetStateAction } from 'react';
import {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Country } from 'react-native-country-picker-modal';

interface PhoneInputProps extends TextInputProps {
  placeholder?: string;
  placeholderTextColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  flagContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  withDarkTheme?: boolean;
  disabled?: boolean;
  selectedCountry: undefined | Country;
  setSelectedCountry: Dispatch<SetStateAction<undefined | Country>>;
}

declare function PhoneInput(props: PhoneInputProps): JSX.Element;

declare function phoneMask(
  value: string,
  countryCode?: string
): string;

export { PhoneInput, phoneMask };
