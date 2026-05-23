import { getExampleNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/examples.mobile.json';

export default function getExampleForCountry(cca2) {
  if (!cca2) return '';
  try {
    const example = getExampleNumber(cca2, examples);
    if (!example) return '';
    return example.formatNational();
  } catch {
    return '';
  }
}
