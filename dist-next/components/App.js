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

var _pageStream = require('../streams/pageStream');

var _pageStream2 = _interopRequireDefault(_pageStream);

var _App = require('./App.css');

var _App2 = _interopRequireDefault(_App);

var _Canvas = require('./Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Sidebar = require('./Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let App = function (_ash$Component) {
	(0, _inherits3.default)(App, _ash$Component);

	function App() {
		(0, _classCallCheck3.default)(this, App);
		return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
	}

	(0, _createClass3.default)(App, [{
		key: 'render',
		value: function render() {
			return _ash2.default.createElement(
				'div',
				{ 'class': _App2.default.root },
				_ash2.default.createElement(_Canvas2.default, null),
				_ash2.default.createElement(_Sidebar2.default, null)
			);
		}
	}, {
		key: 'onMount',
		value: function onMount() {
			_pageStream2.default.on(this.update);
		}
	}]);
	return App;
}(_ash2.default.Component);

exports.default = App;