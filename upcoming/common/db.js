const fs = require('fs');

let data = {};
let dbPath = '';

const save = () => fs.writeFileSync(dbPath, data, 'json');

export const load = (appName) => {
  dbPath = `${appName}.json`;
  
  try {
    data = fs.readFileSync(dbPath, 'json');
    console.log(`Loaded ${dbPath}`);
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
