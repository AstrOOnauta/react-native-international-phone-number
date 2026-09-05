import getPhoneNumberParts from './getPhoneNumberParts.js';

// Counted off the same E.164 the component reports, so the two cannot disagree when a
// trunk prefix was typed.
export function getInternationalPhoneNumberLength(country, phoneNumber) {
  return getPhoneNumberParts(phoneNumber, country).international.replace(
    /\D/g,
    ''
  ).length;
}
