import { connect } from 'react-redux';
import uiActionCreators from '../../actionCreators/uiActionCreators';
import LevelArea from '../components/LevelArea.jsx';

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

export default connect(mapStateToProps, mapDispatchToProps)(LevelArea);
