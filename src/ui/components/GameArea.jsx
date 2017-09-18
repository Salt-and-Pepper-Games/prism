import React from 'react';
import { initGame } from '../../game';
import PropTypes from 'prop-types';
import HelpOverlay from './HelpOverlay.jsx';
import { withRouter } from 'react-router';

class GameArea extends React.Component {
	static contextTypes = {
		store: PropTypes.object
	}

	componentDidMount() {
		initGame(this.context.store);
		const matchParams = this.props.match.params;
		this.props.loadLevel(matchParams.levelNumber, matchParams.packName);
	}
	componentWillReceiveProps(nextProps) {
		const matchParams = nextProps.match.params;
		this.props.loadLevel(matchParams.levelNumber, matchParams.packName);
		if (nextProps.inGame && !nextProps.isHelpOpen) {
			// autofocus game
			setTimeout(() => {
				document.getElementById('game-root').focus();
			}, 300);
		}
	}

	render() {
		const { inGame, returnToMainScreen, openHelp, closeHelp, isHelpOpen, toggleSound, soundOn, history } = this.props;
		return (
			<div className={`${inGame ? 'open' : 'hidden'} game-area`}>
				<HelpOverlay isHelpOpen={isHelpOpen} closeHelp={closeHelp} />
				<div className="before-game-board">
					<i
						className="return-home-btn fa fa-sign-out fa-flip-horizontal"
						onClick={() => {
							history.push('/');
							returnToMainScreen();
						}}
					/>
					<i className="help-btn fa fa-question" onClick={openHelp} />
				</div>
				<div className="game-board-wrapper">
					<div className='game-board' id='game-root' tabIndex='0' />
				</div>
				<div className="after-game-board">
					<i onClick={toggleSound} className={`sound-toggle-btn fa fa-${soundOn ? 'volume-up' : 'volume-off'}`}/>
					<i className={`hint-btn fa fa-magic`}/>
					<i className={`reset-btn fa fa-refresh`}/>
				</div>
			</div>
		);
	}
}

export default withRouter(GameArea);
