export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-uk', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  });
}
