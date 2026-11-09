import { DIGITS } from './digits.js';
function pickDigits(pool, count, random) {
    if (count === 0)
        return '';
    const index = Math.floor(random() * pool.length);
    const rest = pool.filter((_, i) => i !== index);
    return pool[index] + pickDigits(rest, count - 1, random);
}
export function generateSecret(length, base, random = Math.random) {
    if (length > base) {
        throw new RangeError(`length ${length} exceeds base ${base}`);
    }
    return pickDigits([...DIGITS.slice(0, base)], length, random);
}
