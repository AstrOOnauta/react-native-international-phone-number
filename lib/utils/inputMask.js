import { countriesPhoneCodeList } from './countriesPhoneCode';

export const phoneMask = (phoneNumber, callingCode) => {
  let matrix = '## ##### ####';

  countriesPhoneCodeList.forEach((item) => {
    const newCode = item.code.replace(/[\s#]/g, '');

    if (callingCode && callingCode.includes(newCode)) {
      matrix = item.matrix;
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
