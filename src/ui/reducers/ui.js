const uiActionNames = require('../../actionCreators/uiActionNames.js');

const initialState = {
	currentPack: null,
	cachedCurrentPack: null,
	currentLevel: null,
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
		default:
			return state;
	}
};

module.exports = ui;
