export function randomCall(cb: () => void) {
  if (Math.random() > 0.5) {
    cb();
  }
}
