"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendFile = exports.sendMessage = void 0;

var _fileTransfer = require("file-transfer");

var cbor = _interopRequireWildcard(require("cbor"));

var messaging = _interopRequireWildcard(require("messaging"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Send a message through the peerSocket.
 * Appears to be less reliable then file-transfer.
 *
 * @param {Object} data - JSON object data to send.
 */
var sendMessage = function sendMessage(data) {
  return messaging.peerSocket.send(data);
};
/**
 * Send a JSON object as a file. Appears to be almost always reliable,
 * allowing a couple of seconds typical to transfer.
 *
 * @param {Object} data - JSON object data to send.
 * @param {string} [fileName] - Optional explicit file name.
 * @returns {Promise}
 */


exports.sendMessage = sendMessage;

var sendFile =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(data) {
    var fileName,
        res,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fileName = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'data.json';
            _context.next = 3;
            return _fileTransfer.outbox.enqueue(fileName, cbor.encode(data));

          case 3:
            res = _context.sent;
            console.log("File '".concat(fileName, "' enqueued"));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendFile(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.sendFile = sendFile;