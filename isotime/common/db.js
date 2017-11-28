import * as fs from 'fs';

let db = null;
let dbName = '';

function save() { fs.writeFileSync(dbName, db, 'json'); }

export function load(appName) {
  dbName = `${appName}.json`;
  
  try {
    db = fs.readFileSync(dbName, 'json');
    console.log(`Loaded ${dbName}`);
  } catch(e) {
    db = {};
    save();
  }
}

export function contains(key) { return get(key) !== null; }

export function get(key) {
  if(!db) return;
  
  return db[key];
}

export function set(key, value) {
  if(!db) return;
  
  db[key] = value;
  save();
}