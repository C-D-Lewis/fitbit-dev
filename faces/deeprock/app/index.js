import { FitFont } from 'fitfont';
import { UI } from '@chris-lewis/fitbit-utils/app';
import { me } from 'appbit';
import { preferences } from 'user-settings';
import { today } from 'user-activity';
import clock from 'clock';

/** Class names, aligned with resource names */
const CLASSES = ['Scout', 'Engineer', 'Gunner', 'Driller'];
/** Short day names */
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
/** Short month names */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** Default FitFont settings */
const FF_DEFAULT = {
  halign: 'start',
  valign: 'baseline',
  letterspacing: 0,
};

const imgClassIcon = UI.get('img_class_icon');
const imgClassPortrait = UI.get('img_class_portrait');
let textClassName;
let textTime;
let textDate;
let textSteps;
let textCalories;

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
const to24h = hours => (preferences.clockDisplay === '12h') ? `${(hours % 12 || 12)}` : zeroPad(hours);

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
  textTime.text = `${hours}:${mins} HXT`;

  // Date - Sun 22 May 2022
  const dayName = DAYS[date.getDay()];
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  textDate.text = `${dayName} ${day} ${month} ${year}`.toUpperCase();

  // Steps and calories
  let stepsStr = '?';
  let caloriesStr = '?';
  if (me.permissions.granted('access_activity')) {
    stepsStr = `${(today.adjusted.steps || 0)}`;
    caloriesStr = `${(today.adjusted.calories || 0)}`;
  }
  textSteps.text = stepsStr;
  textCalories.text = caloriesStr;
};

/**
 * The main function.
 */
const main = () => {
  // Set up clock
  clock.granularity = 'minutes';
  clock.ontick = event => onTick(event.date);

  // Setup fonts
  textClassName = new FitFont({
    id:'text_class_name',
    font:'Ostrich_Sans_42',
    ...FF_DEFAULT,
  });
  const textTimeLabel = new FitFont({
    id:'text_time_label',
    font:'Ostrich_Sans_21',
    ...FF_DEFAULT,
  });
  textTimeLabel.text = 'MISSION TIME';
  textTime = new FitFont({
    id:'text_time',
    font:'Ostrich_Sans_64',
    ...FF_DEFAULT,
  });
  const textDateLabel = new FitFont({
    id:'text_date_label',
    font:'Ostrich_Sans_21',
    ...FF_DEFAULT,
  });
  textDateLabel.text = 'MISSION DATE';
  textDate = new FitFont({
    id:'text_date',
    font:'Ostrich_Sans_42',
    ...FF_DEFAULT,
  });
  textSteps = new FitFont({
    id:'text_steps',
    font:'Ostrich_Sans_36',
    ...FF_DEFAULT,
  });
  textCalories = new FitFont({
    id:'text_calories',
    font:'Ostrich_Sans_36',
    ...FF_DEFAULT,
  });

  // Initial tick
  onTick(new Date());
};

main();
