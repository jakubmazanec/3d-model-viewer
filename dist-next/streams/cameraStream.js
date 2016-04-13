'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ash = require('ash');

var _ash2 = _interopRequireDefault(_ash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let cameraStream = new _ash2.default.Stream();

exports.default = cameraStream;