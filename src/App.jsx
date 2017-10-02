import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Howl } from 'howler';
import MainScreenContainer from './ui/containers/MainScreenContainer.jsx'
import GameAreaContainer from './ui/containers/GameAreaContainer.jsx';
import mainTrack from './audio/main_menu.mp3';
import demoTrack from './audio/demo_blue.mp3'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.mainTrack = new Howl({
		  src: [mainTrack],
		  html5: true,
		  volume: 1.0
		});
		this.mainTrack2 = new Howl({
		  src: [demoTrack],
		  html5: true,
		  volume: 1.0
		});
	}
	componentDidMount() {
		const mq = window.matchMedia("only screen and (orientation: portrait)");
		const mq2 = window.matchMedia("only screen and (max-width: 800px)");
		this.mainTrack.play();
		this.mainTrack.on('end', () => {
			this.mainTrack2.play();
		});
		this.mainTrack2.on('end', () => {
			this.mainTrack.play();
		});
		if (mq.matches || mq2.matches) {
			document.getElementById('html').ontouchstart = () => {
				this.mainTrack.play();
				this.mainTrack.on('end', () => {
					this.mainTrack2.play();
				});
				this.mainTrack2.on('end', () => {
					this.mainTrack.play();
				});
			}
		}
	}
	render() {
		this.mainTrack.volume(this.props.soundOn ? 1.0 : 0.0);
		this.mainTrack2.volume(this.props.soundOn ? 1.0 : 0.0);
		return (
			<HashRouter>
				<div>
					<Route exact path={`/`} component={MainScreenContainer} />
					<Route path={`/game/:packName/:levelNumber`} component={GameAreaContainer}></Route>
				</div>
			</HashRouter>
		);
	}
}


export default connect(state => ({soundOn: state.ui.soundOn}), null)(App);
