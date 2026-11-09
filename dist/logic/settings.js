export const LENGTHS = [2, 3, 4, 5, 6];
export const BASES = [2, 8, 10, 16];
export const TOP_N = 10;
export function availableLengths(base) {
    return LENGTHS.filter((length) => length <= base);
}
export const BASE_LABELS = {
    2: 'bin',
    8: 'oct',
    10: 'dec',
    16: 'hex',
};
export function normalizeSettings(settings) {
    const lengths = availableLengths(settings.base);
    if (lengths.includes(settings.length))
        return settings;
    return { ...settings, length: lengths[lengths.length - 1] };
}
