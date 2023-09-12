import { countries } from '../constants/countries';

export default function getAllCountries() {
  const formatedCountries = [];

  countries.forEach((country) => {
    formatedCountries.push({
      name: country.name,
      cca2: country.cca2,
      flag: country.flag,
      callingCode: country.callingCode,
    });
  });

  return formatedCountries;
}
