export function memoize<Args extends unknown[], Result>(
  fn: (...args: Args) => Result,
  keyFn: (...args: Args) => string = (...args) => JSON.stringify(args),
): (...args: Args) => Result {
  throw new Error(`not implemented: ${fn.name} ${keyFn.name}`);
}
