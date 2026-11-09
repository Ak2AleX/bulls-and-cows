import { h } from './dom.js';
import { generateSecret } from './logic/secret.js';
import { startGame, type GameState, type Settings } from './logic/state.js';
import { settingsScreen } from './screens/settings.js';

type AppState =
  | { readonly screen: 'settings'; readonly settings: Settings }
  | { readonly screen: 'game'; readonly game: GameState };

const root = h('div', { id: 'app' });
document.body.append(root);

let app: AppState = { screen: 'settings', settings: { length: 4, base: 10 } };

function setApp(next: AppState): void {
  app = next;
  render();
}

function render(): void {
  const current = app;
  if (current.screen === 'settings') {
    root.replaceChildren(
      settingsScreen(current.settings, {
        onChange: (settings) => setApp({ screen: 'settings', settings }),
        onStart: (settings) =>
          setApp({
            screen: 'game',
            game: startGame(
              settings,
              generateSecret(settings.length, settings.base),
              Date.now(),
            ),
          }),
      }),
    );
    return;
  }
  root.replaceChildren(h('p', { textContent: 'Игра началась' }));
}

render();
