'use strict';

var _ash = require('ash');

var _ash2 = _interopRequireDefault(_ash);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Router = require('ash/Router');

var _Router2 = _interopRequireDefault(_Router);

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _App = require('../components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var G_KEY_CODE = 71;

// global.ash = ash;
// global.$ = $;
// global.three = three;

/* eslint-disable require-jsdoc */

(0, _jquery2.default)(global.document).on('keydown', function (event) {
	var tagName = event.target.tagName.toLowerCase();

	if (event.keyCode === G_KEY_CODE && event.target && tagName !== 'textarea' && tagName !== 'input') {
		(0, _jquery2.default)('body').toggleClass('hasGrid');
	}
});

// init router
var router = new _Router2.default();

router.start();

// init renderer
var viewStream = new _ash2.default.ViewStream(_ash2.default.createElement(_App2.default, null));

_ash2.default.renderViewStream(viewStream, global.document.querySelector('.page'));