import { countries } from '../constants/countries';

export default function getCountriesByCallingCode(callingCode) {
  const formatedCallingCode = String(callingCode).includes('+')
    ? callingCode
    : `+${callingCode}`;

  const matchingCountries = countries.filter((country) => {
    return country.callingCode === formatedCallingCode;
  });

  const formatedCountries = [];

  matchingCountries.forEach((country) => {
    formatedCountries.push({
      name: country.name,
      cca2: country.cca2,
      flag: country.flag,
      callingCode: country.callingCode,
    });
  });

  return formatedCountries;
}
