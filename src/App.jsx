import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MainScreenContainer from './ui/containers/MainScreenContainer.jsx'
import GameAreaContainer from './ui/containers/GameAreaContainer.jsx';

class App extends React.Component {
	render() {
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
