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
			<div className={`${inGame ? 'open' : 'hidden'} game-area`}>
				<div className="before-game-board">
					<button className="return-home-btn" onClick={returnToMainScreen}>Return to main screen</button>
				</div>
				<div className='game-board' id='game-root' tabIndex='1' />
				<div className="after-game-board">

				</div>
			</div>
		);
	}
}

export default GameArea;
