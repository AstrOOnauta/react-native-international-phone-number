import {JSX} from 'react';
import {
  ICountry,
  ICountryCca2,
  ICountrySelectLanguages,
  ICountrySelectStyle,
} from 'rn-country-select';

import {ITheme} from './interfaces/theme';
import {IPhoneInputStyles} from './interfaces/phoneInputStyles';
import {IPhoneInputRef} from './interfaces/phoneInputRef';
import {PhoneInputProps} from './interfaces/phoneInputProps';
import {PhoneNumberType} from './interfaces/phoneNumberType';
import usePhoneInput, {
  UsePhoneInputOptions,
  UsePhoneInputResult,
} from './hooks/usePhoneInput';

declare function PhoneInput(props: PhoneInputProps): JSX.Element;

declare function getAllCountries(): ICountry[];

declare function getNationalPhoneNumber(
  phoneNumber: string,
): string;

declare function getCountryByPhoneNumber(
  phoneNumber: string,
): ICountry | undefined;

declare function getCountryByCca2(cca2: string): ICountry | undefined;

declare function getCountriesByCallingCode(
  callingCode: string,
): ICountry[] | undefined;

declare function getCountriesByName(
  name: string,
  language: ICountrySelectLanguages,
): ICountry[] | undefined;

declare function isValidPhoneNumber(
  phoneNumber: string,
  country: ICountry,
): boolean;

declare function getInternationalPhoneNumberLength(
  country: ICountry,
  phoneNumber: string,
): number;

declare function getPhoneNumberType(
  phoneNumber: string,
): PhoneNumberType | null;

export default PhoneInput;

export {
  getAllCountries,
  getNationalPhoneNumber,
  getCountryByPhoneNumber,
  getCountryByCca2,
  getCountriesByCallingCode,
  getCountriesByName,
  isValidPhoneNumber,
  getInternationalPhoneNumberLength,
  getPhoneNumberType,
  PhoneNumberType,
  usePhoneInput,
  UsePhoneInputOptions,
  UsePhoneInputResult,
  ITheme,
  ICountrySelectLanguages,
  ICountrySelectStyle,
  ICountry,
  ICountryCca2,
  IPhoneInputRef,
  IPhoneInputStyles,
  PhoneInputProps,
};
