import { UI } from '@chris-lewis/fitbit-utils/app';
import clock from 'clock';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const zeroPad = value => (value < 10) ? `0${value}` : value;

const formatDateStr = date => `${MONTHS[date.getMonth()]} ${date.getDate()}`;

const onTick = (date) => {
  const timeString = '00:00';//`${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}`;
  UI.setText('time', timeString);
  UI.setText('date', formatDateStr(date));
};

const main = () => {
  clock.granularity = 'minutes';
  clock.ontick = (evt) => onTick(evt.date);

  onTick(new Date());
};

main();
