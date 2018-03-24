import clock from 'clock';
import { display } from 'display';
const messaging = require('messaging');

import * as BeamUpUI from './BeamUpUI';
import * as data from './data';
import * as db from '../common/db';
import * as ui from '../common/ui';

const APP_NAME = 'BeamUp';  // Do not change without migration
const TEST_BEAMS = false;

const secondsBar = new BeamUpUI.SecondsBar();
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

  if(((h0 === 0) && (h1 === 9) && (m0 === 5) && (m1 === 9))      // 09:59 --> 10:00
  || ((h0 === 1) && (h1 === 9) && (m0 === 5) && (m1 === 9))      // 19:59 --> 20:00
  || ((h0 === 2) && (h1 === 3) && (m0 === 5) && (m1 === 9))) {   // 23:59 --> 00:00
    changes.push('h0');
  }

  if((m0 === 5) && (m1 === 9)) changes.push('h1');  // XX:59 --> XY:00
  if(m1 === 9) changes.push('m0');  // XX:X9 --> XX:Y0

  changes.push('m1');
  return TEST_BEAMS ? ['h0', 'h1', 'm0', 'm1'] : changes;
};

const scheduleColorChange = (id) => {
  setTimeout(() => ui.get(id).style.fill = chosenColor, 1200);
  setTimeout(() => ui.get(id).style.fill = 'white', 2500);
};

const update = (date) => {
  const timeDigits = getTimeDigits(date);
  const seconds = date.getSeconds();
  
  secondsBar.setProgress(seconds);
  
  if(seconds !== 58 && seconds !== 1 && seconds % 15 !== 0) return;

  ui.get('background').style.fill = chosenColor;
  
  ui.get('h0').href = data.getTimePath(timeDigits.h0);
  ui.get('h1').href = data.getTimePath(timeDigits.h1);
  ui.get('m0').href = data.getTimePath(timeDigits.m0);
  ui.get('m1').href = data.getTimePath(timeDigits.m1);
  
  const dom = date.getDate();
  ui.get('d0').href = data.getDatePath(Math.floor(dom / 10));
  ui.get('d1').href = data.getDatePath(dom % 10);
  
  const day = date.getDay();
  ui.get('day').href = data.getDayPath(day);
  
  if(seconds === 58) {
    const changes = predictNextChanges(date);
    if(includes(changes, 'h0')) {
      ui.get('b0').animate('enable');
      ui.get('h0').animate('enable');
      scheduleColorChange('h0');
    }
    if(includes(changes, 'h1')) {
      ui.get('b1').animate('enable');
      ui.get('h1').animate('enable');
      scheduleColorChange('h1');
    }
    if(includes(changes, 'm0')) {
      ui.get('b2').animate('enable');
      ui.get('m0').animate('enable');
      scheduleColorChange('m0');
    }
    if(includes(changes, 'm1')) {
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

(() => {
  console.log('Beam Up');

  db.load(APP_NAME);
  chosenColor = data.loadColor();
  
  clock.granularity = 'seconds';
  clock.ontick = event => update(event.date);
  
  display.addEventListener('change', event => update(new Date()));

  // Always update on startup
  const nowish = new Date();
  let last15 = nowish.getSeconds();
  while(last15 % 15 !== 0) last15--;
  nowish.setSeconds(last15);
  update(nowish);
  
  messaging.peerSocket.onmessage = onMessage;
})();
