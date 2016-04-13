import ash from 'ash';
import three from 'three';

import styles from './Sidebar.css';
import modelsStream from '../streams/modelsStream';
import Button from './Button';
import TextInput from './TextInput';


const NUMBER_FORMAT = new Intl.NumberFormat('cs-CZ', {minimumFractionDigits: 2, maximumFractionDigits: 2});

export default class Sidebar extends ash.Component {
	render() {
		let models = modelsStream.get();
		let modelElements = null;

		if (models.length) {
			let model = models[0];

			modelElements = [];

			modelElements.push(
				<h1 class={ash.styles.sectionLevel4Heading}>X position</h1>,
				<p class={styles.value}>
					<span class={styles.number}>{`${NUMBER_FORMAT.format(model.position.x)}`}</span>
					<Button label="+" isEnabled={true} onClick={this.handleIncreaseXPositionButtonClick}/>
					<Button label="-" isEnabled={true} onClick={this.handleDecreaseXPositionButtonClick}/>
				</p>,

				<h1 class={ash.styles.sectionLevel4Heading}>Y position</h1>,
				<p class={styles.value}>
					<span class={styles.number}>{`${NUMBER_FORMAT.format(model.position.y)}`}</span>
					<Button label="+" isEnabled={true} onClick={this.handleIncreaseYPositionButtonClick}/>
					<Button label="-" isEnabled={true} onClick={this.handleDecreaseYPositionButtonClick}/>
				</p>,

				<h1 class={ash.styles.sectionLevel4Heading}>Z position</h1>,
				<p class={styles.value}>
					<span class={styles.number}>{`${NUMBER_FORMAT.format(model.position.z)}`}</span>
					<Button label="+" isEnabled={true} onClick={this.handleIncreaseZPositionButtonClick}/>
					<Button label="-" isEnabled={true} onClick={this.handleDecreaseZPositionButtonClick}/>
				</p>
			);

			modelElements.push(
				<h1 class={ash.styles.sectionLevel4Heading}>X rotation</h1>,
				<p class={styles.value}>
					<span class={styles.number}>{`${NUMBER_FORMAT.format(model.rotation.x)}`}</span>
					<Button label="+" isEnabled={true} onClick={this.handleIncreaseXRotationButtonClick}/>
					<Button label="-" isEnabled={true} onClick={this.handleDecreaseXRotationButtonClick}/>
				</p>,

				<h1 class={ash.styles.sectionLevel4Heading}>Y rotation</h1>,
				<p class={styles.value}>
					<span class={styles.number}>{`${NUMBER_FORMAT.format(model.rotation.y)}`}</span>
					<Button label="+" isEnabled={true} onClick={this.handleIncreaseYRotationButtonClick}/>
					<Button label="-" isEnabled={true} onClick={this.handleDecreaseYRotationButtonClick}/>
				</p>,
				
				<h1 class={ash.styles.sectionLevel4Heading}>Z rotation</h1>,
				<p class={styles.value}>
					<span class={styles.number}>{`${NUMBER_FORMAT.format(model.rotation.z)}`}</span>
					<Button label="+" isEnabled={true} onClick={this.handleIncreaseZRotationButtonClick}/>
					<Button label="-" isEnabled={true} onClick={this.handleDecreaseZRotationButtonClick}/>
				</p>
			);

			modelElements.push(
				<h1 class={ash.styles.sectionLevel4Heading}>Color</h1>,
				<p>
					<TextInput inputOnly={true} id="color" change={this.handleChangeColorInput} />
				</p>
			);
		}

		return <div class={styles.root}>
			<div>{modelElements}</div>
		</div>;
	}

	onMount() {
		requestAnimationFrame(this.handleAnimationFrame);
	}

	handleAnimationFrame() {
		requestAnimationFrame(this.handleAnimationFrame);

		this.update();
	}

	handleIncreaseXPositionButtonClick() {
		this.addToPosition(10, 0, 0);
	}

	handleDecreaseXPositionButtonClick() {
		this.addToPosition(-10, 0, 0);
	}

	handleIncreaseYPositionButtonClick() {
		this.addToPosition(0, 10, 0);
	}

	handleDecreaseYPositionButtonClick() {
		this.addToPosition(0, -10, 0);
	}

	handleIncreaseZPositionButtonClick() {
		this.addToPosition(0, 0, 10);
	}

	handleDecreaseZPositionButtonClick() {
		this.addToPosition(0, 0, -10);
	}

	handleIncreaseXRotationButtonClick() {
		this.addToRotation(5, 0, 0);
	}

	handleDecreaseXRotationButtonClick() {
		this.addToRotation(-5, 0, 0);
	}

	handleIncreaseYRotationButtonClick() {
		this.addToRotation(0, 5, 0);
	}

	handleDecreaseYRotationButtonClick() {
		this.addToRotation(0, -5, 0);
	}

	handleIncreaseZRotationButtonClick() {
		this.addToRotation(0, 0, 5);
	}

	handleDecreaseZRotationButtonClick() {
		this.addToRotation(0, 0, -5);
	}

	handleChangeColorInput(value) {
		let models = modelsStream.get();

		if (models.length) {
			let model = models[0];
			let color = parseInt(value, 16);

			if (value.length === 6 && typeof color === 'number' && color > -Infinity && color < Infinity) {
				let material = new three.MeshPhongMaterial({
					color,
					specular: 0x00000,
					shininess: 10,
					shading: three.SmoothShading
				});

				model.material = material;
			}
		}
	}

	addToPosition(x, y, z) {
		let models = modelsStream.get();

		if (models.length) {
			let model = models[0];

			model.position.x += x;
			model.position.y += y;
			model.position.z += z;
		}
	}

	addToRotation(x, y, z) {
		let models = modelsStream.get();

		if (models.length) {
			let model = models[0];

			model.rotation.x += x * (Math.PI / 180);
			model.rotation.y += y * (Math.PI / 180);
			model.rotation.z += z * (Math.PI / 180);
		}
	}
}
