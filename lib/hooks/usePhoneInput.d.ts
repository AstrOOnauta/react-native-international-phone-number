import { ICountry, ICountryCca2 } from 'rn-country-select';
import { PhoneNumberType } from '../interfaces/phoneNumberType';

export interface UsePhoneInputOptions {
  defaultCountry?: ICountryCca2;
  defaultPhoneNumber?: string;
  /** @deprecated Use defaultPhoneNumber instead. */
  defaultValue?: string;
  value?: string;
  country?: ICountry | null;
  customMask?: string;
  onChangePhoneNumber?: (phoneNumber: string) => void;
  onChangeCountry?: (country: ICountry) => void;
  onPhoneNumberTypeChange?: (type: PhoneNumberType | null) => void;
  onValidationChange?: (
    isValid: boolean,
    type: PhoneNumberType | null,
    country: ICountry,
  ) => void;
}

export interface UsePhoneInputResult {
  nationalPhoneNumber: string;
  nationalPhoneNumberFormatted: string;
  internationalPhoneNumber: string;
  internationalPhoneNumberFormatted: string;
  internationalPhoneNumberLength: number;
  country: ICountry;
  isValidPhoneNumber: boolean;
  phoneNumberType: PhoneNumberType | null;
  setCountry: (country: ICountry) => void;
  setPhoneNumber: (value: string) => void;
  onChangePhoneNumber: (text: string) => void;
}

export default function usePhoneInput(
  options?: UsePhoneInputOptions,
): UsePhoneInputResult;
