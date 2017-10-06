import { connect } from 'react-redux';
import * as uiActionCreators from '../../actionCreators/uiActionCreators';
import * as asyncActionCreators from '../../actionCreators/asyncActionCreators';
import LevelArea from '../components/LevelArea.jsx';

const mapStateToProps = state => {
	return {
		packInfo: state.ui.ui.packInfo,
		userLevelData: state.game.user.levelData,
		isLoading: state.ui.ui.isLoading
	};
};
const mapDispatchToProps = dispatch => {
	return {
		setPackInfo: () => dispatch(asyncActionCreators.getPackInfo()),
		setCurrentPack: currentPack => dispatch(uiActionCreators.setCurrentPack(currentPack))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelArea);
