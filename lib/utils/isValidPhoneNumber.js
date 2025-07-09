import parsePhoneNumber, {formatIncompletePhoneNumber} from 'libphonenumber-js';

export default function isValidPhoneNumber(phoneNumber, country) {
  if (!phoneNumber || !country) {
    return false;
  }

  const formattedPhoneNumber = formatIncompletePhoneNumber(
    `${country?.idd?.root}${phoneNumber}`,
  );

  const isValid = parsePhoneNumber(formattedPhoneNumber)?.isValid();

  return isValid;
}
