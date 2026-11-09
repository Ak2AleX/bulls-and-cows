export function memoize<Args extends unknown[], Result>(
  fn: (...args: Args) => Result,
  keyFn: (...args: Args) => string = (...args) => JSON.stringify(args),
): (...args: Args) => Result {
  const cache = new Map<string, Result>();
  return (...args) => {
    const key = keyFn(...args);
    if (cache.has(key)) return cache.get(key) as Result;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
