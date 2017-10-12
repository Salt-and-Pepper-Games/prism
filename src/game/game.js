import Konva from 'konva';
import BoardManager from './boardManager';
import { setupInput } from '../utils/userInput';

// const animationListeners = {};
// let nextAnimationListenerId = 0;

const stateListeners = {};
let nextStateListenerId = 0;

let boardManager;

let prevState;

const getStageSizeFromContainer = container => {
	let size = Math.min(container.innerWidth, container.innerHeight);
	const squareSize = Math.max(container.innerWidth, container.innerHeight) * .65;
	return Math.min(size, squareSize);
}


const fitStageToParent = stage => {
	// const size = Math.min(stage.container().offsetWidth, stage.container().offsetHeight);
	const size = getStageSizeFromContainer(window);
	const stageSize = Math.min(stage.width(), stage.height());
	const scale = size / stageSize;

	// stage.width(stage.width() * scale);
	// stage.height(stage.height() * scale);
	stage.width(size);
	stage.height(size);
	// stage.scale({ x: scale, y: scale });
	console.log(scale);
	stage.draw();
}

/**
 * Initialize the game and start listening to the redux store
 * @function
 * @param {Object} store - the redux store
 * @return {None}
 */
export const initGame = (store) => {
	prevState = store.getState();
	const size = getStageSizeFromContainer(window);

	// initialize konva stage
	const stage = new Konva.Stage({
		container: 'game-root',
		width: size,
		height: size
	});
	setupInput(store, stage.container());

	boardManager = new BoardManager(stage, store.dispatch);
	boardManager.startStateListener(store.dispatch);

	store.subscribe(onStateChange.bind(null, store));
	onStateChange(store);

	window.addEventListener('resize', fitStageToParent.bind(this, stage));
}

const onStateChange = (store) => {
	const state = store.getState();
	Object.keys(stateListeners).forEach(id => {
		stateListeners[id](state, prevState);
	});
	prevState = state;
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

