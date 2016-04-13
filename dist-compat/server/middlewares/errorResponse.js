'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = errorResponse;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function errorResponse() {
	var _this = this;

	return function () {
		var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(context, next) {
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.prev = 0;
							_context.next = 3;
							return next();

						case 3:
							_context.next = 11;
							break;

						case 5:
							_context.prev = 5;
							_context.t0 = _context['catch'](0);

							console.warn('\nError! (final error middleware)', _context.t0);

							context.status = _context.t0.status || 500;

							context.body = {
								error: {
									code: 0,
									message: _context.t0.message,
									description: '' // TODO - limit error description for production
								}
							};

							context.app.emit('error', _context.t0, context);

						case 11:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this, [[0, 5]]);
		}));
		return function (_x, _x2) {
			return ref.apply(this, arguments);
		};
	}();
}