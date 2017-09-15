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
		const { inGame, returnToMainScreen } = this.props;
		return (
			<div className={`${inGame ? 'open' : 'hidden'}`}>
				<button className="return-home-btn" onClick={returnToMainScreen}>Return to main screen</button>
				<div className='game-area' id='game-root' tabIndex='1' />
			</div>
		);
	}
}

export default GameArea;
