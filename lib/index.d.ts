import {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface ICountry {
  callingCode: string;
  cca2: string;
  flag: string;
  name: string;
}

interface PhoneInputProps extends TextInputProps {
  placeholder?: string;
  placeholderTextColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  flagContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  withDarkTheme?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  value: string;
  onChangePhoneNumber: (phoneNumber: string) => void;
  selectedCountry: undefined | ICountry;
  onChangeSelectedCountry: (country: ICountry) => void;
}

declare function PhoneInput(props: PhoneInputProps): JSX.Element;

declare function getCountryByPhoneNumber(
  phoneNumber: string
): ICountry | undefined;

export { PhoneInput, ICountry, getCountryByPhoneNumber };
