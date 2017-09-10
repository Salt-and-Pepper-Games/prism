import types from './levelActionNames';

export const loadLevel = (pack, number) => {
	// in the future, we don't want this port number
	// but for development it's necessary
	// TODO: distinction between production and development servers
	return dispatch => fetch('levels/' + pack + '/' + number + '.txt')
		.then(res => res.text())
		.then(text => {
			dispatch(loadLevelAction(text));
			return text;
		});
}

const loadLevelAction = (data) => ({
	type: types.LOAD_LEVEL,
	data
});
