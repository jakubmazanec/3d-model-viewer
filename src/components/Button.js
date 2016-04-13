import ash from 'ash';
import Router from 'ash/Router';

import styles from './Button.css';


const MAILTO_REGEX = /^mailto:/;
const ROUTE_LINK_REGEX = /^\//;

let router = new Router();

export default class Button extends ash.Component {
	state = {
		label: this.props.label || '+'
	};

	render() {
		let buttonClass = styles.default;

		if (this.props.type === 'flat') {
			buttonClass = styles.flat;
		} else if (this.props.type === 'invisible') {
			buttonClass = styles.invisible;
		}

		buttonClass += this.props.isLarge ? ' isLarge' : '';

		return <a href={this.props.link ? this.props.link : '#'} class={buttonClass + (this.props.isEnabled ? ' isEnabled' : ' isDisabled')} events={{
			click: this.handleClick
		}}>{this.props.label || ''}</a>;
	}

	handleClick(event) {
		if (!(this.props.link || MAILTO_REGEX.test(this.props.link))) {
			event.preventDefault();

			if (this.props.onClick) {
				this.props.onClick();
			}
		} else if (ROUTE_LINK_REGEX.test(this.props.link)) {
			event.preventDefault();

			router.navigate(this.props.link);
		}
	}
}
