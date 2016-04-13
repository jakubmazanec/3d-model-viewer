'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ash = require('ash');

var _ash2 = _interopRequireDefault(_ash);

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _modelsStream = require('./modelsStream');

var _modelsStream2 = _interopRequireDefault(_modelsStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let sceneStream = new _ash2.default.Stream(new _three2.default.Scene());

sceneStream.combine((dependency, self) => {
	let models = dependency.get();
	let scene = self.get();

	if (models.length) {
		let model = models[models.length - 1];

		scene.add(model);

		if (model.__boundingBox) {
			scene.add(model.__boundingBox);
		}
	}

	self.push(scene);
}, _modelsStream2.default);

exports.default = sceneStream;