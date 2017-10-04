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
		}
	}
	componentWillReceiveProps(nextProps) {
		if (!nextProps.transitionPlaying && !GameAudio.playing(this.loopID)) {
			GameAudio.play('main_loop');
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
