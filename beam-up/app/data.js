import * as db from '../common/db';

const COLOR_SETS = {
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

const DAYS = { 0: 'sun', 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri', 6: 'sat' };

const DB_KEY_COLOR = 'color';

export const getTimePath = value => `time/${value}.png`;
export const getDatePath = value => `date/${value}_s.png`;
export const getDayPath = value => `day/${DAYS[value]}.png`;

export const setColor = key => db.set(DB_KEY_COLOR, COLOR_SETS[key]);

export const loadColor = () => {
  let hex = '';
  if(!db.contains(DB_KEY_COLOR)) {
    hex = COLOR_SETS.black;
    db.set(DB_KEY_COLOR, hex);
    console.log(`Defaulted to ${hex}`);
  }
  
  hex = db.get(DB_KEY_COLOR);
  console.log(`Read ${hex}`);

  if(!hex) {
    hex = SETS.black;
    db.set(DB_KEY_COLOR, hex);
    console.log(`Recovered ${hex}`);
  }

  return hex;
};
