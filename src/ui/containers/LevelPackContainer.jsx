import * as uiActionCreators from '../../actionCreators/uiActionCreators';
import * as soundActionCreators from '../../actionCreators/soundActionCreators';
import { connect } from 'react-redux';
import LevelPack from '../components/LevelPack';

const mapStateToProps = state => {
	return {
		isOpen: !!state.ui.ui.currentPack,
		currentPack: state.ui.ui.currentPack,
		cachedCurrentPack: state.ui.ui.cachedCurrentPack,
		userLevelData: state.game.user.levelData
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onClose: () => dispatch(uiActionCreators.closeCurrentPack()),
		startTransition: () => dispatch(soundActionCreators.startTransitionPlaying()),
		stopTransition: () => dispatch(soundActionCreators.stopTransitionPlaying())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelPack);
