'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Router = require('ash/Router');

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _Router2.default();
var routeStream = router.add('(:page)(/)').map(function (value) {
	var page = value.page;


	return { page: page };
});

exports.default = routeStream;