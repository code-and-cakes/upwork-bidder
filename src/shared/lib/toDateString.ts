export function toDateString(date: Date | string) {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return date.toLocaleDateString('en-US');
}
