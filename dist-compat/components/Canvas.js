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

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _Canvas = require('./Canvas.css');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _cameraStream = require('../streams/cameraStream');

var _cameraStream2 = _interopRequireDefault(_cameraStream);

var _sceneStream = require('../streams/sceneStream');

var _sceneStream2 = _interopRequireDefault(_sceneStream);

var _modelLoaderStream = require('../streams/modelLoaderStream');

var _modelLoaderStream2 = _interopRequireDefault(_modelLoaderStream);

var _modelsStream = require('../streams/modelsStream');

var _modelsStream2 = _interopRequireDefault(_modelsStream);

var _TrackballControls = require('../controls/TrackballControls');

var _TrackballControls2 = _interopRequireDefault(_TrackballControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Canvas = function (_ash$Component) {
	(0, _inherits3.default)(Canvas, _ash$Component);

	function Canvas() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, Canvas);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(Canvas)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.renderer = null, _this.mouse = new _three2.default.Vector2(), _this.controls = null, _this.raycaster = new _three2.default.Raycaster(), _this.plane = null, _this.offset = new _three2.default.Vector3(), _this.intersected = null, _this.selected = null, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(Canvas, [{
		key: 'render',
		value: function render() {
			return _ash2.default.createElement('div', { 'class': _Canvas2.default.root });
		}
	}, {
		key: 'onMount',
		value: function onMount() {
			if (_ash2.default.support.platform === 'server') {
				return;
			}

			var domNode = this.domNode;

			var _getDomNodeSize = this.getDomNodeSize();

			var domNodeWidth = _getDomNodeSize.width;
			var domNodeHeight = _getDomNodeSize.height;


			this.renderer = new _three2.default.WebGLRenderer({ antialias: true });

			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.renderer.setSize(domNodeWidth, domNodeHeight);
			this.renderer.setClearColor(parseInt(_ash2.default.config.colors.neutral.tint[7].slice(1), 16));

			this.renderer.gammaInput = true;
			this.renderer.gammaOutput = true;
			this.renderer.shadowMap.enabled = true;
			this.renderer.shadowMap.cullFace = _three2.default.CullFaceBack;

			domNode.appendChild(this.renderer.domElement);

			// create camera
			var camera = new _three2.default.PerspectiveCamera(45, domNodeWidth / domNodeHeight, 1, 10000);

			camera.position.set(0, 0, 1000);
			camera.lookAt(new _three2.default.Vector3(0, 0, 0));
			_cameraStream2.default.push(camera);

			// create controls
			this.controls = new _TrackballControls2.default(camera, domNode);
			this.controls.rotateSpeed = 8;
			this.controls.zoomSpeed = 7;
			this.controls.panSpeed = 2;
			this.controls.noZoom = false;
			this.controls.noPan = false;
			this.controls.staticMoving = true;
			this.controls.dynamicDampingFactor = 0.1;

			// create lights
			_sceneStream2.default.value.add(new _three2.default.HemisphereLight(0xffffff, 0x000000));

			// create axis
			var axisHelper = new _three2.default.AxisHelper(100);

			axisHelper.position.set(-500, -500 * (domNodeHeight / domNodeWidth), 0);
			_sceneStream2.default.value.add(axisHelper);

			// helper plane
			this.plane = new _three2.default.Mesh(new _three2.default.PlaneBufferGeometry(2000, 2000, 8, 8), new _three2.default.MeshBasicMaterial({ visible: false }));

			_sceneStream2.default.value.add(this.plane);

			// load model
			_modelLoaderStream2.default.push('skull.stl');

			// atach events
			window.addEventListener('resize', this.handleWindowResize, false);
			this.renderer.domElement.addEventListener('mousemove', this.handleMouseMove, false);
			this.renderer.domElement.addEventListener('mousedown', this.handleMouseDown, false);
			this.renderer.domElement.addEventListener('mouseup', this.handleMouseUp, false);

			// start rendering
			requestAnimationFrame(this.handleAnimationFrame);
		}
	}, {
		key: 'handleAnimationFrame',
		value: function handleAnimationFrame() {
			requestAnimationFrame(this.handleAnimationFrame);

			var models = _modelsStream2.default.value;

			for (var i = 0; i < models.length; i++) {
				if (models[i].__boundingBox) {
					models[i].__boundingBox.update(models[i]);
				}
			}

			this.controls.update();
			this.renderer.render(_sceneStream2.default.value, _cameraStream2.default.value);
		}
	}, {
		key: 'handleWindowResize',
		value: function handleWindowResize() {
			var _getDomNodeSize2 = this.getDomNodeSize();

			var domNodeWidth = _getDomNodeSize2.width;
			var domNodeHeight = _getDomNodeSize2.height;


			_cameraStream2.default.value.aspect = domNodeWidth / domNodeHeight;

			_cameraStream2.default.value.updateProjectionMatrix();
			this.renderer.setSize(domNodeWidth, domNodeHeight);
		}
	}, {
		key: 'handleMouseMove',
		value: function handleMouseMove(event) {
			event.preventDefault();

			this.mouse.x = (event.pageX - this.renderer.domElement.offsetLeft) / this.renderer.domElement.offsetWidth * 2 - 1;
			this.mouse.y = -((event.pageY - this.renderer.domElement.offsetTop) / this.renderer.domElement.offsetHeight) * 2 + 1;

			this.raycaster.setFromCamera(this.mouse, _cameraStream2.default.value);

			if (this.selected) {
				var _intersects = this.raycaster.intersectObject(this.plane);

				if (_intersects.length > 0) {
					this.selected.position.copy(_intersects[0].point.sub(this.offset));
				}

				return;
			}

			var intersects = this.raycaster.intersectObjects(_modelsStream2.default.value);

			if (intersects.length > 0) {
				if (this.intersected !== intersects[0].object) {
					if (this.intersected) {
						this.intersected.__boundingBox.visible = false;
					}

					this.intersected = intersects[0].object;
					this.intersected.__boundingBox.visible = true;

					this.plane.position.copy(this.intersected.position);
					this.plane.lookAt(_cameraStream2.default.value.position);
				}

				this.domNode.style.cursor = 'pointer';
			} else {
				if (this.intersected) {
					this.intersected.__boundingBox.visible = false;
				}

				this.intersected = null;

				this.domNode.style.cursor = 'auto';
			}
		}
	}, {
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			event.preventDefault();

			this.raycaster.setFromCamera(this.mouse, _cameraStream2.default.value);

			var intersects = this.raycaster.intersectObjects(_modelsStream2.default.value);

			if (intersects.length > 0) {
				this.controls.enabled = false;

				this.selected = intersects[0].object;

				intersects = this.raycaster.intersectObject(this.plane);

				if (intersects.length > 0) {
					this.offset.copy(intersects[0].point).sub(this.plane.position);
				}

				this.domNode.style.cursor = 'move';
			}
		}
	}, {
		key: 'handleMouseUp',
		value: function handleMouseUp(event) {
			event.preventDefault();

			this.controls.enabled = true;

			if (this.intersected) {
				this.plane.position.copy(this.intersected.position);

				this.selected = null;
			}

			this.domNode.style.cursor = 'auto';
		}
	}, {
		key: 'getDomNodeSize',
		value: function getDomNodeSize() {
			return this.domNode.getBoundingClientRect();
		}
	}]);
	return Canvas;
}(_ash2.default.Component);

exports.default = Canvas;