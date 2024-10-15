export function optionalUpdate(
  obj: object,
  field: string,
  value: any,
  fn?: () => any,
) {
  if (value === undefined) return;
  obj[field] = fn ? fn() : value;
}

export async function optionalUpdateAsync(
  obj: object,
  field: string,
  value: any,
  fn: () => Promise<any>,
) {
  if (value === undefined) return;
  obj[field] = await fn();
}
