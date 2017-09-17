import * as types from './userActionNames';
export const setUserAction = user => ({
	type: types.SET_USER,
	user
});
