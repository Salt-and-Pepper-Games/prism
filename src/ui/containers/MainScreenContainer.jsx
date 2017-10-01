import { connect } from 'react-redux';

import uiActionCreators from '../../actionCreators/uiActionCreators';
import MainScreen from '../components/MainScreen.jsx';

const mapStateToProps = state => {
	return {
		inGame: state.ui.inGame && state.game.board.loaded,
		soundOn: state.ui.soundOn,
		packOpen: !!state.ui.currentPack || state.ui.dashboardOpen
	};
};

const mapDispatchToProps = dispatch => {
	return {
		openDashboard: () => dispatch(uiActionCreators.toggleDashboard()),
		toggleVolume: () => dispatch(uiActionCreators.toggleSound())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
