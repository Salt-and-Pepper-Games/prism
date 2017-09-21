import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { Howl } from 'howler';
import MainScreenContainer from './ui/containers/MainScreenContainer.jsx'
import GameAreaContainer from './ui/containers/GameAreaContainer.jsx';
import demoTrack from './audio/demo_blue.mp3'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.mainTrack = new Howl({
		  src: [demoTrack],
		  loop: true,
		  html5: true
		});
	}
	componentDidMount() {
		this.mainTrack.play();
	}
	render() {
		return (
			<HashRouter>
				<div>
					<Route exact path={`${process.env.PUBLIC_URL}/`} component={MainScreenContainer} />
					<Route path={`${process.env.PUBLIC_URL}/game/:packName/:levelNumber`} component={GameAreaContainer}></Route>
				</div>
			</HashRouter>
		);
	}
}


export default App;
