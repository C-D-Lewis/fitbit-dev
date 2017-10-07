import clock from 'clock';
import * as messaging from 'messaging';

import * as ui from '../common/ui';
import * as db from '../common/db';

const APP_NAME = 'Isotime';

const SETS = {
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

const digits = [ ui.get('h0'), ui.get('h1'), ui.get('m0'), ui.get('m1') ];

const KEY_COLOR = 'color';

let chosenColor = 'white';

function getImagePath(value) { return `${value}.png`; }

function loadColor() {
  let color = '';
  if(db.contains(KEY_COLOR)) {
    color = SETS.white;
    db.set(KEY_COLOR, chosenColor);
    console.log(`Defaulted chosenColor=${chosenColor}`);
  } else {
    color = db.get(KEY_COLOR);
    console.log(`Read chosenColor=${chosenColor}`);
  }

  return color;
}

function update(date) {
  const hours = date.getHours();
  const mins = date.getMinutes();

  digits[0].style.fill = chosenColor;
  digits[0].href = getImagePath(Math.floor(hours / 10));
  digits[1].style.fill = chosenColor;
  digits[1].href = getImagePath(hours % 10);
  digits[2].style.fill = chosenColor;
  digits[2].href = getImagePath(Math.floor(mins / 10));
  digits[3].style.fill = chosenColor;
  digits[3].href = getImagePath(mins % 10);
}

(() => {
  console.log('Isotime for Ionic');  
  db.load(APP_NAME);
  chosenColor = loadColor();

  clock.granularity = 'minutes';
  clock.ontick = (evt) => {
    const date = evt.date;
    update(date);    
  };
  update(new Date());
  
  messaging.peerSocket.onmessage = (evt) => {
    chosenColor = SETS[evt.data.color];
    db.set(KEY_COLOR, chosenColor);
    console.log(`Chosen color: ${chosenColor}`);
    update(new Date());
  };

})();
