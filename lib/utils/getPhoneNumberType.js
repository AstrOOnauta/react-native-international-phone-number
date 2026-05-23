import parsePhoneNumber from 'libphonenumber-js/max';

export default function getPhoneNumberType(phoneNumber) {
  if (typeof phoneNumber !== 'string' || phoneNumber.length === 0) {
    return null;
  }
  try {
    const parsed = parsePhoneNumber(phoneNumber);
    if (!parsed) return null;
    const type = parsed.getType();
    return type || null;
  } catch {
    return null;
  }
}
