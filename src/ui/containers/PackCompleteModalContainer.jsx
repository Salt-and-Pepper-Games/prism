import { connect } from 'react-redux';
import PackCompleteModal from '../components/PackCompleteModal.jsx';
import * as uiActionCreators from '../../actionCreators/uiActionCreators';
import * as levelActionCreators from '../../actionCreators/levelActionCreators';
import * as soundActionCreators from '../../actionCreators/soundActionCreators';

const mapStateToProps = state => {
	return {
		isOpen: state.ui.ui.packComplete,
		currentPack: state.ui.ui.currentPack,
		soundOn: state.ui.sound.soundOn,
		userLevelData: state.game.user.levelData
	};
};

const mapDispatchToProps = dispatch => {
	return {
		returnToMainScreen: history => {
			dispatch(uiActionCreators.togglePackComplete());
			dispatch(uiActionCreators.closeGameMode());
			dispatch(levelActionCreators.closeLevelAction());
			history.push('/');
		},
		restartPack: (history, packName) => {
			dispatch(uiActionCreators.togglePackComplete());
			history.push(`/game/${packName}/1`);
		},
		restartLevel: () => {
			dispatch(uiActionCreators.togglePackComplete());
			dispatch(levelActionCreators.restartLevelAction());
		},
		startTransition: () => dispatch(soundActionCreators.startTransitionPlaying()),
		stopTransition: () => dispatch(soundActionCreators.stopTransitionPlaying())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PackCompleteModal);
