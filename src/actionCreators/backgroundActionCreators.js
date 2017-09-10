import types from './backgroundActionNames';

export const setBackgroundColor = color => ({
	type: types.SET_COLOR,
	color
});
