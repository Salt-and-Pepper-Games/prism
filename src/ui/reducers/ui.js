import * as uiActionNames from '../../actionCreators/uiActionNames.js';

const initialState = {
	currentPack: null,
	cachedCurrentPack: null,
	inGame: false,
	isHelpOpen: false,
	packInfo: [],
	isLoading: false,
	dashboardOpen: false
};

const ui = (state = initialState, action) => {
	switch (action.type) {
		case uiActionNames.SET_CURRENT_PACK: 
			return Object.assign({}, state, {
				currentPack: action.currentPack,
				cachedCurrentPack: action.currentPack
			});
		case uiActionNames.CLOSE_CURRENT_PACK:
			return Object.assign({}, state, { currentPack: null });
		case uiActionNames.SET_PACK_INFO:
			return Object.assign({}, state, { packInfo: action.packInfo });
		case uiActionNames.OPEN_GAME_MODE:
			return Object.assign({}, state, { inGame: true });
		case uiActionNames.CLOSE_GAME_MODE:
			return Object.assign({}, state, { inGame: false });
		case uiActionNames.OPEN_HELP:
			return Object.assign({}, state, { isHelpOpen: true });
		case uiActionNames.CLOSE_HELP:
			return Object.assign({}, state, { isHelpOpen: false });
		case uiActionNames.SHOW_LOADING:
			return Object.assign({}, state, { isLoading: true });
		case uiActionNames.HIDE_LOADING:
			return Object.assign({}, state, { isLoading: false });
		case uiActionNames.TOGGLE_DASHBOARD:
			return Object.assign({}, state, { dashboardOpen: !state.dashboardOpen });
		default:
			return state;
	}
};

export default ui;
