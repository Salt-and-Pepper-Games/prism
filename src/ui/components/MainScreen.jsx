import React from 'react';
import Header from './Header.jsx';
import DashboardContainer from '../containers/DashboardContainer.jsx';
import LevelAreaContainer from '../containers/LevelAreaContainer.jsx';
import LevelPackContainer from '../containers/LevelPackContainer.jsx';
import GameAudio from '../../utils/AudioManager';

class MainScreen extends React.Component {
	constructor(props) {
		super(props);
		this.loopID;
	}
	componentDidMount() {
		if (!this.props.transitionPlaying) {
			this.loopID = GameAudio.play('main_loop');
			GameAudio.volume(.2, this.loopID);
		}
	}
	componentWillReceiveProps(nextProps) {
		if (!nextProps.transitionPlaying && !GameAudio.playing(this.loopID)) {
			this.loopID = GameAudio.play('main_loop');
			GameAudio.fade(0, .2, 2500, this.loopID);
		}
	}
	render() {
		const { inGame, openDashboard, toggleVolume, soundOn, packOpen } = this.props;
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
