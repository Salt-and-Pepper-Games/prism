import * as playerActionCreators from '../actionCreators/playerActionCreators';
import * as levelActionCreators from '../actionCreators/levelActionCreators';
import * as uiActionCreators from '../actionCreators/uiActionCreators';
import * as soundActionCreators from '../actionCreators/soundActionCreators';
import * as levelActionNames from '../actionCreators/levelActionNames';
import * as uiActionNames from '../actionCreators/uiActionNames';
import { push } from 'react-router-redux';
import { addStateListener } from '../game/game';
import GameAudio from './AudioManager';

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
			case 27:
				// return to main screen
				GameAudio.stop();
				store.dispatch(soundActionCreators.startTransitionPlaying());
				const id = GameAudio.play('exit_game');
				GameAudio.volume(store.getState().ui.sound.soundOn ? .5 : 0.0, id);
				GameAudio.on('end', () => {
					store.dispatch(soundActionCreators.stopTransitionPlaying());
				}, id);
				store.dispatch(uiActionCreators.closeGameMode());
				store.dispatch(levelActionCreators.closeLevelAction());
				store.dispatch(push("/"));
				break;
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
			case 72:
				// help
				if (store.getState().ui.ui.isHelpOpen) {
					store.dispatch(uiActionCreators.closeHelp());
				} else {
					store.dispatch(uiActionCreators.openHelp());
				}
				break;
			case 82:
				// reset
				const id2 = GameAudio.play('reset_level');
				GameAudio.volume(store.getState().ui.sound.soundOn ? .5 : 0.0, id2);
				store.dispatch(levelActionCreators.restartLevelAction());
				break;
			case 85:
				// undo
				store.dispatch(playerActionCreators.undo());
				break;
			case 86:
				// volume
				store.dispatch(soundActionCreators.toggleSound());
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
