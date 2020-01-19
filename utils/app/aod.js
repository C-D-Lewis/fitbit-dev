"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _display = require("display");

var _appbit = require("appbit");

/**
 * Handle Always on Display on/off events.
 *
 * @param {Object} handlers - containing onAodStarted() and onAodEnded().
 */
var handleAoD = function handleAoD(handlers) {
  if (!_display.display.aodAvailable) {
    console.error('AoD is not supported');
  }

  if (!_appbit.me.permissions.granted("access_aod")) {
    console.error('access_aod permission not granted');
  }

  _display.display.aodAllowed = true;

  _display.display.addEventListener("change", function () {
    if (!_display.display.aodActive && _display.display.on) {
      handlers.onAodEnded();
      return;
    }

    handlers.onAodStarted();
  });
};

var _default = handleAoD;
exports["default"] = _default;