import { loadLevel } from './actions/levelActions';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const animationListeners = {};
let nextAnimationListenerId = 0;

const stateListeners = {};
let nextStateListenerId = 0;

let startTime = null;

/**
 * Initialize the game and start listening to the redux store
 * @function
 * @param {Object} store - the redux store
 * @return {None}
 */
export const initGame = (store) => {
	store.subscribe(onStateChange.bind(null, store));
	onStateChange(store);
	window.requestAnimationFrame(animationLoop);
	store.dispatch(loadLevel("pack1", "0"));
}

const onStateChange = (store) => {
	const state = store.getState();
	// i'm guessing we won't end up using listeners
	// instead, we should have this be the central place which handles state changes, and passes the relevant info to the board
	// i'll leave it just in case tho
	Object.keys(stateListeners).forEach(id => {
		stateListeners[id](state);
	});
}

const animationLoop = (time) => {
	if (startTime === null) {
		startTime = time;
	}
	const elapsedTime = time - startTime;
	Object.keys(animationListeners).forEach(id => {
		animationListeners[id](ctx, elapsedTime);
	})
	window.requestAnimationFrame(animationLoop);
}

/**
 * Remove a animation frame listener by id
 * @function
 * @param {Object} id - the id of the listener to remove
 * @return {None}
 */
export const deleteAnimationListener = (id) => {
	delete animationListeners[id];
}

/**
 * Add a listener to get called each animation frame
 * @function
 * @param {Function} listener - The listener callback function
 * @return {Function} the callback function to remove the added listener
 */
export const addAnimationListener = (listener) => {
	const id = nextAnimationListenerId++;
	animationListeners[id] = listener;
	return deleteAnimationListener.bind(null, id);
}

/**
 * Remove a state listener by id
 * @function
 * @param {Object} id - the id of the listener to remove
 * @return {None}
 */
export const deleteStateListener = (id) => {
	delete stateListeners[id];
}

/**
 * Add a listener function to get called on state changes
 * @function
 * @param {Function} listener - The listener callback function
 * @return {Function} the callback function to remove the added listener
 */
export const addStateListener = (listener) => {
	const id = nextStateListenerId++;
	stateListeners[id] = listener;
	return deleteStateListener.bind(null, id);
}




