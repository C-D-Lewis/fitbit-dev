import clock from "clock";
import document from "document";

import * as ui from '../common/ui';

const digits = [ ui.get('h0'), ui.get('h1'), ui.get('m0'), ui.get('m1') ];

const getImagePath = value => `${value}.png`;

const update = (date) => {
  const hours = date.getHours();
  const mins = date.getMinutes();
  
  digits[0].href = getImagePath(Math.floor(hours / 10));
  digits[1].href = getImagePath(hours % 10);
  digits[2].href = getImagePath(Math.floor(mins / 10));
  digits[3].href = getImagePath(mins % 10);
};

(() => {
  console.log('Beam Up');
  
  clock.granularity = 'minutes';
  clock.ontick = event => update(event.date);
  update(new Date());
})();
