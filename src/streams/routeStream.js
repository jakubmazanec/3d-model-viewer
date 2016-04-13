import Router from 'ash/Router';


let router = new Router();
let routeStream = router.add('(:page)(/)').map((value) => {
	let {page} = value;

	return {page};
});

export default routeStream;
