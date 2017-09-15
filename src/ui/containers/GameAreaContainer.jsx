import { connect } from 'react-redux';

import GameArea from '../components/GameArea.jsx';
import uiActionCreators from '../../actionCreators/uiActionCreators'

const mapStateToProps = state => {
	return {
		inGame: state.ui.inGame && state.game.board.loaded
	};
};

const mapDispatchToProps = dispatch => {
	return {
		returnToMainScreen: () => dispatch(uiActionCreators.closeGameMode())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GameArea);