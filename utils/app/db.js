"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = exports.get = exports.contains = exports.init = void 0;

var _fs = require("fs");

var data = {};
var dbPath = '';
/**
 * Save the data to the filesystem.
 */

var save = function save() {
  return (0, _fs.writeFileSync)(dbPath, data, 'json');
};
/**
 * Initialise the data in the filesystem to empty object.
 *
 * @param {string} appName - App name, used to save data for this app.
 */


var init = function init(appName) {
  dbPath = "".concat(appName, ".json");

  try {
    data = (0, _fs.readFileSync)(dbPath, 'json');
    console.log("Loaded ".concat(dbPath));
  } catch (e) {
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


exports.init = init;

var contains = function contains(key) {
  return get(key) !== null;
};
/**
 * Get a value for a given key.
 *
 * @param {string} key - Key to search.
 * @returns {*} Value associated, if any.
 */


exports.contains = contains;

var get = function get(key) {
  return data[key];
};
/**
 * Set a value and save it.
 *
 * @param {string} key - Key to use.
 * @param {*} value - Value to use.
 */


exports.get = get;

var set = function set(key, value) {
  data[key] = value;
  save();
};

exports.set = set;