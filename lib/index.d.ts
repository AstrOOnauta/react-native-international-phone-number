import { Dispatch, SetStateAction } from 'react';
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { Country } from 'react-native-country-picker-modal';

interface PhoneInputProps extends TextInputProps {
  placeholder?: string;
  placeholderTextColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  withDarkTheme?: boolean;
  disabled?: boolean;
  selectedCountry: Country;
  setSelectedCountry: Dispatch<SetStateAction<undefined | Country>>;
}

declare function PhoneInput(props: PhoneInputProps): JSX.Element;

export { PhoneInput };
