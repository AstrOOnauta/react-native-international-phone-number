import { ICountry } from './interfaces/country';
import { IPhoneInputRef } from './interfaces/phoneInputRef';
import { PhoneInputProps } from './interfaces/phoneInputProps';

declare function PhoneInput(props: PhoneInputProps): JSX.Element;

declare function getAllCountries(): ICountry[];

declare function getCountryByPhoneNumber(
  phoneNumber: string
): ICountry | undefined;

declare function getCountryByCca2(
  phoneNumber: string
): ICountry | undefined;

declare function getCountriesByCallingCode(
  phoneNumber: string
): ICountry[] | undefined;

declare function getCountriesByName(
  phoneNumber: string
): ICountry[] | undefined;

export {
  PhoneInput,
  getAllCountries,
  getCountryByPhoneNumber,
  getCountryByCca2,
  getCountriesByCallingCode,
  getCountriesByName,
  ICountry,
  IPhoneInputRef,
  PhoneInputProps,
};
