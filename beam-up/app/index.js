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
const DAYS = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat'
};

const timeDigits = [ ui.get('h0'), ui.get('h1'), ui.get('m0'), ui.get('m1') ];
const dateDigits = [ ui.get('d0'), ui.get('d1') ];

let chosenColor = '';

const getTimePath = value => `time/${value}.png`;
const getDatePath = value => `date/${value}_s.png`;
const getDayPath = value => `day/${DAYS[value]}.png`;

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
  
  timeDigits[0].href = getTimePath(Math.floor(hours / 10));
  timeDigits[1].href = getTimePath(hours % 10);
  timeDigits[2].href = getTimePath(Math.floor(mins / 10));
  timeDigits[3].href = getTimePath(mins % 10);
  
  const dom = date.getDate();
  dateDigits[0].href = getDatePath(Math.floor(dom / 10));
  // dateDigits[0].href = getDatePath(2);
  dateDigits[1].href = getDatePath(dom % 10);
  
  const day = date.getDay();
  ui.get('day').href = getDayPath(day);
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
