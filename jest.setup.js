// Without defaultCountry the input starts on the device locale's country, and machines
// differ: pin it to Brazil so those tests don't depend on where they run.
const { resolvedOptions } = Intl.DateTimeFormat.prototype;
Intl.DateTimeFormat.prototype.resolvedOptions = function () {
  return { ...resolvedOptions.call(this), locale: 'pt-BR' };
};

jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default
);
