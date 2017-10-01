import React from 'react';
import Header from './Header.jsx';
import DashboardContainer from '../containers/DashboardContainer.jsx';
import LevelAreaContainer from '../containers/LevelAreaContainer.jsx';
import LevelPackContainer from '../containers/LevelPackContainer.jsx';

const MainScreen = ({ inGame, openDashboard, toggleVolume, soundOn, packOpen }) => {
	return (
		<div className={`${inGame ? 'hidden' : 'open'} main-screen`}>
			<Header packOpen={packOpen} openDashboard={openDashboard} toggleVolume={toggleVolume} soundOn={soundOn} />
			<DashboardContainer />
			<LevelAreaContainer packOpen={packOpen} />
			<LevelPackContainer />
		</div>
	);
};

export default MainScreen;
