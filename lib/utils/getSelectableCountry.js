import { Metadata } from 'libphonenumber-js/core';
import maxMetadata from 'libphonenumber-js/max/metadata';
import { getCountryByCca2 } from 'rn-country-select';

// The `max` entry only exports Metadata from its ES build, so go through `core`.
const metadata = new Metadata(maxMetadata);

// `visibleCountries` / `hiddenCountries` as the modal applies them. Without either, every
// country is selectable.
export function isSelectableCountry(cca2, restrictions = {}) {
  const { visibleCountries, hiddenCountries } = restrictions;

  if (!cca2) return false;
  if (visibleCountries?.length > 0 && !visibleCountries.includes(cca2)) {
    return false;
  }
  return !hiddenCountries?.includes(cca2);
}

// The country a detected (pasted, pre-filled or controlled) number switches the input to.
// A Jersey mobile resolves to JE, so with JE hidden it has to land somewhere else: the
// current country when it shares the calling code, then the first selectable country
// libphonenumber lists for that code (main country first: GB for +44, US for +1).
// `null` when no selectable country has that calling code.
export default function getSelectableCountry(seed, restrictions, currentCountry) {
  if (!seed?.cca2) return null;

  if (isSelectableCountry(seed.cca2, restrictions)) {
    return getCountryByCca2(seed.cca2) || null;
  }

  const candidates =
    metadata.getCountryCodesForCallingCode(
      String(seed.callingCode || '').replace('+', '')
    ) || [];

  if (
    currentCountry &&
    candidates.includes(currentCountry.cca2) &&
    isSelectableCountry(currentCountry.cca2, restrictions)
  ) {
    return currentCountry;
  }

  const fallback = candidates.find((cca2) =>
    isSelectableCountry(cca2, restrictions)
  );

  return fallback ? getCountryByCca2(fallback) || null : null;
}
