import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MainScreenContainer from './ui/containers/MainScreenContainer.jsx'
import GameAreaContainer from './ui/containers/GameAreaContainer.jsx';
import GameAudio from './utils/AudioManager.js';

class App extends React.Component {
	render() {
		GameAudio.volume(this.props.soundOn ? 1.0 : 0.0);
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


export default connect(state => ({soundOn: state.ui.sound.soundOn}), null)(App);
