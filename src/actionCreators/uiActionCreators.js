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
	},
	toggleSound: () => {
		return {
			type: uiActionNames.TOGGLE_SOUND
		};
	},
	showLoader: () => {
		return {
			type: uiActionNames.SHOW_LOADING
		};
	},
	hideLoader: () => {
		return {
			type: uiActionNames.HIDE_LOADING
		};
	},
	toggleDashboard: () => {
		return {
			type: uiActionNames.TOGGLE_DASHBOARD
		};
	}
};
