const { connect } = require('react-redux');
const uiActionCreators = require('../../actionCreators/uiActionCreators');
const LevelArea = require('../components/LevelArea.jsx');

const mapStateToProps = state => {
	return {
		packInfo: state.ui.packInfo
	};
};
const mapDispatchToProps = dispatch => {
	return {
		setPackInfo: packInfo => dispatch(uiActionCreators.setPackInfo(packInfo)),
		setCurrentPack: currentPack => dispatch(uiActionCreators.setCurrentPack(currentPack))
	};
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(LevelArea);
