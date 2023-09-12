import { countries } from '../constants/countries';

export default function getCountryByPhoneNumber(phoneNumber) {
  const matchingCountries = [];
  const formattedPhoneNumber = phoneNumber.replace(/\s/g, '');

  countries.forEach((item) => {
    if (
      formattedPhoneNumber.startsWith(
        item.callingCode.replace(/[\s#]/g, '')
      )
    ) {
      matchingCountries.push(item);
    }
  });

  let matchingCountry = matchingCountries[0];

  if (matchingCountries.length > 1) {
    matchingCountry = null;
    const callingCode = matchingCountries[0].callingCode;

    for (let i = 0; i < matchingCountries.length; i++) {
      matchingCountries[i].phoneMasks.map((item) => {
        const areaCode = formattedPhoneNumber.substring(
          callingCode.length,
          item.replace(/\D/g, '').length + callingCode.length
        );
        if (
          areaCode &&
          item.replace(/\D/g, '') &&
          areaCode === item.replace(/\D/g, '')
        ) {
          if (
            matchingCountries[i].cca2 === 'CA' ||
            matchingCountries[i].cca2 === 'US'
          ) {
            matchingCountry = {
              ...matchingCountries[i],
              phoneMasks: [item.replace(/\d/g, '#').trim()],
            };
          } else {
            matchingCountry = {
              ...matchingCountries[i],
              phoneMasks: [item.replace(/[0-9]/g, '').trim()],
            };
          }
        }
      });
    }
  }

  if (matchingCountry) {
    matchingCountry = {
      name: matchingCountry.name,
      cca2: matchingCountry.cca2,
      flag: matchingCountry.flag,
      callingCode: matchingCountry.callingCode,
    };
  }

  return matchingCountry;
}
