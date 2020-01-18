const fs = require('fs');

const PATH = 'db.json';

let data = {};

const save = () => fs.writeFileSync(PATH, data, 'json');

export const init = () => {
  try {
    data = fs.readFileSync(PATH, 'json');
    console.log(`Loaded ${PATH}`);
  } catch(e) {
    console.log(e);
    save();
  }
};

export const contains = key => get(key) !== undefined;

export const get = key => data[key];

export const set = (key, value) => {
  data[key] = value;
  save();
};
