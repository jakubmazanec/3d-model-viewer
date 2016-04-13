'use strict';

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

let readFile = _bluebird2.default.promisify(_fs2.default.readFile);
// import https from 'https';

let app = new _koa2.default();

app.use((0, _koaBodyparser2.default)());
app.use((0, _koaLogger2.default)());
app.use((0, _errorResponse2.default)());

// serve static files
app.use((() => {
	var ref = (0, _asyncToGenerator3.default)(function* (context, next) {
		let options = {
			root: _path2.default.resolve(_path2.default.join(_appRoot2.default, 'public'))
		};

		if (context.method !== 'HEAD' && context.method !== 'GET') {
			yield next();

			return;
		}

		// response is already handled
		if (context.body && context.body !== null || context.status !== 404) {
			yield next();

			return;
		}

		yield (0, _koaSend2.default)(context, context.path, options);
		yield next();
	});
	return function (_x, _x2) {
		return ref.apply(this, arguments);
	};
})());

// init router
let router = new _Router2.default();

// serve app
app.use((0, _koaRouter2.default)(router, (() => {
	var ref = (0, _asyncToGenerator3.default)(function* (context, next) {
		if (context.method !== 'HEAD' && context.method !== 'GET') {
			yield next();

			return;
		}

		// response is already handled
		if (context.body && context.body !== null || context.status !== 404) {
			yield next();

			return;
		}

		let viewStream = new _ash2.default.ViewStream(_ash2.default.createElement(_App2.default, null));
		let componentHtml = yield _ash2.default.stringifyViewStream(viewStream);

		context.body = yield readFile(_path2.default.join(_appRoot2.default, 'assets/templates/index.html'), 'utf8');
		context.body = context.body.replace('%CONTENT%', componentHtml) /*.replace('%TEST%', componentHtml)*/;

		yield next();
	});
	return function (_x3, _x4) {
		return ref.apply(this, arguments);
	};
})()));

// compression
app.use((0, _koaConvert2.default)((0, _koaCompress2.default)()));

// servers
// const HTTPS_OPTIONS = {
// 	key: fs.readFileSync('./localhost-key.pem'),
// 	cert: fs.readFileSync('./localhost-cert.pem')
// };

const PORT = 8008;
// const HTTPS_PORT = 443;

_http2.default.createServer(app.callback()).listen(process.env.PORT || PORT);
// https.createServer(HTTPS_OPTIONS, app.callback()).listen(HTTPS_PORT);

console.log(`Listening on port ${ process.env.PORT || PORT }...`);