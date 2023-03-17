import {countries} from './countries';

export function getMatchingCountry(phoneNumber) {
  const matchingCountries = [];
  const formattedPhoneNumber = phoneNumber.replace(/\s/g, '');
  countries.forEach(item => {
    if (
      formattedPhoneNumber.startsWith(item.callingCode.replace(/[\s#]/g, ''))
    ) {
      matchingCountries.push(item);
    }
  });

  let matchingCountry = matchingCountries[0];

  if (matchingCountries.length > 1) {
    const callingCode = matchingCountries[0].callingCode;

    for (let i = 0; i < matchingCountries.length; i++) {
      matchingCountries[i].phoneMasks.map(item => {
        const areaCode = formattedPhoneNumber.substring(
          callingCode.length,
          item.replace(/\D/g, '').length + callingCode.length,
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

  return matchingCountry;
}
