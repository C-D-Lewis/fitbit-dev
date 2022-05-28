import { UI } from '@chris-lewis/fitbit-utils/app';
import { me } from 'appbit';
import { today } from 'user-activity';
import clock from 'clock';
import { CLASSES, DAYS, MONTHS } from './constants';
import { randomInt, zeroPad, to24h, createFitFont } from './util';

const imgClassPortrait = UI.get('img_class_portrait');
let textClassName;
let textTime;
let textDate;
let textSteps;
let textCalories;

/**
 * When a tick occurs.
 *
 * @param {Date} date - Tick date.
 */
const onTick = (date) => {
  // Class
  const index = randomInt(CLASSES.length - 1);
  imgClassPortrait.href = `images/${CLASSES[index]}_portrait.png`
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
  const permission = me.permissions.granted('access_activity');
  textSteps.text = permission ? `${(today.adjusted.steps || 0)}` : '?';
  textCalories.text = permission ? `${(today.adjusted.calories || 0)}` : '?';
};

/**
 * The main function.
 */
const main = () => {
  // Set up clock
  clock.granularity = 'minutes';
  clock.ontick = event => onTick(event.date);

  // Setup fonts
  textClassName = createFitFont('text_class_name', 21);
  textTime = createFitFont('text_time', 64);
  textDate = createFitFont('text_date', 42);
  textSteps = createFitFont('text_steps', 36);
  textCalories = createFitFont('text_calories', 36);

  const textTimeLabel = createFitFont('text_time_label', 21);
  const textDateLabel = createFitFont('text_date_label', 21);
  textTimeLabel.text = 'MISSION TIME';
  textDateLabel.text = 'MISSION DATE';

  // Initial tick
  onTick(new Date());
};

main();
