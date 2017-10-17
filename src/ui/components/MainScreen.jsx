import React from 'react';
import Header from './Header.jsx';
import DashboardContainer from '../containers/DashboardContainer.jsx';
import LevelAreaContainer from '../containers/LevelAreaContainer.jsx';
import LevelPackContainer from '../containers/LevelPackContainer.jsx';
import GameAudio from '../../utils/AudioManager';

class MainScreen extends React.Component {
	constructor(props) {
		super(props);
		this.loopID = null;
	}
	componentDidMount() {
		if (!this.props.transitionPlaying) {
			if (!this.props.audioLoaded) {
				GameAudio.on('load', this.props.triggerAudioLoaded);
			}
		}
	}
	render() {
		const {
			isLoading,
			transitionPlaying,
			audioLoaded, inGame,
			openDashboard,
			toggleVolume,
			soundOn,
			packOpen
		} = this.props;
		if (!isLoading && !transitionPlaying && audioLoaded && !GameAudio.playing(this.loopID)) {
			this.loopID = GameAudio.play('main_loop');
			if (soundOn) {
				GameAudio.fade(0, .2, 2500, this.loopID);
			} else {
				GameAudio.volume(0.0, this.loopID);
			}
		} else if (!soundOn) {
			GameAudio.volume(0.0, this.loopID);
		} else {
			GameAudio.volume(0.2, this.loopID);
		}
		return (
			<div className={`${inGame ? 'hidden' : 'open'} main-screen`}>
				<Header packOpen={packOpen} openDashboard={openDashboard} toggleVolume={toggleVolume} soundOn={soundOn} />
				<DashboardContainer />
				<LevelAreaContainer packOpen={packOpen} />
				<LevelPackContainer />
			</div>
		);
	}
}

export default MainScreen;
