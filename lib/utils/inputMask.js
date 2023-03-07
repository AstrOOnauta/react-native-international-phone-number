import { countries } from './countries';

export const phoneMask = (phoneNumber, callingCode) => {
  let matrix = '## ##### ####';

  countries.forEach((item) => {
    const newCode = item.code.replace(/[\s#]/g, '');

    if (callingCode && callingCode.includes(newCode)) {
      if (item.phoneMasks.length === 1) {
        matrix = item.phoneMasks[0].replace(/\d/g, '#');
      } else if (item.phoneMasks.length > 1) {
        let hasDifferentLengthsOfPhoneNumbers = false;

        for (let i = 0; i < item.phoneMasks.length; i++) {
          if (phoneNumber.length > item.phoneMasks[0].length) {
            hasDifferentLengthsOfPhoneNumbers = true;
          }
        }

        if (!hasDifferentLengthsOfPhoneNumbers) {
          matrix = item.phoneMasks[0].replace(/\d/g, '#');
        } else {
          for (let i = 0; i < item.phoneMasks.length; i++) {
            if (
              phoneNumber.length > item.phoneMasks[i].length &&
              item.phoneMasks[i + 1]
            ) {
              matrix = item.phoneMasks[i + 1].replace(/\d/g, '#');
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
