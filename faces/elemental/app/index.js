import document from 'document';
import clock from 'clock';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const setText = (id, text) => document.getElementById(id).text = text;

const zeroPad = value => (value < 10) ? `0${value}` : value;

const formatDateStr = date => `${MONTHS[date.getMonth()]} ${date.getDate()}`;

const onTick = (date) => {
  const timeString = `${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}`;
  setText('time', timeString);
  setText('date', formatDateStr(date));
};

const main = () => {
  clock.granularity = 'minutes';
  clock.ontick = (evt) => onTick(evt.date);

  onTick(new Date());
};

main();
