import * as playerActionCreators from '../actionCreators/playerActionCreators';
let store;

export const setupKeyboardInput = s => {
	store = s;
	window.addEventListener('keydown', handleKey, false);
}

function handleKey(e) {
	let doDefault = false;
	const code = e.keyCode;
	switch (code) {
		case 37:
			// left
			store.dispatch(playerActionCreators.moveLeft());
			break;
		case 38:
			// up
			store.dispatch(playerActionCreators.moveUp());
			break;
		case 39:
			// right
			store.dispatch(playerActionCreators.moveRight());
			break;
		case 40:
			// down
			store.dispatch(playerActionCreators.moveDown());
			break;
		default:
			doDefault = true;
			break;
	}
	if (!doDefault) {
		e.preventDefault();
	}
}
