import * as uiActionNames from './uiActionNames';


export const setCurrentPack = currentPack => {
	return {
		type: uiActionNames.SET_CURRENT_PACK,
		currentPack
	};
};
export const closeCurrentPack = () => {
	return {
		type: uiActionNames.CLOSE_CURRENT_PACK
	};
};
export const openGameMode = () => {
	return {
		type: uiActionNames.OPEN_GAME_MODE,
	};
};
export const closeGameMode = () => {
	return {
		type: uiActionNames.CLOSE_GAME_MODE,
	};
};
export const setPackInfo = packInfo => {
	return {
		type: uiActionNames.SET_PACK_INFO,
		packInfo
	};
};
export const openHelp = () => {
	return {
		type: uiActionNames.OPEN_HELP
	};
};
export const closeHelp = () => {
	return {
		type: uiActionNames.CLOSE_HELP
	};
};
export const showLoader = () => {
	return {
		type: uiActionNames.SHOW_LOADING
	};
};
export const hideLoader = () => {
	return {
		type: uiActionNames.HIDE_LOADING
	};
};
export const toggleDashboard = () => {
	return {
		type: uiActionNames.TOGGLE_DASHBOARD
	};
};
