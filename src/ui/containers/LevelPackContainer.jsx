import uiActionCreators from '../../actionCreators/uiActionCreators';
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
		onClose: () => dispatch(uiActionCreators.closeCurrentPack())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelPack);
