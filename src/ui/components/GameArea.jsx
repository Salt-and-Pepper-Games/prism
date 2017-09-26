import React from 'react';
import { initGame } from '../../game';
import PropTypes from 'prop-types';
import HelpOverlay from './HelpOverlay.jsx';
import { withRouter } from 'react-router';
import isEqual from 'lodash.isequal';

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
		if (!isEqual(this.props.match, nextProps.match)) {
			const matchParams = nextProps.match.params;
			this.props.loadLevel(matchParams.levelNumber, matchParams.packName);
		}
	}

	render() {
		const { moveCount, loadLevel, match, inGame, returnToMainScreen, openHelp, closeHelp, isHelpOpen, toggleSound, soundOn, history, currentPack } = this.props;
		return (
			<div className={`${inGame ? 'open' : 'hidden'} game-area game-area-${currentPack ? currentPack.packColor : ''}`}>
				<HelpOverlay isHelpOpen={isHelpOpen} closeHelp={closeHelp} />
				<div className="before-game-board">
					<div className="in-game-buttons">
						<i
							className="return-home-btn fa fa-sign-out fa-flip-horizontal"
							onClick={() => {
								history.push(`/`);
								returnToMainScreen();
							}}
						/>
					</div>
					<div className="in-game-buttons">
						<div className="move-count">{moveCount}</div>
					</div>
					<div className="in-game-buttons">
						<i className="help-btn fa fa-question" onClick={openHelp} />
					</div>
				</div>
				<div className={`game-wrapper-${currentPack ? currentPack.packColor : ''} game-board-wrapper`}>
					<div className='game-board' id='game-root' tabIndex='0' />
				</div>
				<div className="after-game-board">
					<div className='in-game-buttons'>
						<i onClick={toggleSound} className={`sound-toggle-btn fa fa-${soundOn ? 'volume-up' : 'volume-off'}`}/>
					</div>
					<div className='in-game-buttons'>
						<i className={`hint-btn fa fa-magic`}/>
					</div>
					<div className='in-game-buttons'>
						<i onClick={() => loadLevel(match.params.levelNumber, match.params.packName)} className={`reset-btn fa fa-refresh`}/>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(GameArea);
