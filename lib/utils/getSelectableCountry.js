// Not `libphonenumber-js/max/metadata`: Metro resolves that to a second copy of the
// 157 KB metadata. This path is the file `libphonenumber-js/max` already loads.
import metadata from 'libphonenumber-js/metadata.max';
import { getAllCountries, getCountryByCca2 } from 'rn-country-select';

import { COUNTRIES_WITHOUT_NUMBERING_PLAN } from './getCallingCode.js';

// `visibleCountries` / `hiddenCountries` as the modal applies them. The modal never lists
// countries without a numbering plan either. Without restrictions, every other country is
// selectable.
export function isSelectableCountry(cca2, restrictions = {}) {
  const { visibleCountries, hiddenCountries } = restrictions;

  if (!cca2 || COUNTRIES_WITHOUT_NUMBERING_PLAN.includes(cca2)) return false;
  if (visibleCountries?.length > 0 && !visibleCountries.includes(cca2)) {
    return false;
  }
  return !hiddenCountries?.includes(cca2);
}

// Selectable and in rn-country-select's list, which lacks two countries libphonenumber
// knows: Ascension Island (AC) and Tristan da Cunha (TA).
function getUsableCountry(cca2, restrictions) {
  return isSelectableCountry(cca2, restrictions)
    ? getCountryByCca2(cca2) || null
    : null;
}

// The region of the device's locale ('pt-BR' → 'BR'): the Region setting on iOS, the
// language variant on Android ("English (United States)" → 'US'). Not the physical
// location. `null` without Intl or without a region ('en', or numeric like 'es-419').
function getDeviceCountry() {
  try {
    const { locale } = Intl.DateTimeFormat().resolvedOptions();
    return locale.match(/-([A-Z]{2})(?:-|$)/)?.[1] || null;
  } catch {
    return null;
  }
}

// The starting country when nothing else picks one: the device's, then Brazil, unless
// the restrictions leave them out. Then the first selectable one, `visibleCountries`
// order first.
export function getFallbackCountry(restrictions = {}) {
  const cca2 =
    [
      getDeviceCountry(),
      'BR',
      ...(restrictions.visibleCountries || []),
    ].find((code) =>
      getUsableCountry(code, restrictions)
    ) ||
    getAllCountries().find((country) =>
      getUsableCountry(country.cca2, restrictions)
    )?.cca2;

  return getCountryByCca2(cca2 || 'BR');
}

// The country a detected (pasted, pre-filled or controlled) number switches the input to.
// A Jersey mobile resolves to JE, so with JE hidden it has to land somewhere else: the
// current country when it shares the calling code, then the first selectable country
// libphonenumber lists for that code (main country first: GB for +44, US for +1).
// The same goes for a country missing from rn-country-select (TA lands on SH).
// `null` when no selectable country has that calling code.
export default function getSelectableCountry(seed, restrictions, currentCountry) {
  if (!seed?.cca2) return null;

  const detected = getUsableCountry(seed.cca2, restrictions);
  if (detected) return detected;

  const candidates =
    metadata.country_calling_codes[
      String(seed.callingCode || '').replace('+', '')
    ] || [];

  if (
    currentCountry &&
    candidates.includes(currentCountry.cca2) &&
    isSelectableCountry(currentCountry.cca2, restrictions)
  ) {
    return currentCountry;
  }

  return (
    candidates.map((cca2) => getUsableCountry(cca2, restrictions)).find(Boolean) ||
    null
  );
}
