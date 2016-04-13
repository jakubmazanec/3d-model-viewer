import ash from 'ash';
import three from 'three';

import styles from './Canvas.css';
import cameraStream from '../streams/cameraStream';
import sceneStream from '../streams/sceneStream';
import modelLoaderStream from '../streams/modelLoaderStream';
import modelsStream from '../streams/modelsStream';
import TrackballControls from '../controls/TrackballControls';


export default class Canvas extends ash.Component {
	renderer = null;
	mouse = new three.Vector2();
	controls = null;
	raycaster = new three.Raycaster();

	plane = null;
	offset = new three.Vector3();
	intersected = null;
	selected = null;

	render() {
		return <div class={styles.root}></div>;
	}

	onMount() {
		if (ash.support.platform === 'server') {
			return;
		}

		let domNode = this.domNode;
		let {width: domNodeWidth, height: domNodeHeight} = this.getDomNodeSize();

		this.renderer = new three.WebGLRenderer({antialias: true});

		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(domNodeWidth, domNodeHeight);
		this.renderer.setClearColor(parseInt(ash.config.colors.neutral.tint[7].slice(1), 16));

		this.renderer.gammaInput = true;
		this.renderer.gammaOutput = true;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.cullFace = three.CullFaceBack;

		domNode.appendChild(this.renderer.domElement);

		// create camera
		let camera = new three.PerspectiveCamera(45, domNodeWidth / domNodeHeight, 1, 10000);

		camera.position.set(0, 0, 1000);
		camera.lookAt(new three.Vector3(0, 0, 0));
		cameraStream.push(camera);

		// create controls
		this.controls = new TrackballControls(camera, domNode);
		this.controls.rotateSpeed = 8;
		this.controls.zoomSpeed = 7;
		this.controls.panSpeed = 2;
		this.controls.noZoom = false;
		this.controls.noPan = false;
		this.controls.staticMoving = true;
		this.controls.dynamicDampingFactor = 0.1;

		// create lights
		sceneStream.value.add(new three.HemisphereLight(0xffffff, 0x000000));

		// create axis
		let axisHelper = new three.AxisHelper(100);

		axisHelper.position.set(-500, -500 * (domNodeHeight / domNodeWidth), 0);
		sceneStream.value.add(axisHelper);

		// helper plane
		this.plane = new three.Mesh(new three.PlaneBufferGeometry(2000, 2000, 8, 8), new three.MeshBasicMaterial({visible: false}));
	
		sceneStream.value.add(this.plane);

		// load model
		modelLoaderStream.push('skull.stl');

		// atach events
		window.addEventListener('resize', this.handleWindowResize, false);
		this.renderer.domElement.addEventListener('mousemove', this.handleMouseMove, false);
		this.renderer.domElement.addEventListener('mousedown', this.handleMouseDown, false);
		this.renderer.domElement.addEventListener('mouseup', this.handleMouseUp, false);

		// start rendering
		requestAnimationFrame(this.handleAnimationFrame);
	}

	handleAnimationFrame() {
		requestAnimationFrame(this.handleAnimationFrame);

		let models = modelsStream.value;

		for (let i = 0; i < models.length; i++) {
			if (models[i].__boundingBox) {
				models[i].__boundingBox.update(models[i]);
			}
		}

		this.controls.update();
		this.renderer.render(sceneStream.value, cameraStream.value);
	}

	handleWindowResize() {
		let {width: domNodeWidth, height: domNodeHeight} = this.getDomNodeSize();

		cameraStream.value.aspect = domNodeWidth / domNodeHeight;

		cameraStream.value.updateProjectionMatrix();
		this.renderer.setSize(domNodeWidth, domNodeHeight);
	}

	handleMouseMove(event) {
		event.preventDefault();

		this.mouse.x = (event.pageX - this.renderer.domElement.offsetLeft) / this.renderer.domElement.offsetWidth * 2 - 1;
		this.mouse.y = -((event.pageY - this.renderer.domElement.offsetTop) / this.renderer.domElement.offsetHeight) * 2 + 1;

		this.raycaster.setFromCamera(this.mouse, cameraStream.value);

		if (this.selected) {
			let intersects = this.raycaster.intersectObject(this.plane);

			if (intersects.length > 0) {
				this.selected.position.copy(intersects[0].point.sub(this.offset));
			}

			return;
		}

		let intersects = this.raycaster.intersectObjects(modelsStream.value);

		if (intersects.length > 0) {
			if (this.intersected !== intersects[0].object) {
				if (this.intersected) {
					this.intersected.__boundingBox.visible = false;
				}

				this.intersected = intersects[0].object;
				this.intersected.__boundingBox.visible = true;

				this.plane.position.copy(this.intersected.position);
				this.plane.lookAt(cameraStream.value.position);
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

	handleMouseDown(event) {
		event.preventDefault();

		this.raycaster.setFromCamera(this.mouse, cameraStream.value);

		let intersects = this.raycaster.intersectObjects(modelsStream.value);

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

	handleMouseUp(event) {
		event.preventDefault();

		this.controls.enabled = true;

		if (this.intersected) {
			this.plane.position.copy(this.intersected.position);

			this.selected = null;
		}

		this.domNode.style.cursor = 'auto';
	}

	getDomNodeSize() {
		return this.domNode.getBoundingClientRect();
	}
}
