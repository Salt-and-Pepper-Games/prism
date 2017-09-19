import React from 'react';
import { Route } from 'react-router-dom';

import MainScreenContainer from './ui/containers/MainScreenContainer.jsx'
import GameAreaContainer from './ui/containers/GameAreaContainer.jsx';


class App extends React.Component {
	render() {
		return (
			<div>
				<Route exact path={`${process.env.PUBLIC_URL}/`} component={MainScreenContainer} />
				<Route path={`${process.env.PUBLIC_URL}/game/:packName/:levelNumber`} component={GameAreaContainer}></Route>
			</div>
		);
	}
}


export default App;
