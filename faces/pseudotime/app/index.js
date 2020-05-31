import { UI } from '@chris-lewis/fitbit-utils/app';
import clock from 'clock';

const barHours = UI.get('bar_hours');
const barMinutes = UI.get('bar_minutes');
const barSeconds = UI.get('bar_seconds');

const BAR_WIDTH = 215;

/**
 * On each clock tick.
 *
 * @para {Date} date - The current time as a Date.
 */
const onTick = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  barHours.width = Math.round((hours * BAR_WIDTH) / 24);
  barMinutes.width = Math.round((minutes * BAR_WIDTH) / 60);
  barSeconds.width = Math.round((seconds * BAR_WIDTH) / 60);
};

/**
 * The main function.
 */
const main = () => {
  clock.granularity = 'seconds';
  clock.ontick = event => onTick(event.date);

  onTick(new Date());
};

main();
