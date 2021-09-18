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
 * On each clock tick.
 *
 * @para {Date} date - The current time as a Date.
 */
const onTick = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // TODO: Font as images
  // UI.setText('text_hours', zeroPad(hours));
  // UI.setText('text_minutes', zeroPad(minutes));
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
  clock.granularity = 'minutes';
  clock.ontick = event => onTick(event.date);
  onTick(new Date());

  while (rays.length < NUM_RAYS) rays.push(new Ray(rays.length));

  resume();
};

main();

// TODO: AOD freeze rays
