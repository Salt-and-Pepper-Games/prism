import { connect } from 'react-redux';

import GameArea from '../components/GameArea.jsx';
import uiActionCreators from '../../actionCreators/uiActionCreators';
import * as levelActionCreators from '../../actionCreators/levelActionCreators';

const mapStateToProps = state => {
	return {
		inGame: state.ui.inGame && state.game.board.loaded,
		isHelpOpen: state.ui.isHelpOpen
	};
};

const mapDispatchToProps = dispatch => {
	return {
		returnToMainScreen: () => {
			dispatch(uiActionCreators.closeGameMode());
			dispatch(levelActionCreators.closeLevelAction());
		},
		openHelp: () => dispatch(uiActionCreators.openHelp()),
		closeHelp: () => dispatch(uiActionCreators.closeHelp())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GameArea);
