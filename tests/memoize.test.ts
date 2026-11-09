import { describe, expect, it, vi } from 'vitest';
import { memoize } from '../src/logic/memoize.js';

describe('memoize', () => {
  it('returns the same result as the original function', () => {
    const add = memoize((a: number, b: number) => a + b);
    expect(add(2, 3)).toBe(5);
  });

  it('calls the original function once for repeated arguments', () => {
    const fn = vi.fn((a: number, b: number) => a + b);
    const memoized = memoize(fn);
    memoized(2, 3);
    memoized(2, 3);
    memoized(2, 3);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('calls the original function again for different arguments', () => {
    const fn = vi.fn((a: number, b: number) => a + b);
    const memoized = memoize(fn);
    memoized(2, 3);
    memoized(3, 2);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('caches falsy results such as 0', () => {
    const fn = vi.fn((n: number) => n - n);
    const memoized = memoize(fn);
    memoized(5);
    memoized(5);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('uses a custom key function', () => {
    const fn = vi.fn((a: number, b: number) => a * b);
    const memoized = memoize(
      fn,
      (a, b) => `${Math.min(a, b)}:${Math.max(a, b)}`,
    );
    memoized(2, 3);
    memoized(3, 2);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('keeps separate caches for separate memoized functions', () => {
    const double = memoize((n: number) => n * 2);
    const triple = memoize((n: number) => n * 3);
    expect(double(2)).toBe(4);
    expect(triple(2)).toBe(6);
  });
});
