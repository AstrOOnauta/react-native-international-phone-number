import {JSX} from 'react';
import {ICountry, ICountrySelectLanguages} from 'react-native-country-select';

import {ITheme} from './interfaces/theme';
import {IPhoneInputRef} from './interfaces/phoneInputRef';
import {PhoneInputProps} from './interfaces/phoneInputProps';

declare function PhoneInput(props: PhoneInputProps): JSX.Element;

declare function getAllCountries(): ICountry[];

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

declare function getPhoneNumberLength(
  selectedCountry: ICountry,
  phoneNumber: string,
): number;

export default PhoneInput;

export {
  getAllCountries,
  getCountryByPhoneNumber,
  getCountryByCca2,
  getCountriesByCallingCode,
  getCountriesByName,
  isValidPhoneNumber,
  getPhoneNumberLength,
  ITheme,
  ICountrySelectLanguages,
  ICountry,
  IPhoneInputRef,
  PhoneInputProps,
};
