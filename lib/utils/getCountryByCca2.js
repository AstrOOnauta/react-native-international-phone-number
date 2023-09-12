import { countries } from '../constants/countries';

export default function getCountryByCca2(cca2) {
  let matchingCountry = countries.filter((country) => {
    return country.cca2.toLowerCase() === cca2.toLowerCase();
  })[0];

  if (matchingCountry) {
    matchingCountry = {
      name: matchingCountry.name,
      cca2: matchingCountry.cca2,
      flag: matchingCountry.flag,
      callingCode: matchingCountry.callingCode,
    };

    return matchingCountry;
  } else {
    return {};
  }
}
