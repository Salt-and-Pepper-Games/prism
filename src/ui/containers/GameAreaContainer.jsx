import { connect } from 'react-redux';

import GameArea from '../components/GameArea.jsx';
import uiActionCreators from '../../actionCreators/uiActionCreators'

const mapStateToProps = state => {
	return {
		inGame: state.ui.inGame && state.game.board.loaded,
		isHelpOpen: state.ui.isHelpOpen
	};
};

const mapDispatchToProps = dispatch => {
	return {
		returnToMainScreen: () => dispatch(uiActionCreators.closeGameMode()),
		openHelp: () => dispatch(uiActionCreators.openHelp()),
		closeHelp: () => dispatch(uiActionCreators.closeHelp())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GameArea);