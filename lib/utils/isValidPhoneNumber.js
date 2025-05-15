import {phone} from 'phone';

export default function isValidPhoneNumber(phoneNumber, country) {
  const isValid = phone(`${country?.callingCode} ${phoneNumber}`, {
    country: country?.cca2,
  }).isValid;

  return isValid;
}
