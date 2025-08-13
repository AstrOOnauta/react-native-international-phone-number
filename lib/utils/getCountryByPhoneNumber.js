import parsePhoneNumber from 'libphonenumber-js';
import {
  getCountryByCca2,
  getCountriesByCallingCode,
} from 'react-native-country-select';

export default function getCountryByPhoneNumber(phoneNumber) {
  const country = parsePhoneNumber(phoneNumber)?.getPossibleCountries()[0];
  let matchingCountry = getCountryByCca2(country);

  if (!matchingCountry) {
    const callingCode = parsePhoneNumber(
      phoneNumber,
    )?.countryCallingCode.includes('+')
      ? parsePhoneNumber(phoneNumber)?.countryCallingCode
      : `+${parsePhoneNumber(phoneNumber)?.countryCallingCode}`;

    matchingCountry = getCountriesByCallingCode(callingCode)[0];
  }

  return matchingCountry;
}
