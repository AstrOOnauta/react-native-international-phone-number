import applyMaskTemplate from './applyMaskTemplate';

export default function getInitialFormattedInputValue(
  externalValue,
  e164Seed,
  customMask
) {
  if (!externalValue) return '';
  if (e164Seed) {
    if (customMask) {
      return applyMaskTemplate(e164Seed.nationalDigits, customMask);
    }
    return e164Seed.nationalFormatted;
  }
  return customMask ? applyMaskTemplate(externalValue, customMask) : externalValue;
}
