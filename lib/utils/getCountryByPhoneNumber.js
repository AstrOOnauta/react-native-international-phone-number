import parsePhoneNumber from 'libphonenumber-js';
import {getCountryByCca2} from 'react-native-country-select';

export default function getCountryByPhoneNumber(phoneNumber) {
  const matchingCountry = getCountryByCca2(
    parsePhoneNumber(phoneNumber)?.getPossibleCountries()[0],
  );

  return matchingCountry;
}
