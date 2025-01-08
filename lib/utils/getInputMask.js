import { countries } from '../constants/countries';

function startsWithZero(phoneNumber, callingCode) {
  const newCode = callingCode?.replace('+', '');
  return (
    phoneNumber.startsWith('0') ||
    phoneNumber.startsWith(`${newCode}0`)
  );
}

function eliminateZeroAfterCallingCode(phoneNumber, callingCode) {
  return startsWithZero(phoneNumber, callingCode)
    ? phoneNumber.slice(1, phoneNumber.length)
    : phoneNumber;
}

export default function getInputMask(
  phoneNumber,
  callingCode,
  cca2,
  customMask,
  allowZeroAfterCallingCode
) {
  let matrix = '';

  countries.forEach((item) => {
    const newCode = item.callingCode.replace(/[\s#]/g, '');
    const phoneMask =
      (Array.isArray(customMask) && customMask) || item.phoneMasks;

    if (
      item.cca2 === cca2 &&
      callingCode &&
      callingCode.includes(newCode)
    ) {
      if (phoneMask.length === 1) {
        if (newCode === '+1' && cca2 !== 'CA' && cca2 !== 'US') {
          matrix = phoneMask[0].replace(/[0-9]/g, '').trim();
        } else {
          matrix = phoneMask[0].replace(/[0-9]/g, '#').trim();
        }
      } else if (phoneMask.length > 1) {
        let hasDifferentLengthsOfPhoneNumbers = false;

        for (let i = 0; i < phoneMask.length; i++) {
          if (
            phoneNumber.replace(/\s/g, '').length >
              phoneMask[0].replace(/\s/g, '').length &&
            newCode !== '+1'
          ) {
            hasDifferentLengthsOfPhoneNumbers = true;
          }
        }

        if (!hasDifferentLengthsOfPhoneNumbers) {
          if (cca2 === 'CA' || cca2 === 'US') {
            matrix = phoneMask[0].replace(/\d/g, '#').trim();
          } else {
            matrix = phoneMask[0].replace(/[0-9]/g, '#').trim();
          }
        } else {
          for (let i = 0; i < phoneMask.length; i++) {
            if (
              phoneNumber.replace(/\s/g, '').length >
                phoneMask[i].replace(/\s/g, '').length &&
              phoneMask[i + 1]
            ) {
              matrix = phoneMask[i + 1].replace(/[0-9]/g, '#').trim();
            }
          }
        }
      }
    }
  });

  let i = 0;
  const value = phoneNumber.replace(/\D/g, '');
  const newValue = allowZeroAfterCallingCode
    ? value
    : eliminateZeroAfterCallingCode(value, callingCode);

  const newMatrix =
    allowZeroAfterCallingCode && startsWithZero(value, callingCode)
      ? '#' + matrix
      : matrix;

  return newMatrix.replace(/(?!\+)./g, function (a) {
    return /[#\d]/.test(a) && i < newValue.length
      ? newValue.charAt(i++)
      : i >= newValue.length
      ? ''
      : a;
  });
}
