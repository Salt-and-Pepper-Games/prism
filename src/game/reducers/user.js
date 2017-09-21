import * as userActions from '../../actionCreators/userActionNames';
import clone from 'clone';
const defaultState = {
	authenticated: false,
	id: null,
	levelData: {}
};

export default (state=defaultState, action) => {
	switch (action.type) {
		case userActions.SET_USER:
			return Object.assign({}, state, {
				authenticated: true,
				id: action.user.uid
			});
		case userActions.SET_LEVEL_COMPLETION_DATA:
			return Object.assign({}, state, {
				levelData: action.data || {}
			});
		case userActions.UPDATE_LEVEL_COMPLETION_DATA:
			const newData = clone(state.levelData);
			if (newData[action.packName]) {
				newData[action.packName][action.levelNumber] = action.data;
			} else {
				newData[action.packName] = { [action.levelNumber] : action.data };
			}
			return Object.assign({}, state, {
				levelData: newData || {}
			});
		default:
			return state;
	}
}
