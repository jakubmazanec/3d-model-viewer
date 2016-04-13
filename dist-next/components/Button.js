'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ash = require('ash');

var _ash2 = _interopRequireDefault(_ash);

var _Router = require('ash/Router');

var _Router2 = _interopRequireDefault(_Router);

var _Button = require('./Button.css');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MAILTO_REGEX = /^mailto:/;
const ROUTE_LINK_REGEX = /^\//;

let router = new _Router2.default();

let Button = function (_ash$Component) {
	(0, _inherits3.default)(Button, _ash$Component);

	function Button() {
		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, Button);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Button).call(this, ...args)), _this), _this.state = {
			label: _this.props.label || '+'
		}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(Button, [{
		key: 'render',
		value: function render() {
			let buttonClass = _Button2.default.default;

			if (this.props.type === 'flat') {
				buttonClass = _Button2.default.flat;
			} else if (this.props.type === 'invisible') {
				buttonClass = _Button2.default.invisible;
			}

			buttonClass += this.props.isLarge ? ' isLarge' : '';

			return _ash2.default.createElement(
				'a',
				{ href: this.props.link ? this.props.link : '#', 'class': buttonClass + (this.props.isEnabled ? ' isEnabled' : ' isDisabled'), events: {
						click: this.handleClick
					} },
				this.props.label || ''
			);
		}
	}, {
		key: 'handleClick',
		value: function handleClick(event) {
			if (!(this.props.link || MAILTO_REGEX.test(this.props.link))) {
				event.preventDefault();

				if (this.props.onClick) {
					this.props.onClick();
				}
			} else if (ROUTE_LINK_REGEX.test(this.props.link)) {
				event.preventDefault();

				router.navigate(this.props.link);
			}
		}
	}]);
	return Button;
}(_ash2.default.Component);

exports.default = Button;