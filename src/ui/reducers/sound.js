import * as soundActionNames from '../../actionCreators/soundActionNames';

const initialState = {
	soundOn: true,
	transitionPlaying: false,
	audioLoaded: false
};

const sound = (state = initialState, action) => {
	switch (action.type) {
		case soundActionNames.TOGGLE_SOUND:
			return Object.assign({}, state, { soundOn: !state.soundOn });
		case soundActionNames.START_TRANSITION_PLAYING:
			return Object.assign({}, state, { transitionPlaying: true });
		case soundActionNames.STOP_TRANSITION_PLAYING:
			return Object.assign({}, state, { transitionPlaying: false });
		case soundActionNames.AUDIO_LOADED:
			return Object.assign({}, state, { audioLoaded: true });
		default:
			return state;
	}
};

export default sound;
