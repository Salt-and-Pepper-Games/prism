import { connect } from 'react-redux';

import GameArea from '../components/GameArea.jsx';
import * as uiActionCreators from '../../actionCreators/uiActionCreators';
import * as soundActionCreators from '../../actionCreators/soundActionCreators';
import * as levelActionCreators from '../../actionCreators/levelActionCreators';
import * as asyncActionCreators from '../../actionCreators/asyncActionCreators';

const mapStateToProps = state => {
	return {
		inGame: state.ui.ui.inGame && state.game.board.loaded,
		isHelpOpen: state.ui.ui.isHelpOpen,
		soundOn: state.ui.sound.soundOn,
		currentPack: state.ui.ui.currentPack,
		moveCount: state.game.board.stats.moves,
		isLoading: state.ui.ui.isLoading,
		transitionPlaying: state.ui.sound.transitionPlaying,
		audioLoaded: state.ui.sound.audioLoaded
	};
};

const mapDispatchToProps = dispatch => {
	return {
		returnToMainScreen: () => {
			dispatch(uiActionCreators.closeGameMode());
			dispatch(levelActionCreators.closeLevelAction());
		},
		openHelp: () => dispatch(uiActionCreators.openHelp()),
		closeHelp: () => dispatch(uiActionCreators.closeHelp()),
		toggleSound: () => dispatch(soundActionCreators.toggleSound()),
		startTransition: () => dispatch(soundActionCreators.startTransitionPlaying()),
		stopTransition: () => dispatch(soundActionCreators.stopTransitionPlaying()),
		loadLevel: (levelNumber, packName) => dispatch(asyncActionCreators.loadLevelString(levelNumber, packName)),
		triggerAudioLoaded: () => dispatch(soundActionCreators.triggerAudioLoaded())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GameArea);
