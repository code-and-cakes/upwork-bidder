export function numToUSFormat(num: string | number) {
  if (!num) return '0.00';

  if (typeof num === 'string') {
    num = parseFloat(num);
  }
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
