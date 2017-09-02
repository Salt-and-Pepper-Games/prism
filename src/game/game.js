const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const animationListeners = {};
let lastAnimationListenerId = 0;

export const initGame = (store) => {
	store.subscribe(onStateChange.bind(null, store));
	onStateChange(store);
	animationLoop();
}

const onStateChange = (store) => {
	const state = store.getState();
	// maybe add listeners for this too
}

const animationLoop = () => {
	Object.keys(animationListeners).forEach(id => {
		animationListeners[id](ctx);
	})
}

export const addAnimationListener = (listener) => {
	const id = lastAnimationListenerId;
	animationListeners[id] = listener;
	return deleteAnimationListener.bind(null, id);
}

export const deleteAnimationListener = (id) => {
	delete animationListeners[id];
}
