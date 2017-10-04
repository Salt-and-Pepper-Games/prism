import { connect } from 'react-redux';

import * as uiActionCreators from '../../actionCreators/uiActionCreators';
import * as soundActionCreators from '../../actionCreators/soundActionCreators';
import MainScreen from '../components/MainScreen.jsx';

const mapStateToProps = state => {
	return {
		inGame: state.ui.ui.inGame && state.game.board.loaded,
		soundOn: state.ui.sound.soundOn,
		transitionPlaying: state.ui.sound.transitionPlaying,
		packOpen: !!state.ui.ui.currentPack || state.ui.ui.dashboardOpen
	};
};

const mapDispatchToProps = dispatch => {
	return {
		openDashboard: () => dispatch(uiActionCreators.toggleDashboard()),
		toggleVolume: () => dispatch(soundActionCreators.toggleSound())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
