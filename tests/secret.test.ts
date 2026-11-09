import { describe, expect, it } from 'vitest';
import { generateSecret } from '../src/logic/secret.js';
import { isValidGuess } from '../src/logic/validate.js';

describe('generateSecret', () => {
  it('picks the first digits when random always returns 0', () => {
    expect(generateSecret(4, 10, () => 0)).toBe('0123');
  });

  it('picks the last available digits when random is close to 1', () => {
    expect(generateSecret(4, 10, () => 0.999)).toBe('9876');
  });

  it('is repeatable for the same random source', () => {
    const sequence = [0.5, 0.1, 0.9, 0.3];
    const makeRandom = () => {
      let i = 0;
      return () => sequence[i++ % sequence.length];
    };
    expect(generateSecret(4, 10, makeRandom())).toBe(
      generateSecret(4, 10, makeRandom()),
    );
  });

  it('returns a secret of the requested length with unique valid digits', () => {
    const secret = generateSecret(6, 16, Math.random);
    expect(isValidGuess(secret, 6, 16)).toBe(true);
  });

  it('can use the full alphabet when length equals base', () => {
    const secret = generateSecret(2, 2, () => 0);
    expect(secret).toBe('01');
  });

  it('throws when length exceeds base', () => {
    expect(() => generateSecret(3, 2, () => 0)).toThrow();
  });
});
