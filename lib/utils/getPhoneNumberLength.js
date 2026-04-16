export function getInternationalPhoneNumberLength(
  country,
  phoneNumber
) {
  return `${country?.idd?.root}${phoneNumber}`.replace(/\D/g, '')
    .length;
}
