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
  customMask?: string;
  visibleCountries?: Array<ICountryCca2>;
  hiddenCountries?: Array<ICountryCca2>;
  popularCountries?: Array<ICountryCca2>;
  customCaret?: () => ReactNode;
  rtl?: boolean;
  allowFontScaling?: boolean;
  isFullScreen?: boolean;
  modalType?: 'bottomSheet' | 'popup';
  modalDragHandleIndicatorComponent?: () => ReactNode;
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
  showModalAlphabetFilter?: boolean;
  showModalSearchInput?: boolean;
  showModalCloseButton?: boolean;
  showModalScrollIndicator?: boolean;
  accessibilityLabelPhoneInput?: string;
  accessibilityHintPhoneInput?: string;
  accessibilityLabelCountriesButton?: string;
  accessibilityHintCountriesButton?: string;
  accessibilityLabelBackdrop?: string;
  accessibilityHintBackdrop?: string;
  accessibilityLabelCloseButton?: string;
  accessibilityHintCloseButton?: string;
  accessibilityLabelSearchInput?: string;
  accessibilityHintSearchInput?: string;
  accessibilityLabelCountriesList?: string;
  accessibilityHintCountriesList?: string;
  accessibilityLabelCountryItem?: string;
  accessibilityHintCountryItem?: string;
  accessibilityLabelAlphabetFilter?: string;
  accessibilityHintAlphabetFilter?: string;
  accessibilityLabelAlphabetLetter?: string;
  accessibilityHintAlphabetLetter?: string;
}

interface PhoneInputPropsWithoutRef extends BasePhoneInput {
  value: string;
  onChangePhoneNumber: (phoneNumber: string) => void;
  selectedCountry: ICountry | undefined | null;
  onChangeSelectedCountry: (country: ICountry) => void;
  ref?: Ref<IPhoneInputRef>;
}

interface PhoneInputPropsWithRef extends BasePhoneInput {
  ref: Ref<IPhoneInputRef>;
  value?: string;
  onChangePhoneNumber?: (phoneNumber: string) => void;
  selectedCountry?: ICountry | undefined | null;
  onChangeSelectedCountry?: (country: ICountry) => void;
}

export type PhoneInputProps =
  | PhoneInputPropsWithoutRef
  | PhoneInputPropsWithRef;
