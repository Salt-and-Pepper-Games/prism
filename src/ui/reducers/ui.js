import uiActionNames from '../../actionCreators/uiActionNames.js';

const initialState = {
	currentPack: null,
	cachedCurrentPack: null,
	currentLevel: null,
	inGame: false,
	isHelpOpen: false,
	packInfo: []
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
		case uiActionNames.SET_CURRENT_LEVEL:
			return Object.assign({}, state, { currentLevel: action.currentLevel });
		case uiActionNames.OPEN_GAME_MODE:
			return Object.assign({}, state, { inGame: true });
		case uiActionNames.CLOSE_GAME_MODE:
			return Object.assign({}, state, { inGame: false });
		case uiActionNames.OPEN_HELP:
			return Object.assign({}, state, { isHelpOpen: true });
		case uiActionNames.CLOSE_HELP:
			return Object.assign({}, state, { isHelpOpen: false });
		default:
			return state;
	}
};

export default ui;
