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

var _TextInput = require('./TextInput.css');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _Form = require('./Form.css');

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ENTER_KEY_CODE = 13;

var TextInput = function (_ash$Component) {
	(0, _inherits3.default)(TextInput, _ash$Component);

	function TextInput() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, TextInput);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(TextInput)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
			value: _this.props.value || '',
			result: false,
			isValid: true
		}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(TextInput, [{
		key: 'shouldUpdate',
		value: function shouldUpdate(newProps) {
			return newProps.inputOnly !== this.props.inputOnly || newProps.autocomplete !== this.props.autocomplete || newProps.id !== this.props.id || newProps.name !== this.props.name || newProps.label !== this.props.label || newProps.hint !== this.props.hint || newProps.validationErrorMessages !== this.props.validationErrorMessages || newProps.change !== this.props.change || newProps.save !== this.props.save || newProps.validate !== this.props.validate;
		}
	}, {
		key: 'render',
		value: function render() {
			var textInputProps = {
				key: this.props.id || this.props.name || 'text-input',
				className: _TextInput2.default.default + (this.state.isValid && this.state.value.length ? ' isValid' : !this.state.isValid ? ' isInvalid' : ''),
				type: 'text',
				name: this.props.name || this.props.id || '',
				id: this.props.id || this.props.name || '',
				// value: this.state.value || '',
				events: {
					blur: this.onFocusout,
					input: this.onInput,
					keydown: this.onKeydown
				}
			};

			if (this.props.autocomplete === false) {
				textInputProps.autocomplete = 'off';
			}

			var textInput = _ash2.default.createElement('input', textInputProps);

			return this.props.inputOnly === true ? textInput : _ash2.default.createElement(
				'div',
				{ 'class': _Form2.default.row },
				_ash2.default.createElement(
					'div',
					{ 'class': _Form2.default.label },
					_ash2.default.createElement(
						'label',
						{ 'for': this.props.id || '' },
						this.props.label + ''
					),
					_ash2.default.createElement(
						'span',
						null,
						this.props.hint
					)
				),
				_ash2.default.createElement(
					'div',
					{ 'class': _Form2.default.fields },
					textInput
				),
				_ash2.default.createElement(
					'div',
					{ 'class': _Form2.default.errorMessage + (!this.state.isValid ? ' isVisible' : '') },
					this.props.validationErrorMessages || null
				)
			);
		}
	}, {
		key: 'onInput',
		value: function onInput(event) {
			this.state.value = event.target.value;
			this.validate();

			if (this.props.change) {
				this.props.change(this.state.result);
			}

			this.update();
		}
	}, {
		key: 'onFocusout',
		value: function onFocusout(event) {
			this.state.value = event.target.value;
			this.validate();

			if (this.props.save) {
				this.props.save(this.state.result);
			}

			this.update();
		}
	}, {
		key: 'onKeydown',
		value: function onKeydown(event) {
			if (event.keyCode === ENTER_KEY_CODE) {
				this.state.value = event.target.value;
				this.validate();

				if (this.props.save) {
					this.props.save(this.state.result);
				}

				this.update();
			}
		}
	}, {
		key: 'validate',
		value: function validate() {
			this.state.result = this.props.validate ? this.props.validate(this.state.value) : this.state.value;

			if (this.state.result === false) {
				this.state.isValid = false;
			} else {
				this.state.isValid = true;
			}
		}
	}]);
	return TextInput;
}(_ash2.default.Component);

exports.default = TextInput;