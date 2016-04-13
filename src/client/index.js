/* eslint-disable require-jsdoc */

import ash from 'ash';
import $ from 'jquery';
import Router from 'ash/Router';
import three from 'three';

import App from '../components/App';


const G_KEY_CODE = 71;

// global.ash = ash;
// global.$ = $;
// global.three = three;

$(global.document).on('keydown', (event) => {
	let tagName = event.target.tagName.toLowerCase();

	if (event.keyCode === G_KEY_CODE && event.target && tagName !== 'textarea' && tagName !== 'input') {
		$('body').toggleClass('hasGrid');
	}
});

// init router
let router = new Router();

router.start();


// init renderer
let viewStream = new ash.ViewStream(<App />);

ash.renderViewStream(viewStream, global.document.querySelector('.page'));
