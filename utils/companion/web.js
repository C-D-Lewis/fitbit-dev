"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJSON = exports.buildParams = void 0;

/**
 * Build a parameter string from an Object of key-value pairs.
 *
 * @param {Object} params - Key-value object, such as `{ filter: 'tags=foo' }`.
 * @returns {string} Query parameter string, to be appended to `?` or other parameters.
 */
var buildParams = function buildParams(params) {
  return Object.keys(params).map(function (key) {
    return "".concat(key, "=").concat(params[key]);
  }).join('&');
};
/**
 * Helper to fetch() some JSON.
 *
 * @param {string} url - URL to fetch.
 * @returns {Object} The received JSON.
 */


exports.buildParams = buildParams;

var getJSON = function getJSON(url) {
  return fetch(url).then(function (res) {
    return res.json();
  });
};

exports.getJSON = getJSON;