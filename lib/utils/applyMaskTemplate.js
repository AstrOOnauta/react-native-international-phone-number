export default function applyMaskTemplate(value, mask) {
  if (!mask) return value;
  const numbers = (value || '').replace(/\D/g, '');
  let result = '';
  let numberIndex = 0;
  for (let i = 0; i < mask.length && numberIndex < numbers.length; i++) {
    if (mask[i] === '#') {
      result += numbers[numberIndex];
      numberIndex++;
    } else {
      result += mask[i];
    }
  }
  return result;
}
