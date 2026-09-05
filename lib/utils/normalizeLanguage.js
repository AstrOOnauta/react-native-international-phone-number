// The `language` prop accepts both ISO 639-1 ('pt') and ISO 639-2 ('por') codes.
// rn-country-select normalizes them for the country names it renders, but does not
// export the mapping, so the phone input carries its own copy.
const ISO1_TO_ISO2 = {
  ar: 'ara',
  be: 'bel',
  br: 'bre',
  bg: 'bul',
  cs: 'ces',
  de: 'deu',
  el: 'ell',
  en: 'eng',
  et: 'est',
  fi: 'fin',
  fr: 'fra',
  he: 'heb',
  hr: 'hrv',
  hu: 'hun',
  it: 'ita',
  ja: 'jpn',
  ko: 'kor',
  nl: 'nld',
  fa: 'per',
  pl: 'pol',
  pt: 'por',
  ro: 'ron',
  ru: 'rus',
  sk: 'slk',
  es: 'spa',
  sr: 'srp',
  sv: 'swe',
  tr: 'tur',
  uk: 'ukr',
  ur: 'urd',
  zh: 'zho',
  'zh-Hans': 'zho-Hans',
  'zh-Hant': 'zho-Hant',
};

export default function normalizeLanguage(language) {
  return ISO1_TO_ISO2[language] || language;
}
