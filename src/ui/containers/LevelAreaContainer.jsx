import { connect } from 'react-redux';
import uiActionCreators from '../../actionCreators/uiActionCreators';
import * as asyncActionCreators from '../../actionCreators/asyncActionCreators';
import LevelArea from '../components/LevelArea.jsx';

const mapStateToProps = state => {
	return {
		packInfo: state.ui.packInfo
	};
};
const mapDispatchToProps = dispatch => {
	return {
		setPackInfo: () => dispatch(asyncActionCreators.getPackInfo()),
		setCurrentPack: currentPack => dispatch(uiActionCreators.setCurrentPack(currentPack))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelArea);
