import clock from 'clock';
import document from 'document';

const Colors = {
  day: '#ffdc7d',
  night: '#0d2478',
};

/**
 * Pad a number with a zero if required.
 *
 * @param {number} value - Value to pad.
 * @returns {string} Padded value.
 */
const zeroPad = value => (value < 10) ? `0${value}` : value;

/**
 * Get the minutes arc fill color (day or night)
 *
 * @param {number} hours - Number of hours.
 * @returns {string} Day or night color.
 */
const getArcFill = hours => (hours > 6 && hours < 18) ? Colors.day : Colors.night;

/**
 * On each clock tick.
 *
 * @para {Date} date - The current time as a Date.
 */
const onTick = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  document.getElementById('text_hours').text = zeroPad(hours);

  const arcMinutes = document.getElementById('arc_minutes');
  arcMinutes.sweepAngle = Math.floor((minutes / 60) * 360)
  arcMinutes.style.fill = getArcFill(hours);
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
