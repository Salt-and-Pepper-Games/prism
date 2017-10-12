import * as playerActionCreators from '../actionCreators/playerActionCreators';
let store;
let touchStart;

export const setupInput = (s, root) => {
	store = s;
	// it seems silly to have to do this, but it works
	root.onclick = () => {
		root.focus();
	}
	setupKeyboardInput(window);
	setupSwipeInput(root);
}

function setupSwipeInput(root) {
	root.addEventListener('touchstart', e => {
		e.preventDefault();
		touchStart = e.changedTouches[0];
		
	});

	root.addEventListener('touchend', e => {
		e.preventDefault();
		let touchEnd = e.changedTouches[0];
		handleSwipe(touchStart, touchEnd);
	});
}

function setupKeyboardInput(root) {
	root.addEventListener('keydown', handleKey, false);
}

function handleSwipe(start, end) {
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

function handleKey(e) {
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
