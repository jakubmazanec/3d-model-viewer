import ash from 'ash';

import pageStream from '../streams/pageStream';
import styles from './App.css';
import Canvas from './Canvas';
import Sidebar from './Sidebar';


export default class App extends ash.Component {
	render() {
		return <div class={styles.root}>
			<Canvas />
			<Sidebar />
		</div>;
	}

	onMount() {
		pageStream.on(this.update);
	}
}
