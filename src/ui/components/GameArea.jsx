import React from 'react';
import { initGame } from '../../game';
import PropTypes from 'prop-types';

class GameArea extends React.Component {
	static contextTypes = {
		store: PropTypes.object
	}

	componentDidMount() {
		initGame(this.context.store);
	}

	render() {
		return <div id="game-root" tabIndex="1"></div>
	}
}

export default GameArea;
