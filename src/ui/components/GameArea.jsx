import React from 'react';
import { initGame } from '../../game';
import PropTypes from 'prop-types';
import HelpOverlay from './HelpOverlay.jsx';
import { withRouter } from 'react-router';
import isEqual from 'lodash.isequal';
import GameAudio from '../../utils/AudioManager';
import PackCompleteModalContainer from '../containers/PackCompleteModalContainer.jsx';

class GameArea extends React.Component {
	constructor(props) {
		super(props);
		this.loopID = null;
	}

	static contextTypes = {
		store: PropTypes.object
	}
	componentDidMount() {
		if (!this.props.transitionPlaying) {
			if (!this.props.audioLoaded) {
				GameAudio.on('load', this.props.triggerAudioLoaded);
			}
		}
		initGame(this.context.store);
		const matchParams = this.props.match.params;
		this.props.loadLevel(matchParams.levelNumber, matchParams.packName);
	}
	componentWillReceiveProps(nextProps) {
		if (!nextProps.isLoading && !nextProps.transitionPlaying && nextProps.audioLoaded && !GameAudio.playing(this.loopID)) {
			this.loopID = GameAudio.play('gameplay_loop');
			if (nextProps.soundOn) {
				GameAudio.fade(0, 1.0, 2500, this.loopID);
			} else {
				GameAudio.volume(0.0, this.loopID);
			}
		}
		if (!isEqual(this.props.match, nextProps.match)) {
			const matchParams = nextProps.match.params;
			this.props.loadLevel(matchParams.levelNumber, matchParams.packName);
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
			stopTransition,
			audioLoaded,
			restartLevel
		} = this.props;
		return (
			<div>
				{((isLoading && !inGame) || !audioLoaded) &&
					<div id="loader-wrapper">
					    <div id="loader"></div>
					</div>
				}
				<div className={`${(inGame && audioLoaded) ? 'open' : 'hidden'} game-area game-area-${currentPack ? currentPack.packColor : ''}`}>
					<PackCompleteModalContainer />
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
							<i onClick={restartLevel} className={`reset-btn fa fa-refresh`}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(GameArea);
