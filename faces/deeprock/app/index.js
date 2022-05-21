import { FitFont } from 'fitfont';
import { UI } from '@chris-lewis/fitbit-utils/app';
import { preferences } from 'user-settings';
import clock from 'clock';

/** Class names, aligned with resource names */
const CLASSES = ['Scout', 'Engineer', 'Gunner', 'Driller'];

const imgClassPortrait = UI.get('img_class_portrait');
const imgClassIcon = UI.get('img_class_icon');
let textTime;
let textClassName;

/**
 * Pad a number to two digits.
 * TODO: Move to utils.
 *
 * @param {number} i - Value to pad.
 * @returns {string} Padded number.
 */
const zeroPad = i => (i >= 10) ? i : `0${i}`;

/**
 * Get hours according to user preference.
 * TODO: Move to utils.
 *
 * @param {number} hours - Hours value.
 * @returns {string} Adjusted value.
 */
const to24h = hours => (preferences.clockDisplay === "12h") ? `${(hours % 12 || 12)}` : zeroPad(hours);

/**
 * Random integer in range 0 - max.
 * TODO: Move to utils.
 *
 * @param {number} max - Maximum value, inclusive.
 * @returns {number} Random number.
 */
const randomInt = max => Math.round(Math.random() * max);

/**
 * When a tick occurs.
 *
 * @param {Date} date - Tick date.
 */
const onTick = (date) => {
  // Class
  const index = randomInt(CLASSES.length - 1);
  imgClassPortrait.href = `${CLASSES[index]}_portrait.png`
  imgClassIcon.href = `${CLASSES[index]}_icon.png`;
  textClassName.text = CLASSES[index].toUpperCase();

  // Time
  const hours = to24h(date.getHours());
  const mins = zeroPad(date.getMinutes());
  textTime.text = `${hours}:${mins}`;
};

/**
 * The main function.
 */
const main = () => {
  // Set up clock
  clock.granularity = 'minutes';
  clock.ontick = event => onTick(event.date);

  // Setup fonts
  textTime = new FitFont({
    id:'text_time',
    font:'Ostrich_Sans_64',

    // Optional
    halign: 'start',    // horizontal alignment : start / middle / end
    valign: 'baseline', // vertical alignment   : baseline / top / middle / bottom
    letterspacing: 0    // letterspacing...
  });
  textClassName = new FitFont({
    id:'text_class_name',
    font:'Ostrich_Sans_42',

    // Optional
    halign: 'start',
    valign: 'baseline',
    letterspacing: 0
  });

  // Initial tick
  onTick(new Date());
};

main();
