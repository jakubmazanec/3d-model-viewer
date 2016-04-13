'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ash = require('ash');

var _ash2 = _interopRequireDefault(_ash);

var _hexToRGBAString = require('../../internals/hexToRGBAString');

var _hexToRGBAString2 = _interopRequireDefault(_hexToRGBAString);

var _tintHex = require('../../internals/tintHex');

var _tintHex2 = _interopRequireDefault(_tintHex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var button = {};

button.default = {
	depth: '0.125bh',
	color: _ash2.default.config.colors.secondary1.shade[3],
	backgroundColor: _ash2.default.config.colors.secondary1.base,
	sideColor: _ash2.default.config.colors.secondary1.shade[1],
	borderColor: 'transparent',
	borderWidth: 0,
	borderRadius: '0.125bh',
	boxShadow: '0 0.125bh 0.125bh ' + (0, _hexToRGBAString2.default)(_ash2.default.config.colors.neutral.base, 0.4),
	fontSize: _ash2.default.config.text.fontSize,

	badge: {
		color: _ash2.default.config.colors.background,
		backgroundColor: _ash2.default.config.colors.primary1.base,
		borderRadius: '1bh',
		fontSize: _ash2.default.config.typographicScale[4]
	}
};

button.default.focused = {
	depth: '0.125bh',
	color: _ash2.default.config.colors.secondary1.shade[3],
	backgroundColor: _ash2.default.config.colors.secondary1.tint[1],
	sideColor: _ash2.default.config.colors.secondary1.shade[1],
	borderColor: 'transparent',
	boxShadow: '0 0.125bh 0.125bh ' + (0, _hexToRGBAString2.default)(_ash2.default.config.colors.neutral.base, 0.4)
};

button.default.hovered = {
	depth: '0.125bh',
	color: _ash2.default.config.colors.secondary1.shade[3],
	backgroundColor: (0, _tintHex2.default)(_ash2.default.config.colors.secondary1.base, 0.1),
	sideColor: (0, _tintHex2.default)(_ash2.default.config.colors.secondary1.shade[1], 0.1),
	borderColor: 'transparent',
	boxShadow: '0 0.125bh 0.125bh ' + (0, _hexToRGBAString2.default)(_ash2.default.config.colors.neutral.base, 0.4)
};

button.default.pressed = {
	depth: '0.0625bh',
	color: _ash2.default.config.colors.secondary1.shade[3],
	backgroundColor: _ash2.default.config.colors.secondary1.base,
	sideColor: _ash2.default.config.colors.secondary1.shade[1],
	borderColor: 'transparent',
	boxShadow: '0 0.0625bh 0.0625bh ' + (0, _hexToRGBAString2.default)(_ash2.default.config.colors.neutral.base, 0.3)
};

button.default.disabled = {
	depth: '0.125bh',
	color: _ash2.default.config.colors.neutral.tint[3],
	backgroundColor: _ash2.default.config.colors.neutral.tint[5],
	sideColor: _ash2.default.config.colors.neutral.tint[3],
	borderColor: 'transparent',
	boxShadow: '0 0.125bh 0.125bh ' + (0, _hexToRGBAString2.default)(_ash2.default.config.colors.neutral.base, 0.4)
};

exports.default = button;