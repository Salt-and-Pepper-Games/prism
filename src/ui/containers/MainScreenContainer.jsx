import { connect } from 'react-redux';

import MainScreen from '../components/MainScreen.jsx';

const mapStateToProps = state => {
	return {
		inGame: state.ui.inGame && state.game.board.loaded
	};
};

const mapDispatchToProps = dispatch => {
	return {

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
