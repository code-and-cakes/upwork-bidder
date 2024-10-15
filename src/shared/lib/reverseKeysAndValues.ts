export function reverseKeysAndValues(obj: object) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));
}
