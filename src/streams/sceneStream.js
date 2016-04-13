import ash from 'ash';
import three from 'three';

import modelsStream from './modelsStream';


let sceneStream = new ash.Stream(new three.Scene());

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
}, modelsStream);

export default sceneStream;
