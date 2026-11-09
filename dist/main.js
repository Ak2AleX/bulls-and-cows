import { h } from './dom.js';
import { formatDuration } from './logic/input.js';
import { toRecord } from './logic/leaderboard.js';
import { generateSecret } from './logic/secret.js';
import { BASE_LABELS } from './logic/settings.js';
import { addGuess, startGame, } from './logic/state.js';
import { isValidGuess } from './logic/validate.js';
import { gameScreen } from './screens/game.js';
import { settingsScreen } from './screens/settings.js';
import { saveRecord } from './storage.js';
const root = h('div', { id: 'app' });
document.body.append(root);
let app = { screen: 'settings', settings: { length: 4, base: 10 } };
function setApp(next) {
    app = next;
    render();
}
function handleGuess(current, guess) {
    const { game } = current;
    const { length, base } = game.settings;
    const next = addGuess(game, guess, Date.now());
    if (next === game) {
        const message = isValidGuess(guess.toLowerCase(), length, base)
            ? 'Такая попытка уже была'
            : `Нужно ${length} разных цифр системы ${BASE_LABELS[base]}`;
        setApp({ ...current, message });
        return;
    }
    const record = toRecord(next);
    const records = record ? saveRecord(next.settings, record) : current.records;
    setApp({ screen: 'game', game: next, message: '', records });
}
function render() {
    const current = app;
    if (current.screen === 'settings') {
        root.replaceChildren(settingsScreen(current.settings, {
            onChange: (settings) => setApp({ screen: 'settings', settings }),
            onStart: (settings) => setApp({
                screen: 'game',
                game: startGame(settings, generateSecret(settings.length, settings.base), Date.now()),
                message: '',
                records: [],
            }),
        }));
        return;
    }
    root.replaceChildren(gameScreen({
        game: current.game,
        message: current.message,
        records: current.records,
        now: Date.now(),
    }, {
        onGuess: (guess) => handleGuess(current, guess),
        onNewGame: () => setApp({ screen: 'settings', settings: current.game.settings }),
    }));
    document.getElementById('guess')?.focus();
}
setInterval(() => {
    if (app.screen !== 'game' || app.game.status !== 'playing')
        return;
    const timer = document.getElementById('timer');
    if (timer)
        timer.textContent = formatDuration(Date.now() - app.game.startedAt);
}, 250);
render();
