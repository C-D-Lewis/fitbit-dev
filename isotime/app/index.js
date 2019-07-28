import clock from 'clock';
import messaging from 'messaging';
import * as ui from '../common/ui';
import * as db from '../common/db';

const APP_NAME = 'Isotime';
const DB_KEY_COLOR = 'color';
const COLORS = {
  white: '#ffffff',
  red: '#d30808',
  blue: '#2b7cff',
  green: '#0a9900',
  yellow: '#ede91a',
  pink: '#ed1adf',
  jazzberryjam: '#aa0055',
  bloodred: '#8e0000',
  cyan: '#5b979a',
  orange: '#ff8c00',
  royalblue: '#1d00c4'
};

const digits = [ui.get('h0'), ui.get('h1'), ui.get('m0'), ui.get('m1')];

let chosenColor = '';

const getDigitImagePath = value => `${value}.png`;

const loadColor = () => {
  let color = '';

  // Set default
  if (!db.contains(DB_KEY_COLOR)) {
    color = COLORS.green;
    db.set(DB_KEY_COLOR, color);
    console.log(`Defaulted to ${color}`);
  }

  // Load previous, could be null
  color = db.get(DB_KEY_COLOR);
  console.log(`Read ${color}`);

  // Superdefault
  if (!color) {
    color = COLORS.green;
    db.set(DB_KEY_COLOR, color);
    console.log(`Recovered ${color}`);
  }

  return color;
};

const updateTime = (date) => {
  const hours = date.getHours();
  const mins = date.getMinutes();

  digits[0].style.fill = chosenColor;
  digits[0].href = getDigitImagePath(Math.floor(hours / 10));
  digits[1].style.fill = chosenColor;
  digits[1].href = getDigitImagePath(hours % 10);
  digits[2].style.fill = chosenColor;
  digits[2].href = getDigitImagePath(Math.floor(mins / 10));
  digits[3].style.fill = chosenColor;
  digits[3].href = getDigitImagePath(mins % 10);
};

const onMessage = (event) => {
  chosenColor = COLORS[event.data.color];
  db.set(DB_KEY_COLOR, chosenColor);

  console.log(`Applied chosen color: ${chosenColor}`);
  updateTime(new Date());
};

const main = () => {
  console.log('Isotime app');
  db.init(APP_NAME);
  chosenColor = loadColor();

  clock.granularity = 'minutes';
  clock.ontick = event => updateTime(event.date);
  updateTime(new Date());

  messaging.peerSocket.onmessage = onMessage;
};

main();
