'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ash = require('ash');

var _ash2 = _interopRequireDefault(_ash);

var _hexToRGBAString = require('../../internals/hexToRGBAString');

var _hexToRGBAString2 = _interopRequireDefault(_hexToRGBAString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var textInput = {};

textInput.default = {
	color: _ash2.default.config.colors.text,
	backgroundColor: _ash2.default.config.colors.background,
	borderColor: _ash2.default.config.colors.neutral.tint[4],
	borderWidth: 2,
	borderRadius: '0.125bh',
	boxShadow: 'inset 0 0.0625bh 0.0625bh ' + (0, _hexToRGBAString2.default)(_ash2.default.config.colors.neutral.base, 0.15),
	fontSize: _ash2.default.config.text.fontSize,

	placeholder: {
		color: _ash2.default.config.colors.neutral.tint[3]
	}
};

textInput.default.invalid = {
	color: textInput.default.color,
	backgroundColor: textInput.default.backgroundColor,
	borderColor: _ash2.default.config.colors.negative.base,
	boxShadow: textInput.default.boxShadow,

	placeholder: {
		color: textInput.default.placeholder.color
	}
};

textInput.default.focused = {
	color: textInput.default.color,
	backgroundColor: textInput.default.backgroundColor,
	borderColor: _ash2.default.config.colors.secondary1.base,
	boxShadow: textInput.default.boxShadow,

	placeholder: {
		color: textInput.default.placeholder.color
	}
};

textInput.default.hovered = {
	color: textInput.default.color,
	backgroundColor: textInput.default.backgroundColor,
	borderColor: _ash2.default.config.colors.secondary1.base,
	boxShadow: textInput.default.boxShadow,

	placeholder: {
		color: textInput.default.placeholder.color
	}
};

textInput.default.disabled = {
	color: _ash2.default.config.colors.neutral.tint[4],
	backgroundColor: textInput.default.backgroundColor,
	borderColor: _ash2.default.config.colors.neutral.tint[6],
	boxShadow: 'inset 0 0.0625bh 0.0625bh ' + (0, _hexToRGBAString2.default)(_ash2.default.config.colors.neutral.base, 0.1),

	placeholder: {
		color: _ash2.default.config.colors.neutral.tint[7]
	}
};

exports.default = textInput;