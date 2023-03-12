import { countries } from './countries';

export const phoneMask = (phoneNumber, callingCode, cca2) => {
  let matrix = '';

  countries.forEach((item) => {
    const newCode = item.callingCode.replace(/[\s#]/g, '');

    if (callingCode && callingCode.includes(newCode)) {
      if (item.phoneMasks.length === 1) {
        if (cca2 !== 'CA' && cca2 !== 'US' && cca2 !== 'IT') {
          matrix = item.phoneMasks[0].replace(/[0-9]/g, '').trim();
        }
      } else if (item.phoneMasks.length > 1) {
        let hasDifferentLengthsOfPhoneNumbers = false;

        for (let i = 0; i < item.phoneMasks.length; i++) {
          if (
            phoneNumber.length > item.phoneMasks[0].length &&
            newCode !== '+1'
          ) {
            hasDifferentLengthsOfPhoneNumbers = true;
          }
        }

        if (!hasDifferentLengthsOfPhoneNumbers) {
          if (cca2 === 'CA' || cca2 === 'US') {
            matrix = item.phoneMasks[0].replace(/\d/g, '#').trim();
          } else {
            matrix = item.phoneMasks[0].replace(/[0-9]/g, '').trim();
          }
        } else {
          for (let i = 0; i < item.phoneMasks.length; i++) {
            if (
              phoneNumber.length > item.phoneMasks[i].length &&
              item.phoneMasks[i + 1]
            ) {
              matrix = item.phoneMasks[i + 1]
                .replace(/[0-9]/g, '')
                .trim();
            }
          }
        }
      }
    }
  });

  let i = 0;
  const newValue = phoneNumber.replace(/\D/g, '');

  return matrix.replace(/(?!\+)./g, function (a) {
    return /[#\d]/.test(a) && i < newValue.length
      ? newValue.charAt(i++)
      : i >= newValue.length
      ? ''
      : a;
  });
};
