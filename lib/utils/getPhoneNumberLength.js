export function getPhoneNumberLength(selectedCountry, phoneNumber) {
  return `${selectedCountry?.idd?.root}${phoneNumber}`.replace(/\D/g, '')
    .length;
}
