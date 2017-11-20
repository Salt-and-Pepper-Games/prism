import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Venndiagram from '../../images/venndiagram-2.png';
import Slider from 'react-slick';

const HelpOverlay = ({ isHelpOpen, closeHelp }) => {
	const sliderSettings = {
      dots: true,
      infinite: false,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true
    };
	return (
		<div className={`${isHelpOpen ? 'open' : 'hidden'} help-overlay`}>
			<i onClick={closeHelp} className="fa fa-close help-overlay-close-btn" />
			<Slider className="help-overlay-slider" {...sliderSettings}>
				<div>
					<div className="help-slide">
						<img className="venndiagram" src={Venndiagram} alt=''/>
						<div className="help-text">
							<p>Toggle switches to combine colors and navigate through blocks.</p>
							<p> Use the arrow keys or swipe to move.</p>
						</div>
					</div>
				</div>
				<div>
					<div className="help-slide">
						<div className="help-row">
							<img src="../../images/prism-gif.gif" alt=""/>
							<p className="help-text">
								You can only move through the colored blocks if the background is of the same color
							</p>
						</div>
						<div className="help-row">
							<img src="../../images/prism-gif.gif" alt=""/>
							<p className="help-text">
								You can turn colors "on" or "off" by toggling switches of that color.
							</p>
						</div>
					</div>
				</div>
			</Slider>
		</div>
	);
};

export default HelpOverlay;
