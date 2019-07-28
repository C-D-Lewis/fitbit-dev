import clock from 'clock';
import { display } from 'display';
import messaging from 'messaging';
import SecondsBar from './SecondsBar';
import * as data from './data';
import * as db from '../common/db';
import * as ui from '../common/ui';

const APP_NAME = 'BeamUp';  // Do not change without migration
const TEST_ALL_CHANGE = false;

const secondsBar = new SecondsBar();
let chosenColor = '';

const includes = (target, val) => target.indexOf(val) !== -1;

const getTimeDigits = (date) => {
  const hours = date.getHours();
  const mins = date.getMinutes();
  return {
  	h0: Math.floor(hours / 10),
  	h1: hours % 10,
  	m0: Math.floor(mins / 10),
  	m1: mins % 10
  };
};

const predictNextChanges = (date) => {
  const { h0, h1, m0, m1 } = getTimeDigits(date);
  const changes = [];

  if (((h0 === 0) && (h1 === 9) && (m0 === 5) && (m1 === 9))      // 09:59 --> 10:00
   || ((h0 === 1) && (h1 === 9) && (m0 === 5) && (m1 === 9))      // 19:59 --> 20:00
   || ((h0 === 2) && (h1 === 3) && (m0 === 5) && (m1 === 9))) {   // 23:59 --> 00:00
    changes.push('h0');
  }

  if ((m0 === 5) && (m1 === 9)) {
    changes.push('h1');  // XX:59 --> XY:00
  }
  if (m1 === 9) {
    changes.push('m0');  // XX:X9 --> XX:Y0
  }

  changes.push('m1');
  return TEST_ALL_CHANGE ? ['h0', 'h1', 'm0', 'm1'] : changes;
};

const scheduleColorChange = (id) => {
  setTimeout(() => ui.get(id).style.fill = chosenColor, 1200);
  setTimeout(() => ui.get(id).style.fill = 'white', 2500);
};

const updateTime = (date) => {
  const timeDigits = getTimeDigits(date);
  ui.get('h0').href = data.getTimePath(timeDigits.h0);
  ui.get('h1').href = data.getTimePath(timeDigits.h1);
  ui.get('m0').href = data.getTimePath(timeDigits.m0);
  ui.get('m1').href = data.getTimePath(timeDigits.m1);
};

const updateDate = (date) => {
  const dayOfMonth = date.getDate();
  ui.get('d0').href = data.getDatePath(Math.floor(dayOfMonth / 10));
  ui.get('d1').href = data.getDatePath(dayOfMonth % 10);

  ui.get('day').href = data.getDayPath(date.getDay());
};

const onSecondTick = (date) => {
  const seconds = date.getSeconds();
  secondsBar.setProgress(seconds);

  updateTime(date);
  updateDate(date);

  // Begin animation chain
  if (seconds === 58) {
    const changes = predictNextChanges(date);
    if (includes(changes, 'h0')) {
      ui.get('b0').animate('enable');
      ui.get('h0').animate('enable');
      scheduleColorChange('h0');
    }
    if (includes(changes, 'h1')) {
      ui.get('b1').animate('enable');
      ui.get('h1').animate('enable');
      scheduleColorChange('h1');
    }
    if (includes(changes, 'm0')) {
      ui.get('b2').animate('enable');
      ui.get('m0').animate('enable');
      scheduleColorChange('m0');
    }
    if (includes(changes, 'm1')) {
      ui.get('b3').animate('enable');
      ui.get('m1').animate('enable');
      scheduleColorChange('m1');
    }
  }
};

const onMessage = (event) => {
  data.setColor(event.data.color);

  chosenColor = data.loadColor();
  console.log(`Chosen color: ${chosenColor}`);

  ui.get('background').style.fill = chosenColor;
};

const onDisplayChange = (event) => {
  if (!display.on) {
    secondsBar.hideAll();
    return;
  }

  const date = new Date();
  updateTime(date);
  updateDate(date);

  // Last qhole 15 second segment
  let seconds = date.getSeconds();
  while(seconds % 15 !== 0) seconds -= 1;
  secondsBar.setProgress(seconds);
};

const main = () => {
  console.log('Beam Up app');

  db.init(APP_NAME);
  chosenColor = data.loadColor();

  clock.granularity = 'seconds';
  clock.ontick = event => onSecondTick(event.date);

  // Initial setup
  ui.get('background').style.fill = chosenColor;
  const now = new Date();
  updateTime(now);
  updateDate(now);

  display.onchange = onDisplayChange;
  messaging.peerSocket.onmessage = onMessage;
};

main();
