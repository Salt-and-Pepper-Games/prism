import React from 'react';
import { initGame } from '../../game';
import PropTypes from 'prop-types';
import HelpOverlay from './HelpOverlay.jsx'

class GameArea extends React.Component {
	static contextTypes = {
		store: PropTypes.object
	}

	componentDidMount() {
		initGame(this.context.store);
	}

	render() {
		const { inGame, returnToMainScreen, openHelp, closeHelp, isHelpOpen } = this.props;
		return (
			<div className={`${inGame ? 'open' : 'hidden'} game-area`}>
				<HelpOverlay isHelpOpen={isHelpOpen} closeHelp={closeHelp} />
				<div className="before-game-board">
					<i className="return-home-btn fa fa-sign-out fa-flip-horizontal" onClick={returnToMainScreen} />
					<i className="help-btn fa fa-question" onClick={openHelp} />
				</div>
				<div className="game-board-wrapper">
					<div className='game-board' id='game-root' tabIndex='1' />
				</div>
				<div className="after-game-board">

				</div>
			</div>
		);
	}
}

export default GameArea;
