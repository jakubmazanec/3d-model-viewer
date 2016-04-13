'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = errorResponse;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function errorResponse() {
	return (() => {
		var ref = (0, _asyncToGenerator3.default)(function* (context, next) {
			try {
				yield next();
			} catch (error) {
				console.warn('\nError! (final error middleware)', error);

				context.status = error.status || 500;

				context.body = {
					error: {
						code: 0,
						message: error.message,
						description: '' // TODO - limit error description for production
					}
				};

				context.app.emit('error', error, context);
			}
		});
		return function (_x, _x2) {
			return ref.apply(this, arguments);
		};
	})();
}