import React from 'react';
import Header from './Header.jsx';
import Dashboard from './Dashboard.jsx';
import LevelAreaContainer from '../containers/LevelAreaContainer.jsx';
import LevelPackContainer from '../containers/LevelPackContainer.jsx';

const MainScreen = ({ inGame }) => {
	return (
		<div className={`${inGame ? 'hidden' : 'open'} main-screen`}>
			<Header />
			<Dashboard />
			<LevelAreaContainer />
			<LevelPackContainer />
		</div>
	);
};

export default MainScreen;
