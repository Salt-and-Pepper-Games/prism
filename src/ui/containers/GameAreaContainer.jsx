import { connect } from 'react-redux';

import GameArea from '../components/GameArea.jsx';
import uiActionCreators from '../../actionCreators/uiActionCreators';
import * as levelActionCreators from '../../actionCreators/levelActionCreators';
import * as asyncActionCreators from '../../actionCreators/asyncActionCreators';

const mapStateToProps = state => {
	return {
		inGame: state.ui.inGame && state.game.board.loaded,
		isHelpOpen: state.ui.isHelpOpen,
		soundOn: state.ui.soundOn,
		currentPack: state.ui.currentPack
	};
};

const mapDispatchToProps = dispatch => {
	return {
		returnToMainScreen: () => {
			dispatch(uiActionCreators.closeGameMode());
			dispatch(levelActionCreators.closeLevelAction());
		},
		openHelp: () => dispatch(uiActionCreators.openHelp()),
		closeHelp: () => dispatch(uiActionCreators.closeHelp()),
		toggleSound: () => dispatch(uiActionCreators.toggleSound()),
		loadLevel: (levelNumber, packName) => dispatch(asyncActionCreators.loadLevelString(levelNumber, packName))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GameArea);
