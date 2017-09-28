import React from 'react';
import Header from './Header.jsx';
import DashboardContainer from '../containers/DashboardContainer.jsx';
import LevelAreaContainer from '../containers/LevelAreaContainer.jsx';
import LevelPackContainer from '../containers/LevelPackContainer.jsx';

const MainScreen = ({ inGame, openDashboard, toggleVolume, soundOn }) => {
	return (
		<div className={`${inGame ? 'hidden' : 'open'} main-screen`}>
			<Header openDashboard={openDashboard} toggleVolume={toggleVolume} soundOn={soundOn} />
			<DashboardContainer />
			<LevelAreaContainer />
			<LevelPackContainer />
		</div>
	);
};

export default MainScreen;
