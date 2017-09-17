import uiActionCreators from '../../actionCreators/uiActionCreators';
import { loadLevelString } from '../../actionCreators/asyncActionCreators';
import { connect } from 'react-redux';
import LevelPack from '../components/LevelPack';

const mapStateToProps = state => {
	return {
		isOpen: !!state.ui.currentPack,
		currentPack: state.ui.currentPack,
		cachedCurrentPack: state.ui.cachedCurrentPack
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setCurrentLevel: level => dispatch(uiActionCreators.setCurrentLevel(level)),
		onClose: () => dispatch(uiActionCreators.closeCurrentPack()),
		onLevelClick: (levelNum, packInfo) => dispatch(loadLevelString(levelNum, packInfo))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelPack);
