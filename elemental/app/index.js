import document from "document";
import clock from "clock";

import * as ui from '../common/ui';
import * as helpers from '../common/helpers';

function buildDate(date) {
  const day = date.getDate();
  const month = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ][date.getMonth()];
  
  return `${month} ${day}`;
}

function onTick(date) {
  const timeView = ui.get('time');
  timeView.text = `${helpers.zeroPad(date.getHours())}:${helpers.zeroPad(date.getMinutes())}`;
  const dateView = ui.get('date');
  dateView.text = buildDate(date);
}

function main() {
  clock.granularity = 'minutes'; 
  clock.ontick = (evt) => onTick(evt.date);
  onTick(new Date());
}

(() => main())();
