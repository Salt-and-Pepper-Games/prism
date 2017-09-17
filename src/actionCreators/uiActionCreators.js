import uiActionNames from './uiActionNames';

export default {
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
	openGameMode: () => {
		return {
			type: uiActionNames.OPEN_GAME_MODE,
		};
	},
	closeGameMode: () => {
		return {
			type: uiActionNames.CLOSE_GAME_MODE,
		};
	},
	setPackInfo: packInfo => {
		return {
			type: uiActionNames.SET_PACK_INFO,
			packInfo
		};
	},
	openHelp: () => {
		return {
			type: uiActionNames.OPEN_HELP
		};
	},
	closeHelp: () => {
		return {
			type: uiActionNames.CLOSE_HELP
		};
	}
};
