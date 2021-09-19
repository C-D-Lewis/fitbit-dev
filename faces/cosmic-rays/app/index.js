import { display } from 'display';
import { UI } from '@chris-lewis/fitbit-utils/app';
import Ray from './Ray';
import clock from 'clock';

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

  rays.forEach(p => p.update());
  requestAnimationFrame(onFrame);
};

/**
 * Resume the animation.
 */
const resume = () => {
  isRunning = true;
  requestAnimationFrame(onFrame);
};

/**
 * Pause the animation.
 */
const pause = () => {
  isRunning = false;
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
  UI.onDisplayChange((isOn) => {
    if (isOn) {
      resume();
      return;
    }

    pause();
  });

  // Start animation
  resume();
};

main();

// TODO: AOD freeze rays
