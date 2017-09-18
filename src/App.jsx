import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainScreenContainer from './ui/containers/MainScreenContainer.jsx'
import GameAreaContainer from './ui/containers/GameAreaContainer.jsx';


class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={MainScreenContainer} />
					<Route path="/game/:packName/:levelNumber" component={GameAreaContainer}></Route>
				</div>
			</Router>
		);
	}
}


export default App;
