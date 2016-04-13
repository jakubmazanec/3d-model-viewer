import '../internals/cssModules';

import Koa from 'koa';
import compress from 'koa-compress';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import fs from 'fs';
import path from 'path';
import http from 'http';
// import https from 'https';
import convertMiddleware from 'koa-convert';
import send from 'koa-send';
import Router from 'ash/Router';
import koaRouter from 'ash/koa-router';
import ash from 'ash';
import Promise from 'bluebird';

import appRoot from '../internals/appRoot';
import App from '../components/App';
import errorResponse from './middlewares/errorResponse';


let readFile = Promise.promisify(fs.readFile);
let app = new Koa();

app.use(bodyParser());
app.use(logger());
app.use(errorResponse());

// serve static files
app.use(async (context, next) => {
	let options = {
		root: path.resolve(path.join(appRoot, 'public'))
	};

	if (context.method !== 'HEAD' && context.method !== 'GET') {
		await next();

		return;
	}

	// response is already handled
	if (context.body && context.body !== null || context.status !== 404) {
		await next();

		return;
	}

	await send(context, context.path, options);
	await next();
});

// init router
let router = new Router();

// serve app
app.use(koaRouter(router, async (context, next) => {
	if (context.method !== 'HEAD' && context.method !== 'GET') {
		await next();

		return;
	}

	// response is already handled
	if (context.body && context.body !== null || context.status !== 404) {
		await next();

		return;
	}

	let viewStream = new ash.ViewStream(<App />);
	let componentHtml = await ash.stringifyViewStream(viewStream);

	context.body = await readFile(path.join(appRoot, 'assets/templates/index.html'), 'utf8');
	context.body = context.body.replace('%CONTENT%', componentHtml)/*.replace('%TEST%', componentHtml)*/;

	await next();
}));

// compression
app.use(convertMiddleware(compress()));

// servers
// const HTTPS_OPTIONS = {
// 	key: fs.readFileSync('./localhost-key.pem'),
// 	cert: fs.readFileSync('./localhost-cert.pem')
// };

const PORT = 8008;
// const HTTPS_PORT = 443;

http.createServer(app.callback()).listen(process.env.PORT || PORT);
// https.createServer(HTTPS_OPTIONS, app.callback()).listen(HTTPS_PORT);

console.log(`Listening on port ${process.env.PORT || PORT}...`);
