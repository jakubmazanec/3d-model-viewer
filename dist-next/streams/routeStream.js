'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Router = require('ash/Router');

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router = new _Router2.default();
let routeStream = router.add('(:page)(/)').map(value => {
	let page = value.page;


	return { page };
});

exports.default = routeStream;