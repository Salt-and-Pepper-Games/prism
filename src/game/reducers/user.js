import * as userActions from '../../actionCreators/userActionNames';
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
		default:
			return state;
	}
}
