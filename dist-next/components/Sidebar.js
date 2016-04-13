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

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _Sidebar = require('./Sidebar.css');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _modelsStream = require('../streams/modelsStream');

var _modelsStream2 = _interopRequireDefault(_modelsStream);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _TextInput = require('./TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NUMBER_FORMAT = new Intl.NumberFormat('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

let Sidebar = function (_ash$Component) {
	(0, _inherits3.default)(Sidebar, _ash$Component);

	function Sidebar() {
		(0, _classCallCheck3.default)(this, Sidebar);
		return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Sidebar).apply(this, arguments));
	}

	(0, _createClass3.default)(Sidebar, [{
		key: 'render',
		value: function render() {
			let models = _modelsStream2.default.get();
			let modelElements = null;

			if (models.length) {
				let model = models[0];

				modelElements = [];

				modelElements.push(_ash2.default.createElement(
					'h1',
					{ 'class': _ash2.default.styles.sectionLevel4Heading },
					'X position'
				), _ash2.default.createElement(
					'p',
					{ 'class': _Sidebar2.default.value },
					_ash2.default.createElement(
						'span',
						{ 'class': _Sidebar2.default.number },
						`${ NUMBER_FORMAT.format(model.position.x) }`
					),
					_ash2.default.createElement(_Button2.default, { label: '+', isEnabled: true, onClick: this.handleIncreaseXPositionButtonClick }),
					_ash2.default.createElement(_Button2.default, { label: '-', isEnabled: true, onClick: this.handleDecreaseXPositionButtonClick })
				), _ash2.default.createElement(
					'h1',
					{ 'class': _ash2.default.styles.sectionLevel4Heading },
					'Y position'
				), _ash2.default.createElement(
					'p',
					{ 'class': _Sidebar2.default.value },
					_ash2.default.createElement(
						'span',
						{ 'class': _Sidebar2.default.number },
						`${ NUMBER_FORMAT.format(model.position.y) }`
					),
					_ash2.default.createElement(_Button2.default, { label: '+', isEnabled: true, onClick: this.handleIncreaseYPositionButtonClick }),
					_ash2.default.createElement(_Button2.default, { label: '-', isEnabled: true, onClick: this.handleDecreaseYPositionButtonClick })
				), _ash2.default.createElement(
					'h1',
					{ 'class': _ash2.default.styles.sectionLevel4Heading },
					'Z position'
				), _ash2.default.createElement(
					'p',
					{ 'class': _Sidebar2.default.value },
					_ash2.default.createElement(
						'span',
						{ 'class': _Sidebar2.default.number },
						`${ NUMBER_FORMAT.format(model.position.z) }`
					),
					_ash2.default.createElement(_Button2.default, { label: '+', isEnabled: true, onClick: this.handleIncreaseZPositionButtonClick }),
					_ash2.default.createElement(_Button2.default, { label: '-', isEnabled: true, onClick: this.handleDecreaseZPositionButtonClick })
				));

				modelElements.push(_ash2.default.createElement(
					'h1',
					{ 'class': _ash2.default.styles.sectionLevel4Heading },
					'X rotation'
				), _ash2.default.createElement(
					'p',
					{ 'class': _Sidebar2.default.value },
					_ash2.default.createElement(
						'span',
						{ 'class': _Sidebar2.default.number },
						`${ NUMBER_FORMAT.format(model.rotation.x) }`
					),
					_ash2.default.createElement(_Button2.default, { label: '+', isEnabled: true, onClick: this.handleIncreaseXRotationButtonClick }),
					_ash2.default.createElement(_Button2.default, { label: '-', isEnabled: true, onClick: this.handleDecreaseXRotationButtonClick })
				), _ash2.default.createElement(
					'h1',
					{ 'class': _ash2.default.styles.sectionLevel4Heading },
					'Y rotation'
				), _ash2.default.createElement(
					'p',
					{ 'class': _Sidebar2.default.value },
					_ash2.default.createElement(
						'span',
						{ 'class': _Sidebar2.default.number },
						`${ NUMBER_FORMAT.format(model.rotation.y) }`
					),
					_ash2.default.createElement(_Button2.default, { label: '+', isEnabled: true, onClick: this.handleIncreaseYRotationButtonClick }),
					_ash2.default.createElement(_Button2.default, { label: '-', isEnabled: true, onClick: this.handleDecreaseYRotationButtonClick })
				), _ash2.default.createElement(
					'h1',
					{ 'class': _ash2.default.styles.sectionLevel4Heading },
					'Z rotation'
				), _ash2.default.createElement(
					'p',
					{ 'class': _Sidebar2.default.value },
					_ash2.default.createElement(
						'span',
						{ 'class': _Sidebar2.default.number },
						`${ NUMBER_FORMAT.format(model.rotation.z) }`
					),
					_ash2.default.createElement(_Button2.default, { label: '+', isEnabled: true, onClick: this.handleIncreaseZRotationButtonClick }),
					_ash2.default.createElement(_Button2.default, { label: '-', isEnabled: true, onClick: this.handleDecreaseZRotationButtonClick })
				));

				modelElements.push(_ash2.default.createElement(
					'h1',
					{ 'class': _ash2.default.styles.sectionLevel4Heading },
					'Color'
				), _ash2.default.createElement(
					'p',
					null,
					_ash2.default.createElement(_TextInput2.default, { inputOnly: true, id: 'color', change: this.handleChangeColorInput })
				));
			}

			return _ash2.default.createElement(
				'div',
				{ 'class': _Sidebar2.default.root },
				_ash2.default.createElement(
					'div',
					null,
					modelElements
				)
			);
		}
	}, {
		key: 'onMount',
		value: function onMount() {
			if (_ash2.default.support.platform === 'server') {
				return;
			}

			requestAnimationFrame(this.handleAnimationFrame);
		}
	}, {
		key: 'handleAnimationFrame',
		value: function handleAnimationFrame() {
			requestAnimationFrame(this.handleAnimationFrame);

			this.update();
		}
	}, {
		key: 'handleIncreaseXPositionButtonClick',
		value: function handleIncreaseXPositionButtonClick() {
			this.addToPosition(10, 0, 0);
		}
	}, {
		key: 'handleDecreaseXPositionButtonClick',
		value: function handleDecreaseXPositionButtonClick() {
			this.addToPosition(-10, 0, 0);
		}
	}, {
		key: 'handleIncreaseYPositionButtonClick',
		value: function handleIncreaseYPositionButtonClick() {
			this.addToPosition(0, 10, 0);
		}
	}, {
		key: 'handleDecreaseYPositionButtonClick',
		value: function handleDecreaseYPositionButtonClick() {
			this.addToPosition(0, -10, 0);
		}
	}, {
		key: 'handleIncreaseZPositionButtonClick',
		value: function handleIncreaseZPositionButtonClick() {
			this.addToPosition(0, 0, 10);
		}
	}, {
		key: 'handleDecreaseZPositionButtonClick',
		value: function handleDecreaseZPositionButtonClick() {
			this.addToPosition(0, 0, -10);
		}
	}, {
		key: 'handleIncreaseXRotationButtonClick',
		value: function handleIncreaseXRotationButtonClick() {
			this.addToRotation(5, 0, 0);
		}
	}, {
		key: 'handleDecreaseXRotationButtonClick',
		value: function handleDecreaseXRotationButtonClick() {
			this.addToRotation(-5, 0, 0);
		}
	}, {
		key: 'handleIncreaseYRotationButtonClick',
		value: function handleIncreaseYRotationButtonClick() {
			this.addToRotation(0, 5, 0);
		}
	}, {
		key: 'handleDecreaseYRotationButtonClick',
		value: function handleDecreaseYRotationButtonClick() {
			this.addToRotation(0, -5, 0);
		}
	}, {
		key: 'handleIncreaseZRotationButtonClick',
		value: function handleIncreaseZRotationButtonClick() {
			this.addToRotation(0, 0, 5);
		}
	}, {
		key: 'handleDecreaseZRotationButtonClick',
		value: function handleDecreaseZRotationButtonClick() {
			this.addToRotation(0, 0, -5);
		}
	}, {
		key: 'handleChangeColorInput',
		value: function handleChangeColorInput(value) {
			let models = _modelsStream2.default.get();

			if (models.length) {
				let model = models[0];
				let color = parseInt(value, 16);

				if (value.length === 6 && typeof color === 'number' && color > -Infinity && color < Infinity) {
					let material = new _three2.default.MeshPhongMaterial({
						color,
						specular: 0x00000,
						shininess: 10,
						shading: _three2.default.SmoothShading
					});

					model.material = material;
				}
			}
		}
	}, {
		key: 'addToPosition',
		value: function addToPosition(x, y, z) {
			let models = _modelsStream2.default.get();

			if (models.length) {
				let model = models[0];

				model.position.x += x;
				model.position.y += y;
				model.position.z += z;
			}
		}
	}, {
		key: 'addToRotation',
		value: function addToRotation(x, y, z) {
			let models = _modelsStream2.default.get();

			if (models.length) {
				let model = models[0];

				model.rotation.x += x * (Math.PI / 180);
				model.rotation.y += y * (Math.PI / 180);
				model.rotation.z += z * (Math.PI / 180);
			}
		}
	}]);
	return Sidebar;
}(_ash2.default.Component);

exports.default = Sidebar;