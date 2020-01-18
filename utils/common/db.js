import { readFileSync, writeFileSync } from 'fs';

let data = {};
let dbPath = '';

/**
 * Save the data to the filesystem.
 */
const save = () => writeFileSync(dbPath, data, 'json');

/**
 * Initialise the data in the filesystem to empty object.
 *
 * @param {string} appName - App name, used to save data for this app.
 */
export const init = (appName) => {
  dbPath = `${appName}.json`;

  try {
    data = readFileSync(dbPath, 'json');
    console.log(`Loaded ${dbPath}`);
  } catch(e) {
    console.log(e);
    data = {};
    save();
  }
};

/**
 * Determine if a key contains data.
 *
 * @param {string} key - Key to search.
 * @returns {boolean} true if the key has defined value.
 */
export const contains = key => get(key) !== null;

/**
 * Get a value for a given key.
 *
 * @param {string} key - Key to search.
 * @returns {*} Value associated, if any.
 */
export const get = key => data[key];

/**
 * Set a value and save it.
 *
 * @param {string} key - Key to use.
 * @param {*} value - Value to use.
 */
export const set = (key, value) => {
  data[key] = value;
  save();
};
