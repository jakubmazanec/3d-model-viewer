'use strict';

var _ash = require('ash');

var _ash2 = _interopRequireDefault(_ash);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Router = require('ash/Router');

var _Router2 = _interopRequireDefault(_Router);

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _App = require('../components/App');

var _App2 = _interopRequireDefault(_App);

var _STLLoader = require('../loaders/STLLoader');

var _STLLoader2 = _interopRequireDefault(_STLLoader);

var _TrackballControls = require('../controls/TrackballControls');

var _TrackballControls2 = _interopRequireDefault(_TrackballControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var G_KEY_CODE = 71; /* eslint-disable require-jsdoc */

global.ash = _ash2.default;
global.$ = _jquery2.default;
global.three = _three2.default;

(0, _jquery2.default)(global.document).on('keydown', function (event) {
	var tagName = event.target.tagName.toLowerCase();

	if (event.keyCode === G_KEY_CODE && event.target && tagName !== 'textarea' && tagName !== 'input') {
		(0, _jquery2.default)('body').toggleClass('hasGrid');
	}
});

// init router
var router = new _Router2.default();

router.start();

// init renderer
var viewStream = new _ash2.default.ViewStream(_ash2.default.createElement(_App2.default, null));

_ash2.default.renderViewStream(viewStream, global.document.querySelector('.page'));

// if (! Detector.webgl) Detector.addGetWebGLMessage();
/*
let container, container2;
let camera, camera2;
let cameraTarget;
let scene, scene2;
let renderer, renderer2;
let controls;
let objects = [];
let plane;
let raycaster = new three.Raycaster();
let mouse = new three.Vector2();
let	offset = new three.Vector3();
let	INTERSECTED;
let SELECTED;
let axes;
let axes2;

const CANVAS_WIDTH = 200;
const CANVAS_HEIGHT = 200;
const CAM_DISTANCE = 300;

init();
animate();

function init() {
	container = document.createElement('div');
	document.body.appendChild(container);

	camera = new three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(3, 0.15, 3);
	camera.position.z = 1000;

	cameraTarget = new three.Vector3(0, -0.25, 0);

	camera.lookAt(cameraTarget);

	controls = new TrackballControls(camera);
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;

	scene = new three.Scene();
	// scene.fog = new three.Fog(0x72645b, 2, 15);


	// Ground

	// plane = new three.Mesh(
	// 	new three.PlaneBufferGeometry(40, 40),
	// 	new three.MeshPhongMaterial({color: 0xff00cc, specular: 0x101010})
	// );

	// // plane.rotation.x = -Math.PI / 2;
	// // plane.position.y = -0.5;
	// scene.add(plane);

	// plane.receiveShadow = true;

	// Plane, that helps to determinate an intersection position
	plane = new three.Mesh(new three.PlaneBufferGeometry(2000, 2000, 8, 8), new three.MeshBasicMaterial({color: 0xff00cc}));
	plane.visible = false;
	scene.add(plane);


	let loader = new STLLoader();


	// Binary files

	let material = new three.MeshPhongMaterial({color: 0xAAAAAA, specular: 0x111111, shininess: 200});



	// Colored binary STL
	loader.load('./assets/skull.stl', (geometry) => {
		let meshMaterial = material;

		console.log('geometry.hasColors', geometry.hasColors);

		if (geometry.hasColors) {
			meshMaterial = new three.MeshPhongMaterial({opacity: geometry.alpha, vertexColors: three.VertexColors});
		}

		let mesh = new three.Mesh(geometry, meshMaterial);

		mesh.position.set(0, 0, 500);
		mesh.rotation.set(0, 0, 0);
		mesh.scale.set(1, 1, 1);

		mesh.castShadow = false;
		mesh.receiveShadow = true;

		mesh.__id = 'skull';

		scene.add(mesh);

		objects.push(mesh);

		let box = new three.BoxHelper(mesh);

		box.visible = false;

		mesh.__box = box;

		scene.add(box);
	});


	// Lights
	scene.add(new three.HemisphereLight(0xffffff, 0x000000));

	// addShadowedLight(1, 1, 1, 0xffffff, 1.35);
	// addShadowedLight(0.5, 1, -1, 0xffaa00, 1);
	// renderer

	renderer = new three.WebGLRenderer({antialias: true});
	// renderer.setClearColor(scene.fog.color);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.cullFace = three.CullFaceBack;
	renderer.setClearColor(0xffffff);
	// renderer.setPixelRatio(window.devicePixelRatio);
	// renderer.setSize(window.innerWidth, window.innerHeight);
	// renderer.sortObjects = false;

	container.appendChild(renderer.domElement);

	renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
	renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
	renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);

	window.addEventListener('resize', onWindowResize, false);


	// axes
	axes = new three.AxisHelper(100);
	scene.add(axes);

	// inset canvas
	// -----------------------------------------------

	// dom
	container2 = document.createElement('div');
	container2.setAttribute('id', 'inset');
	document.body.appendChild(container2);

	// renderer
	renderer2 = new three.WebGLRenderer({antialias: true});
	renderer2.setClearColor(0xf0f0f0, 1);
	renderer2.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
	container2.appendChild(renderer2.domElement);

	// scene
	scene2 = new three.Scene();

	// camera
	camera2 = new three.PerspectiveCamera(50, CANVAS_WIDTH / CANVAS_HEIGHT, 1, 1000);
	camera2.up = camera.up; // important!

	// axes
	axes2 = new three.AxisHelper(100);
	scene2.add(axes2);
}
function addShadowedLight(x, y, z, color, intensity) {
	let directionalLight = new three.DirectionalLight(color, intensity);

	directionalLight.position.set(x, y, z);
	scene.add(directionalLight);

	directionalLight.castShadow = true;
	// directionalLight.shadowCameraVisible = true;

	let d = 1;

	directionalLight.shadow.camera.left = -d;
	directionalLight.shadow.camera.right = d;
	directionalLight.shadow.camera.top = d;
	directionalLight.shadow.camera.bottom = -d;
	directionalLight.shadow.camera.near = 1;
	directionalLight.shadow.camera.far = 4;
	directionalLight.shadow.mapSize.width = 1024;
	directionalLight.shadow.mapSize.height = 1024;
	directionalLight.shadow.bias = -0.005;
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}



function onDocumentMouseMove(event) {
	event.preventDefault();

	// mouse.x = event.clientX / window.innerWidth * 2 - 1;
	// mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	mouse.x = (event.pageX - renderer.domElement.offsetLeft) / renderer.domElement.offsetWidth * 2 - 1;
	mouse.y = -((event.pageY - renderer.domElement.offsetTop) / renderer.domElement.offsetHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);

	// let vector = new three.Vector3(mouse.x, mouse.y, 1);

	// vector.unproject(camera);

	// // Set the raycaster position
	// raycaster.set(camera.position, vector.sub(camera.position).normalize());

	if (SELECTED) {
		let intersects = raycaster.intersectObject(plane);

		if (intersects.length > 0) {
			SELECTED.position.copy(intersects[0].point.sub(offset));
		}

		return;
	}

	let intersects = raycaster.intersectObjects(objects);

	if (intersects.length > 0) {
		if (INTERSECTED !== intersects[0].object) {
			if (INTERSECTED) {
			// 	console.log('visibility to true');
			// 	INTERSECTED.__box.visible = true;
			}

			INTERSECTED = intersects[0].object;
			INTERSECTED.__box.visible = true;

			plane.position.copy(INTERSECTED.position);
			plane.lookAt(camera.position);
		}

		container.style.cursor = 'pointer';
	} else {
		if (INTERSECTED) {
			// console.log('visiblity to false');
			INTERSECTED.__box.visible = false;
		}

		INTERSECTED = null;

		container.style.cursor = 'auto';
	}
}

function onDocumentMouseDown(event) {
	event.preventDefault();

	raycaster.setFromCamera(mouse, camera);

	let intersects = raycaster.intersectObjects(objects);

	if (intersects.length > 0) {
		controls.enabled = false;

		SELECTED = intersects[0].object;

		intersects = raycaster.intersectObject(plane);

		if (intersects.length > 0) {
			offset.copy(intersects[0].point).sub(plane.position);
		}

		container.style.cursor = 'move';
	}
}

function onDocumentMouseUp(event) {
	event.preventDefault();

	controls.enabled = true;

	if (INTERSECTED) {
		plane.position.copy(INTERSECTED.position);

		SELECTED = null;
	}

	container.style.cursor = 'auto';
}




function animate() {
	requestAnimationFrame(animate);

	controls.update();

	camera2.position.copy(camera.position);
	camera2.position.sub(controls.target); // added by @libe
	camera2.position.setLength(CAM_DISTANCE);

	camera2.lookAt(scene2.position);

	if (objects[0]) {
		objects[0].__box.update(objects[0]);
	}

	render();
}

function render() {
	renderer.render(scene, camera);
	renderer2.render(scene2, camera2);
}
*/