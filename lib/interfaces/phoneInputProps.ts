import * as React from 'react';
import { Ref } from 'react';
import { TextInputProps } from 'react-native';
import {
  ICountry,
  ICountryCca2,
  ICountrySelectLanguages,
  ICountrySelectStyle,
  ISectionTitle,
} from 'react-native-country-select';

import { ITheme } from './theme';
import { IPhoneInputStyles } from './phoneInputStyles';
import { IPhoneInputRef } from './phoneInputRef';

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
  customCaret?: () => React.ReactElement;
  rtl?: boolean;
  allowFontScaling?: boolean;
  isFullScreen?: boolean;
  modalType?: 'bottomSheet' | 'popup';
  minBottomsheetHeight?: number | string;
  maxBottomsheetHeight?: number | string;
  initialBottomsheetHeight?: number | string;
  modalDragHandleIndicatorComponent?: () => React.ReactElement;
  modalSearchInputPlaceholderTextColor?: string;
  modalSearchInputPlaceholder?: string;
  modalSearchInputSelectionColor?: string;
  modalPopularCountriesTitle?: string;
  modalAllCountriesTitle?: string;
  modalSectionTitleComponent?: (
    item: ISectionTitle
  ) => React.ReactElement;
  modalCountryItemComponent?: (item: ICountry) => React.ReactElement;
  modalCloseButtonComponent?: () => React.ReactElement;
  modalSectionTitleDisabled?: boolean;
  modalNotFoundCountryMessage?: string;
  disabledModalBackdropPress?: boolean;
  removedModalBackdrop?: boolean;
  onModalBackdropPress?: (closeModal: () => void) => void;
  onModalRequestClose?: () => void;
  customFlag?: (
    country: ICountry
  ) => React.ReactElement | null | undefined;
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
