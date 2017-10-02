import React from 'react';

const Header = ({ openDashboard, soundOn, toggleVolume, packOpen }) => {
	return (
		<div id="header" className={`${packOpen ? 'blur' : ''} header`}>
			<div className='prism'>
				<span className='letter P'>P</span>
				<span className='letter R'>R</span>
				<span className='letter I'>I</span>
				<span className='letter S'>S</span>
				<span className='letter M'>M</span>
			</div>
			<div className='subtitle'>
				A Salt and Pepper Games Production
			</div>
			<div className="main-buttons">
				<i onClick={toggleVolume} className={`fa fa-${soundOn ? 'volume-up' : 'volume-off'} sound-toggle-main`} />
				<i className='fa fa-info dashboard-toggle-main' onClick={openDashboard} />
			</div>
		</div>
	);
};


export default Header;
