const uiActionNames = require('./uiActionNames');

module.exports = {
	setCurrentPack: currentPack => {
		return {
			type: uiActionNames.SET_CURRENT_PACK,
			currentPack
		};
	},
	closeCurrentPack: () => {
		return {
			type: uiActionNames.CLOSE_CURRENT_PACK
		};
	},
	setCurrentLevel: currentLevel => {
		return {
			type: uiActionNames.SET_CURRENT_LEVEL,
			currentLevel
		};
	},
	setPackInfo: packInfo => {
		return {
			type: uiActionNames.SET_PACK_INFO,
			packInfo
		};
	}
};
