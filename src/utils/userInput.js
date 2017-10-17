import * as playerActionCreators from '../actionCreators/playerActionCreators';
import * as levelActionNames from '../actionCreators/levelActionNames';
import * as uiActionNames from '../actionCreators/uiActionNames';
import { addStateListener } from '../game/game';
let store;
let touchStart;
let enableInput = false;

let disableActions = {};
disableActions[levelActionNames.CLOSE_LEVEL] = true;
disableActions[levelActionNames.COMPLETE_LEVEL] = true;
disableActions[uiActionNames.OPEN_HELP] = true;

let enableActions = {};
enableActions[levelActionNames.LOAD_LEVEL] = true;
enableActions[uiActionNames.CLOSE_HELP] = true;

export const setupInput = (s, root) => {
	store = s;
	// it seems silly to have to do this, but it works
	root.onclick = () => {
		root.focus();
	}
	setupKeyboardInput(window);
	setupSwipeInput(root);

	addStateListener(onStateChange);
}

function onStateChange({ lastAction }) {
	if (lastAction.type in disableActions) {
		enableInput = false;
	}
	else if (lastAction.type in enableActions) {
		enableInput = true;
	}
}

function setupSwipeInput(root) {
	root.addEventListener('touchstart', e => {
		if (enableInput) {
			e.preventDefault();
			touchStart = e.changedTouches[0];
		}
	});

	root.addEventListener('touchend', e => {
		if (enableInput) {
			e.preventDefault();
			let touchEnd = e.changedTouches[0];
			handleSwipe(touchStart, touchEnd);
		}
	});
}

function setupKeyboardInput(root) {
	root.addEventListener('keydown', handleKey, false);
}

function handleSwipe(start, end) {
	if (enableInput) {
		let dx = parseInt(end.clientX, 10) - parseInt(start.clientX, 10); 
		let dy = parseInt(end.clientY, 10) - parseInt(start.clientY, 10); 
		let absDx = Math.abs(dx);
		let absDy = Math.abs(dy);
		if (absDx > 30 || absDy > 30) {
			if (Math.abs(dx) > Math.abs(dy)) {
				// horizontal swipe
				
				if (dx > 0) {
					// swipe right
					store.dispatch(playerActionCreators.moveRight());
				}
				else {
					// swipe left
					store.dispatch(playerActionCreators.moveLeft());
				}
			}
			else {
				// vertical swipe
				if (dy < 0) {
					// swipe up
					store.dispatch(playerActionCreators.moveUp());
				}
				else {
					// swipe down
					store.dispatch(playerActionCreators.moveDown());
				}
			}
		}
	}
}

function handleKey(e) {
	if (enableInput) {
		console.log("Got key input");
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
}
