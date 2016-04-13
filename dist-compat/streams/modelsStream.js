'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _ash = require('ash');

var _ash2 = _interopRequireDefault(_ash);

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _modelLoaderStream = require('./modelLoaderStream');

var _modelLoaderStream2 = _interopRequireDefault(_modelLoaderStream);

var _STLLoader = require('../loaders/STLLoader');

var _STLLoader2 = _interopRequireDefault(_STLLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loader = new _STLLoader2.default();
var modelStream = new _ash2.default.Stream([]);

modelStream.combine(function (dependency, self) {
		var modelName = dependency.get();
		var models = self.get();

		loader.load('./assets/' + modelName, function (geometry) {
				var material = void 0;

				if (geometry.hasColors) {
						material = new _three2.default.MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: _three2.default.VertexColors });
				} else {
						material = new _three2.default.MeshPhongMaterial({ color: 0xAAAAAA, specular: 0x111111, shininess: 200 });
				}

				var mesh = new _three2.default.Mesh(geometry, material);

				mesh.geometry.computeBoundingBox();

				var delta = mesh.geometry.boundingBox.max.clone().sub(mesh.geometry.boundingBox.min);

				mesh.position.set(delta.x * -0.5, delta.y * -0.5, delta.z * -0.5);
				mesh.rotation.set(0, 0, 0);
				mesh.scale.set(1, 1, 1);

				mesh.castShadow = false;
				mesh.receiveShadow = true;
				mesh.__id = modelName;
				mesh.__boundingBox = new _three2.default.BoxHelper(mesh);
				mesh.__boundingBox.visible = false;

				models.push(mesh);
				self.push(models);
		});
}, _modelLoaderStream2.default);

exports.default = modelStream;