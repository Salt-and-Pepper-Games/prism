import * as userActions from '../../actionCreators/userActionNames';
const defaultState = {
	authenticated: false,
	id: null
};

export default (state=defaultState, action) => {
	switch (action.type) {
		case userActions.SET_USER:
			return Object.assign({}, state, {
				authenticated: true,
				id: action.user.uid
			});
		default:
			return state;
	}
}
