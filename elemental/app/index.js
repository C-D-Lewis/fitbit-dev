const document = require('document');
const clock = require('clock');

import * as ui from '../common/ui';
import * as helpers from '../common/helpers';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const buildDate = (date) => {
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  return `${month} ${day}`;
};

const onTick = (date) => {
  const timeString = `${helpers.zeroPad(date.getHours())}:${helpers.zeroPad(date.getMinutes())}`;
  ui.setText('time', timeString);
  ui.setText('date', buildDate(date));
};

(() => {
  clock.granularity = 'minutes'; 
  clock.ontick = (evt) => onTick(evt.date);
  onTick(new Date());
})();
