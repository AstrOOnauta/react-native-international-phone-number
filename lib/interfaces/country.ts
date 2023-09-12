import { ICountryName } from './countryName';

export interface ICountry {
  callingCode: string;
  cca2: string;
  flag: string;
  name: ICountryName;
}
