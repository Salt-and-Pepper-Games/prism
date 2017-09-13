const uiActionCreators = require('../../actionCreators/uiActionCreators');
const asyncActionCreators = require('../../actionCreators/asyncActionCreators');
const { connect } = require('react-redux');
const LevelPack = require('../components/LevelPack');

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
		onLevelClick: (levelNum, packInfo) => dispatch(asyncActionCreators.loadLevelString(levelNum, packInfo))
	};
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(LevelPack);
