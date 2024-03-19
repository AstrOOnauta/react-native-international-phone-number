import React, { Ref, ReactNode } from 'react';
import { TextInputProps } from 'react-native';

import { ICountry } from './country';
import { ICountryCca2 } from './countryCca2';
import { ILanguage } from './language';
import { ITheme } from './theme';
import { IModalStyles } from './modalStyles';
import { IPhoneInputStyles } from './phoneInputStyles';
import { IPhoneInputRef } from './phoneInputRef';

interface BasePhoneInput extends TextInputProps {
  language?: ILanguage;
  placeholder?: string;
  placeholderTextColor?: string;
  selectionColor?: string;
  phoneInputStyles?: IPhoneInputStyles;
  modalStyles?: IModalStyles;
  theme?: ITheme;
  disabled?: boolean;
  modalDisabled?: boolean;
  modalHeight?: number | string;
  defaultCountry?: ICountryCca2;
  defaultValue?: string;
  customMask?: Array<string>;
  showOnly?: Array<ICountryCca2>;
  excludedCountries?: Array<ICountryCca2>;
  popularCountries?: Array<ICountryCca2>;
  modalSearchInputPlaceholder?: string;
  modalSearchInputPlaceholderTextColor?: string;
  modalSearchInputSelectionColor?: string;
  modalNotFoundCountryMessage?: string;
  customCaret?: ReactNode;
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
