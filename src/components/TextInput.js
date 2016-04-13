import ash from 'ash';

import styles from './TextInput.css';
import formStyles from './Form.css';


const ENTER_KEY_CODE = 13;

export default class TextInput extends ash.Component {
	state = {
		value: this.props.value || '',
		result: false,
		isValid: true
	};

	shouldUpdate(newProps) {
		return newProps.inputOnly !== this.props.inputOnly || newProps.autocomplete !== this.props.autocomplete || newProps.id !== this.props.id || newProps.name !== this.props.name || newProps.label !== this.props.label || newProps.hint !== this.props.hint || newProps.validationErrorMessages !== this.props.validationErrorMessages || newProps.change !== this.props.change || newProps.save !== this.props.save || newProps.validate !== this.props.validate;
	}

	render() {
		var textInputProps = {
			key: this.props.id || this.props.name || 'text-input',
			className: styles.default + (this.state.isValid && this.state.value.length ? ' isValid' : !this.state.isValid ? ' isInvalid' : ''),
			type: 'text',
			name: this.props.name || this.props.id || '',
			id: this.props.id || this.props.name || '',
			// value: this.state.value || '',
			events: {
				blur: this.onFocusout,
				input: this.onInput,
				keydown: this.onKeydown
			}
		};

		if (this.props.autocomplete === false) {
			textInputProps.autocomplete = 'off';
		}

		let textInput = <input {...textInputProps} />;

		return this.props.inputOnly === true ? textInput : <div class={formStyles.row}>
			<div class={formStyles.label}>
				<label for={this.props.id || ''}>{this.props.label + ''}</label>
				<span>{this.props.hint}</span>
			</div>
			<div class={formStyles.fields}>{textInput}</div>
			<div class={formStyles.errorMessage + (!this.state.isValid ? ' isVisible' : '')}>{this.props.validationErrorMessages || null}</div>
		</div>;
	}

	onInput(event) {
		this.state.value = event.target.value;
		this.validate();

		if (this.props.change) {
			this.props.change(this.state.result);
		}

		this.update();
	}

	onFocusout(event) {
		this.state.value = event.target.value;
		this.validate();

		if (this.props.save) {
			this.props.save(this.state.result);
		}

		this.update();
	}

	onKeydown(event) {
		if (event.keyCode === ENTER_KEY_CODE) {
			this.state.value = event.target.value;
			this.validate();

			if (this.props.save) {
				this.props.save(this.state.result);
			}

			this.update();
		}
	}

	validate() {
		this.state.result = this.props.validate ? this.props.validate(this.state.value) : this.state.value;

		if (this.state.result === false) {
			this.state.isValid = false;
		} else {
			this.state.isValid = true;
		}
	}
}
