import parsePhoneNumber, {
  getExampleNumber,
  isValidPhoneNumber as isValidForCallingCode,
} from 'libphonenumber-js/max';
import examples from 'libphonenumber-js/examples.mobile.json';

// Valid *and* belonging to `cca2`, not merely valid somewhere under the same calling
// code — otherwise every +1 country accepts every other one's numbers.
function isValidForExactCountry(phoneNumber, cca2) {
  const parsed = parsePhoneNumber(phoneNumber, cca2);

  return Boolean(parsed?.isValid() && parsed.country === cca2);
}

// Territories like Åland or the Isle of Man share their parent's numbering plan, so the
// exact-country check would reject even their own example number. Probing that example
// detects them without a hardcoded list that would drift from libphonenumber.
const hasOwnPlanCache = new Map();

function hasOwnNumberingPlan(cca2) {
  if (!hasOwnPlanCache.has(cca2)) {
    let result = true;
    try {
      const example = getExampleNumber(cca2, examples);
      result = !example || isValidForExactCountry(example.nationalNumber, cca2);
    } catch {
      result = true;
    }
    hasOwnPlanCache.set(cca2, result);
  }
  return hasOwnPlanCache.get(cca2);
}

// `phoneNumber` may be a national number (formatted or not, with or without the
// national trunk prefix) or a full E.164 string — libphonenumber normalizes all three.
export default function isValidPhoneNumber(phoneNumber, country) {
  const cca2 = country?.cca2;

  if (!phoneNumber || !cca2) {
    return false;
  }

  try {
    return hasOwnNumberingPlan(cca2)
      ? isValidForExactCountry(phoneNumber, cca2)
      : isValidForCallingCode(phoneNumber, cca2);
  } catch {
    return false;
  }
}
