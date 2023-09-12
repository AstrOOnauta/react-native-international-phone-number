import { countries } from '../constants/countries';

export default function getInputMask(
  phoneNumber,
  callingCode,
  cca2,
  customMask
) {
  let matrix = '';

  countries.forEach((item) => {
    const newCode = item.callingCode.replace(/[\s#]/g, '');
    const phoneMask =
      (Array.isArray(customMask) && customMask) || item.phoneMasks;

    if (callingCode && callingCode.includes(newCode)) {
      if (phoneMask.length === 1) {
        if (cca2 !== 'CA' && cca2 !== 'US' && cca2 !== 'IT') {
          matrix = phoneMask[0].replace(/[0-9]/g, '').trim();
        }
      } else if (phoneMask.length > 1) {
        let hasDifferentLengthsOfPhoneNumbers = false;

        for (let i = 0; i < phoneMask.length; i++) {
          if (
            phoneNumber.length > phoneMask[0].length &&
            newCode !== '+1'
          ) {
            hasDifferentLengthsOfPhoneNumbers = true;
          }
        }

        if (!hasDifferentLengthsOfPhoneNumbers) {
          if (cca2 === 'CA' || cca2 === 'US') {
            matrix = phoneMask[0].replace(/\d/g, '#').trim();
          } else {
            matrix = phoneMask[0].replace(/[0-9]/g, '').trim();
          }
        } else {
          for (let i = 0; i < phoneMask.length; i++) {
            if (
              phoneNumber.length > phoneMask[i].length &&
              phoneMask[i + 1]
            ) {
              matrix = phoneMask[i + 1].replace(/[0-9]/g, '').trim();
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
}
