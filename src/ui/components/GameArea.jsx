import React from 'react';
import { initGame } from '../../game';
import PropTypes from 'prop-types';
import HelpOverlay from './HelpOverlay.jsx';
import { withRouter } from 'react-router';
import isEqual from 'lodash.isequal';
import * as screenfull from 'screenfull';
import GameAudio from '../../utils/AudioManager';

class GameArea extends React.Component {
	constructor(props) {
		super(props);
		this.mq = window.matchMedia("(orientation: portrait)");
		this.loopID;
	}

	static contextTypes = {
		store: PropTypes.object
	}

	componentWillMount() {
		if (this.mq.matches && screenfull.enabled) {
			screenfull.request();
		}
	}
	componentDidMount() {
		if (!this.props.transitionPlaying) {
			this.loopID = GameAudio.play('gameplay_loop');
		}
		initGame(this.context.store);
		const matchParams = this.props.match.params;
		this.props.loadLevel(matchParams.levelNumber, matchParams.packName);
	}
	componentWillReceiveProps(nextProps) {
		if (!nextProps.transitionPlaying && !GameAudio.playing(this.loopID)) {
			const id = GameAudio.play('gameplay_loop');
			if (nextProps.soundOn) {
				GameAudio.fade(0, 1.0, 2500, id);
			} else {
				GameAudio.volume(0.0, id);
			}
		}
		if (!isEqual(this.props.match, nextProps.match)) {
			const matchParams = nextProps.match.params;
			this.props.loadLevel(matchParams.levelNumber, matchParams.packName);
		}
	}
	componentWillUnmount() {
		if (this.mq.matches && screenfull.enabled) {
			screenfull.exit();
		}
	}

	render() {
		const {
			isLoading,
			moveCount,
			loadLevel,
			match,
			inGame,
			returnToMainScreen,
			openHelp,
			closeHelp,
			isHelpOpen,
			toggleSound,
			soundOn,
			history,
			currentPack,
			startTransition,
			stopTransition
		} = this.props;
		return (
			<div>
				{(isLoading && !inGame) &&
					<div id="loader-wrapper">
					    <div id="loader"></div>
					</div>
				}
				<div className={`${inGame ? 'open' : 'hidden'} game-area game-area-${currentPack ? currentPack.packColor : ''}`}>
					
					<HelpOverlay isHelpOpen={isHelpOpen} closeHelp={closeHelp} />
					<div className={`${isHelpOpen ? 'blur' : ''} before-game-board`}>
						<div className="in-game-buttons">
							<i
								className="return-home-btn fa fa-sign-out fa-flip-horizontal"
								onClick={() => {
									GameAudio.stop();
									startTransition();
									const id = GameAudio.play('enter_game');
									GameAudio.volume(soundOn ? .5 : 0.0, id);
									GameAudio.on('end', () => {
										stopTransition();
									}, id);
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
					<div className={`${isHelpOpen ? 'blur' : ''} game-wrapper-${currentPack ? currentPack.packColor : ''} game-board-wrapper`}>
						<div className='game-board' id='game-root' tabIndex='0' />
					</div>
					<div className={`${isHelpOpen ? 'blur' : ''} after-game-board`}>
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
			</div>
		);
	}
}

export default withRouter(GameArea);
