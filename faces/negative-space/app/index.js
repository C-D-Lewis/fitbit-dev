import { UI } from '@chris-lewis/fitbit-utils/app';
import clock from 'clock';

const Colors = {
  primary: '#800',
};

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

  UI.setText('text_hours', zeroPad(hours));
  UI.setText('text_minutes', zeroPad(hours));
};

/**
 * The main function.
 */
const main = () => {
  clock.granularity = 'minutes';
  clock.ontick = event => onTick(event.date);

  onTick(new Date());
};

main();
