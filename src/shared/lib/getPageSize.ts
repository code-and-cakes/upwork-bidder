export function getPageNumber(index: number, pageSize: number): number {
  return Math.floor(index / pageSize) + 1;
}
