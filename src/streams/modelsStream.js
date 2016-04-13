import ash from 'ash';
import three from 'three';

import modelLoaderStream from './modelLoaderStream';
import STLLoader from '../loaders/STLLoader';

let loader = new STLLoader();
let modelStream = new ash.Stream([]);

modelStream.combine((dependency, self) => {
	let modelName = dependency.get();
	let models = self.get();

	loader.load(`./assets/${modelName}`, (geometry) => {
		let material;

		if (geometry.hasColors) {
			material = new three.MeshPhongMaterial({opacity: geometry.alpha, vertexColors: three.VertexColors});
		} else {
			material = new three.MeshPhongMaterial({color: 0xAAAAAA, specular: 0x111111, shininess: 200});
		}

		let mesh = new three.Mesh(geometry, material);

		mesh.geometry.computeBoundingBox();

		let delta = mesh.geometry.boundingBox.max.clone().sub(mesh.geometry.boundingBox.min);

		mesh.position.set(delta.x * -0.5, delta.y * -0.5, delta.z * -0.5);
		mesh.rotation.set(0, 0, 0);
		mesh.scale.set(1, 1, 1);

		mesh.castShadow = false;
		mesh.receiveShadow = true;
		mesh.__id = modelName;
		mesh.__boundingBox = new three.BoxHelper(mesh);
		mesh.__boundingBox.visible = false;

		models.push(mesh);
		self.push(models);
	});
}, modelLoaderStream);

export default modelStream;
