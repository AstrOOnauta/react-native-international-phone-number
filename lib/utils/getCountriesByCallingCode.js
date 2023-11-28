import { countries } from '../constants/countries';

export default function getCountriesByCallingCode(callingCode) {
  const formatedCallingCode = String(callingCode).includes('+')
    ? callingCode
    : `+${callingCode}`;

  if (formatedCallingCode.includes('+1')) {
    const matchingCountries = countries.filter((country) => {
      return formatedCallingCode.includes(country.callingCode);
    });

    const newMatchingCountries = matchingCountries.filter((item) => {
      return item.phoneMasks.some((mask) => {
        return `+1${mask.replace(/\D/g, '')}`.includes(
          formatedCallingCode
        );
      });
    });

    const formatedCountries = [];

    newMatchingCountries.forEach((country) => {
      formatedCountries.push({
        name: country.name,
        cca2: country.cca2,
        flag: country.flag,
        callingCode: country.callingCode,
      });
    });

    return formatedCountries;
  }

  const matchingCountries = countries.filter((country) => {
    return formatedCallingCode === country.callingCode;
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
