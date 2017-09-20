import * as types from './userActionNames';
export const setUserAction = user => ({
	type: types.SET_USER,
	user
});

export const setLevelCompletionData = data => ({
	type: types.SET_LEVEL_COMPLETION_DATA,
	data
});
export const updateLevelCompletionData = (packName, levelNumber, data) => ({
	type: types.UPDATE_LEVEL_COMPLETION_DATA,
	packName,
	levelNumber,
	data
});
