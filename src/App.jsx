import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Howl } from 'howler';
import MainScreenContainer from './ui/containers/MainScreenContainer.jsx'
import GameAreaContainer from './ui/containers/GameAreaContainer.jsx';
import demoTrack from './audio/main_menu.mp3';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.mainTrack = new Howl({
		  src: [demoTrack],
		  loop: true,
		  html5: true,
		  volume: 1.0
		});
	}
	componentDidMount() {
		this.mainTrack.play();
	}
	render() {
		this.mainTrack.volume(this.props.soundOn ? 1.0 : 0.0);
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
