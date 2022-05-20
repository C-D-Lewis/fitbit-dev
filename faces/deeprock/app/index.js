import { FitFont } from 'fitfont';
import { UI } from '@chris-lewis/fitbit-utils/app';
import clock from 'clock';

let textTime;

/**
 * Pad a number to two digits.
 *
 * @param {number} i - Value to pad.
 * @returns {string} Padded number.
 */
const zeroPad = i => (i >= 10) ? i : `0${i}`;

/**
 * When a tick occurs.
 *
 * @param {Date} date - Tick date.
 */
const onTick = (date) => {
  const hours = zeroPad(date.getHours());
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

  // Setup font
  textTime = new FitFont({
    id:'text_time',
    font:'Ostrich_Sans_64',

    // Optional
    halign: 'start',    // horizontal alignment : start / middle / end
    valign: 'baseline', // vertical alignment   : baseline / top / middle / bottom
    letterspacing: 0    // letterspacing...
  });

  // Initial tick
  onTick(new Date());
};

main();
