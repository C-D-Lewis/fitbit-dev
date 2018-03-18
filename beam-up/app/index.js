import clock from "clock";
const messaging = require('messaging');

import * as db from '../common/db';
import * as ui from '../common/ui';

const APP_NAME = 'BeamUp';
const KEY_COLOR = 'color';
const SETS = {
  black: '#000000',
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

const digits = [ ui.get('h0'), ui.get('h1'), ui.get('m0'), ui.get('m1') ];

let chosenColor = '';

const getImagePath = value => `${value}.png`;

const loadColor = () => {
  let color = '';
  if(!db.contains(KEY_COLOR)) {
    color = SETS.black;
    db.set(KEY_COLOR, color);
    console.log(`Defaulted ${color}`);
  }
  
  color = db.get(KEY_COLOR);
  console.log(`Read ${color}`);

  if(!color) {
    color = SETS.black;
    db.set(KEY_COLOR, color);
    console.log(`Recovered ${color}`);
  }

  return color;
};

const update = (date) => {
  const hours = date.getHours();
  const mins = date.getMinutes();
  
  const background = ui.get('background');
  background.style.fill = chosenColor;
  
  digits[0].href = getImagePath(Math.floor(hours / 10));
  digits[1].href = getImagePath(hours % 10);
  digits[2].href = getImagePath(Math.floor(mins / 10));
  digits[3].href = getImagePath(mins % 10);
};

const onMessage = (event) => {
  console.log(JSON.stringify(event.data));
  chosenColor = SETS[event.data.color];
  db.set(KEY_COLOR, chosenColor);
  console.log(`Chosen color: ${chosenColor}`);
  update(new Date());
};

(() => {
  console.log('Beam Up');

  db.load(APP_NAME);
  chosenColor = loadColor();
  
  clock.granularity = 'minutes';
  clock.ontick = event => update(event.date);
  update(new Date());
  
  messaging.peerSocket.onmessage = onMessage;
})();
