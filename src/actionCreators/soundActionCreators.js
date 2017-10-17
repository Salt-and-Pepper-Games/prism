import * as soundActionNames from './soundActionNames';

export const toggleSound = () => {
	return {
		type: soundActionNames.TOGGLE_SOUND
	};
};
export const startTransitionPlaying = () => {
	return {
		type: soundActionNames.START_TRANSITION_PLAYING
	};
};
export const stopTransitionPlaying = () => {
	return {
		type: soundActionNames.STOP_TRANSITION_PLAYING
	};
};
export const triggerAudioLoaded = () => {
	return {
		type: soundActionNames.AUDIO_LOADED
	};
};