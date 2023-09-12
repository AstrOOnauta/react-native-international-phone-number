import { ITheme } from './interfaces/theme';
import { ICountry } from './interfaces/country';
import { ILanguage } from './interfaces/language';
import { IPhoneInputRef } from './interfaces/phoneInputRef';
import { PhoneInputProps } from './interfaces/phoneInputProps';

declare function PhoneInput(props: PhoneInputProps): JSX.Element;

declare function getAllCountries(): ICountry[];

declare function getCountryByPhoneNumber(
  phoneNumber: string
): ICountry | undefined;

declare function getCountryByCca2(cca2: string): ICountry | undefined;

declare function getCountriesByCallingCode(
  callingCode: string
): ICountry[] | undefined;

declare function getCountriesByName(
  name: string,
  language: ILanguage
): ICountry[] | undefined;

export default PhoneInput;

export {
  getAllCountries,
  getCountryByPhoneNumber,
  getCountryByCca2,
  getCountriesByCallingCode,
  getCountriesByName,
  ITheme,
  ILanguage,
  ICountry,
  IPhoneInputRef,
  PhoneInputProps,
};
