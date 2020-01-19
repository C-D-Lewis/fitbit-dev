"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Window = Window;
exports.animate = exports.setText = exports.setVisible = exports.get = void 0;

var _document = _interopRequireDefault(require("document"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Get an element by 'id'
 *
 * @param {string} id - Element ID.
 * @returns {HTMLElement} The element. If it's already an object, the object is returned.
 */
var get = function get(id) {
  return _typeof(id) === 'object' ? id : _document["default"].getElementById(id);
};
/**
 * Set an element's visibility.
 *
 * @param {string} id - Element 'id' to show/hide.
 * @param {boolean} visible - Set to 'true' to show, 'false' to hide.
 */


exports.get = get;

var setVisible = function setVisible(id, visible) {
  get(id).style.display = visible ? 'inline' : 'none';
};
/**
 * Set the 'text' of an element.
 *
 * @param {string} id - Element 'id' to update.
 * @param {string} text - Text to show.
 */


exports.setVisible = setVisible;

var setText = function setText(id, text) {
  get(id).text = text;
};
/**
 * Trigger an element's associated animation.
 *
 * @param {string} id - Element ID.
 */


exports.setText = setText;

var animate = function animate(id) {
  return get(id).animate('enable');
};
/**
 * Windows collect multiple elements by ID using a parent <svg> element, and start hidden.
 * opts.setup is called immediately
 * opts.update is called at the developer's discretion to update all elements at once.
 *
 * @param {Object} opts - Options (see below)
 * @returns {Function} Window 'class'.
 */


exports.animate = animate;

function Window(_ref) {
  var _this = this;

  var id = _ref.id,
      setup = _ref.setup,
      update = _ref.update;
  this.id = id;

  this.show = function () {
    return setVisible(_this.id, true);
  };

  this.hide = function () {
    return setVisible(_this.id, false);
  };

  this.hide();

  if (update) {
    this.update = update;
  }

  if (setup) {
    setup();
  }
}