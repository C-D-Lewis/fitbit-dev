import clock from 'clock';
import { UI, AOD, DB, Comm } from '@chris-lewis/fitbit-utils/app';
import Ray from './Ray';
import { Themes, DB_KEY_THEME } from './constants';

/** Number of rays in the .view file */
const NUM_RAYS = 10;

let isRunning = true;

const rays = [];

/**
 * Pad a number with a zero if required.
 *
 * @param {number} value - Value to pad.
 * @returns {string} Padded value.
 */
const zeroPad = value => (value < 10) ? `0${value}` : value;

/**
 * Get path to image file.
 *
 * @param {number} i - Value.
 * @returns {string} Path to file.
 */
const getDigitPath = i => `font/${i}.png`;

/**
 * On each clock tick.
 *
 * @para {Date} date - The current time as a Date.
 */
const onTick = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Update time
  const [h0, h1, , m0, m1] = `${zeroPad(hours)}:${zeroPad(minutes)}`.split('');
  UI.get('h0').href = getDigitPath(h0);
  UI.get('h1').href = getDigitPath(h1);
  UI.get('m0').href = getDigitPath(m0);
  UI.get('m1').href = getDigitPath(m1);
};

/**
 * On an animation frame.
 */
const onFrame = () => {
  if (!isRunning) return;

  // Update the animation
  rays.forEach(p => p.update());
  requestAnimationFrame(onFrame);
};

/**
 * Resume the animation.
 */
const resume = () => {
  isRunning = true;

  // Reset all rays to prevent them all appearing at once
  rays.forEach(p => p.reset());

  requestAnimationFrame(onFrame);
};

/**
 * Pause the animation.
 */
const pause = () => {
  rays.forEach(p => p.hide());
  isRunning = false;
};

/**
 * Apply a stored theme.
 */
const applyTheme = () => {
  let chosenTheme = DB.get(DB_KEY_THEME);
  if (!chosenTheme) {
    chosenTheme = 'classic';
    DB.set(DB_KEY_THEME, chosenTheme);
  }

  const theme = Themes[chosenTheme];
  rays.forEach(p => p.setColor(theme.foreground()));
  // TODO: Solve the 8-bit PNG magic mystery :ghost:
  // UI.get('app-background').style.fill = theme.background;
  // UI.get('h0').style.fill = theme.foreground;
  // UI.get('h1').style.fill = theme.foreground;
  // UI.get('m0').style.fill = theme.foreground;
  // UI.get('m1').style.fill = theme.foreground;
};

/**
 * When a message is received.
 */
const onMessage = (event) => {
  DB.set(DB_KEY_THEME, event.data.theme);

  applyTheme();
};

/**
 * The main function.
 */
const main = () => {
  // Setup clock
  clock.granularity = 'minutes';
  clock.ontick = event => onTick(event.date);
  onTick(new Date());

  // Setup rays
  while (rays.length < NUM_RAYS) rays.push(new Ray(rays.length));

  // Setup sleeping
  UI.onDisplayChange(isOn => isOn ? resume() : pause());

  // Setup AOD
  AOD.setup({
    onStart: pause,
    onEnd: resume,
  });

  // Setup comm for settings sync
  Comm.setup({ message: onMessage });

  // Load theme choice
  DB.init('cosmic-rays');
  applyTheme();

  // Start animation
  resume();
};

main();
