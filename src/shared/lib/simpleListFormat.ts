export function simpleListFormat<T>(
  list: T[],
  format: (d: T) => string = (a) => JSON.stringify(a, null, 2),
): string {
  return list.map(format).join('\n---\n');
}
