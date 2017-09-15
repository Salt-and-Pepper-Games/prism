import React from 'react';

import MainScreenContainer from './ui/containers/MainScreenContainer.jsx'
import GameAreaContainer from './ui/containers/GameAreaContainer.jsx';

class App extends React.Component {
	render() {
		return (
			<div>
				<MainScreenContainer />
				<GameAreaContainer />
			</div>
		);
	}
}


export default App;
