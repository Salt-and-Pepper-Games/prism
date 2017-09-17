import React from 'react';
import Venndiagram from '../../images/venndiagram-2.png';


const HelpOverlay = ({ isHelpOpen, closeHelp }) => {
	return (
		<div className={`${isHelpOpen ? 'open' : 'hidden'} help-overlay`}>
			<i onClick={closeHelp} className="fa fa-close help-overlay-close-btn" />
			<img className="venndiagram" src={Venndiagram}/>
			<div className="help-text">
				<p>Toggle switches to combine colors and navigate through blocks.</p>
				<p> Use the arrow keys or swipe to move.</p>
			</div>
		</div>
	);
};

export default HelpOverlay;
