import { h } from '../dom.js';
import { countPossibleSecrets } from '../logic/count.js';
import { availableLengths, BASE_LABELS, BASES, LENGTHS, normalizeSettings, } from '../logic/settings.js';
const readNumber = (event) => Number(event.target.value);
export function settingsScreen(settings, { onChange, onStart }) {
    const allowed = availableLengths(settings.base);
    const baseSelect = h('select', {
        onchange: (event) => onChange(normalizeSettings({ ...settings, base: readNumber(event) })),
    }, ...BASES.map((base) => h('option', {
        value: String(base),
        textContent: BASE_LABELS[base],
        selected: base === settings.base,
    })));
    const lengthSelect = h('select', {
        onchange: (event) => onChange({ ...settings, length: readNumber(event) }),
    }, ...LENGTHS.map((length) => h('option', {
        value: String(length),
        textContent: String(length),
        disabled: !allowed.includes(length),
        selected: length === settings.length,
    })));
    const total = countPossibleSecrets(settings.length, settings.base);
    return h('main', {}, h('h1', { textContent: 'Bulls and Cows' }), h('label', {}, 'Система счисления: ', baseSelect), h('label', {}, 'Длина: ', lengthSelect), h('p', {
        textContent: `Возможных секретов: ${total.toLocaleString('ru-RU')}`,
    }), h('button', { textContent: 'Старт', onclick: () => onStart(settings) }));
}
