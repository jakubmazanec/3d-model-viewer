'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

require('../internals/cssModules');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaCompress = require('koa-compress');

var _koaCompress2 = _interopRequireDefault(_koaCompress);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koaSend = require('koa-send');

var _koaSend2 = _interopRequireDefault(_koaSend);

var _Router = require('ash/Router');

var _Router2 = _interopRequireDefault(_Router);

var _koaRouter = require('ash/koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _ash = require('ash');

var _ash2 = _interopRequireDefault(_ash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _appRoot = require('../internals/appRoot');

var _appRoot2 = _interopRequireDefault(_appRoot);

var _App = require('../components/App');

var _App2 = _interopRequireDefault(_App);

var _errorResponse = require('./middlewares/errorResponse');

var _errorResponse2 = _interopRequireDefault(_errorResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readFile = _bluebird2.default.promisify(_fs2.default.readFile);
// import https from 'https';

var app = new _koa2.default();

app.use((0, _koaBodyparser2.default)());
app.use((0, _koaLogger2.default)());
app.use((0, _errorResponse2.default)());

// serve static files
app.use(function () {
	var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(context, next) {
		var options;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						options = {
							root: _path2.default.resolve(_path2.default.join(_appRoot2.default, 'public'))
						};

						if (!(context.method !== 'HEAD' && context.method !== 'GET')) {
							_context.next = 5;
							break;
						}

						_context.next = 4;
						return next();

					case 4:
						return _context.abrupt('return');

					case 5:
						if (!(context.body && context.body !== null || context.status !== 404)) {
							_context.next = 9;
							break;
						}

						_context.next = 8;
						return next();

					case 8:
						return _context.abrupt('return');

					case 9:
						_context.next = 11;
						return (0, _koaSend2.default)(context, context.path, options);

					case 11:
						_context.next = 13;
						return next();

					case 13:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));
	return function (_x, _x2) {
		return ref.apply(this, arguments);
	};
}());

// init router
var router = new _Router2.default();

// serve app
app.use((0, _koaRouter2.default)(router, function () {
	var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(context, next) {
		var viewStream, componentHtml;
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						if (!(context.method !== 'HEAD' && context.method !== 'GET')) {
							_context2.next = 4;
							break;
						}

						_context2.next = 3;
						return next();

					case 3:
						return _context2.abrupt('return');

					case 4:
						if (!(context.body && context.body !== null || context.status !== 404)) {
							_context2.next = 8;
							break;
						}

						_context2.next = 7;
						return next();

					case 7:
						return _context2.abrupt('return');

					case 8:
						viewStream = new _ash2.default.ViewStream(_ash2.default.createElement(_App2.default, null));
						_context2.next = 11;
						return _ash2.default.stringifyViewStream(viewStream);

					case 11:
						componentHtml = _context2.sent;
						_context2.next = 14;
						return readFile(_path2.default.join(_appRoot2.default, 'assets/templates/index.html'), 'utf8');

					case 14:
						context.body = _context2.sent;

						context.body = context.body.replace('%CONTENT%', componentHtml) /*.replace('%TEST%', componentHtml)*/;

						_context2.next = 18;
						return next();

					case 18:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));
	return function (_x3, _x4) {
		return ref.apply(this, arguments);
	};
}()));

// compression
app.use((0, _koaConvert2.default)((0, _koaCompress2.default)()));

// servers
// const HTTPS_OPTIONS = {
// 	key: fs.readFileSync('./localhost-key.pem'),
// 	cert: fs.readFileSync('./localhost-cert.pem')
// };

var PORT = 8008;
// const HTTPS_PORT = 443;

_http2.default.createServer(app.callback()).listen(process.env.PORT || PORT);
// https.createServer(HTTPS_OPTIONS, app.callback()).listen(HTTPS_PORT);

console.log('Listening on port ' + (process.env.PORT || PORT) + '...');