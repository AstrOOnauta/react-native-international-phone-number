import { countries } from '../constants/countries';

export default function getCountriesByName(name, language) {
  const matchingCountries = countries.filter((country) => {
    return country.name[language || 'en'].includes(name);
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
