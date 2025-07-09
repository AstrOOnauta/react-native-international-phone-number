import {Ref, ReactNode} from 'react';
import {TextInputProps} from 'react-native';
import {
  ICountry,
  ICountryCca2,
  ICountrySelectLanguages,
  ICountrySelectStyle,
} from 'react-native-country-select';

import {ITheme} from './theme';
import {IPhoneInputStyles} from './phoneInputStyles';
import {IPhoneInputRef} from './phoneInputRef';

interface BasePhoneInput extends TextInputProps {
  theme?: ITheme;
  language?: ICountrySelectLanguages;
  placeholder?: string;
  phoneInputPlaceholderTextColor?: string;
  phoneInputSelectionColor?: string;
  phoneInputStyles?: IPhoneInputStyles;
  modalStyles?: ICountrySelectStyle;
  disabled?: boolean;
  modalDisabled?: boolean;
  defaultCountry?: ICountryCca2;
  defaultValue?: string;
  visibleCountries?: Array<ICountryCca2>;
  hiddenCountries?: Array<ICountryCca2>;
  popularCountries?: Array<ICountryCca2>;
  customCaret?: () => ReactNode;
  rtl?: boolean;
  isFullScreen?: boolean;
  modalType?: 'bottomSheet' | 'popup';
  modalSearchInputPlaceholderTextColor?: string;
  modalSearchInputPlaceholder?: string;
  modalSearchInputSelectionColor?: string;
  modalPopularCountriesTitle?: string;
  modalAllCountriesTitle?: string;
  modalSectionTitleComponent?: () => ReactNode;
  modalCountryItemComponent?: () => ReactNode;
  modalCloseButtonComponent?: () => ReactNode;
  modalSectionTitleDisabled?: boolean;
  modalNotFoundCountryMessage?: string;
  disabledModalBackdropPress?: boolean;
  removedModalBackdrop?: boolean;
  onModalBackdropPress?: () => void;
  onModalRequestClose?: () => void;
  showModalSearchInput?: boolean;
  showModalCloseButton?: boolean;
  showModalScrollIndicator?: boolean;
}

interface IPhoneInputPropsWithoutRef extends BasePhoneInput {
  value: string;
  onChangePhoneNumber: (phoneNumber: string) => void;
  selectedCountry: ICountry | undefined | null;
  onChangeSelectedCountry: (country: ICountry) => void;
  ref?: never;
}

interface IPhoneInputPropsWithRef extends BasePhoneInput {
  value?: never;
  onChangePhoneNumber?: never;
  selectedCountry?: never;
  onChangeSelectedCountry?: never;
  ref: Ref<IPhoneInputRef>;
}

export type PhoneInputProps =
  | IPhoneInputPropsWithRef
  | IPhoneInputPropsWithoutRef;
