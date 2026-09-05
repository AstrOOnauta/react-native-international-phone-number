import { getCountryCallingCode, isSupportedCountry } from 'libphonenumber-js/max';

// Territories libphonenumber has no numbering plan for. Picking one leaves the input
// with no mask, no length limit and no validation, so the modal hides them.
export const COUNTRIES_WITHOUT_NUMBERING_PLAN = [
  'AQ',
  'BV',
  'GS',
  'HM',
  'PN',
  'TF',
  'UM',
];

// Prefer libphonenumber over the country data's `idd.root`, which stores a calling code
// as a root plus suffixes and so is unusable alone for a few territories — Saint Helena
// is `{root: '+2', suffixes: ['90', '47']}` for +290/+247.
export default function getCallingCode(country) {
  const cca2 = country?.cca2;

  if (cca2 && isSupportedCountry(cca2)) {
    return `+${getCountryCallingCode(cca2)}`;
  }

  return country?.idd?.root || '';
}
