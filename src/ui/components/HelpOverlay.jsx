import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Venndiagram from '../../images/venndiagram-2.png';
import Slider from 'react-slick';
import gif1 from '../../images/prism-gif.gif';
import gif2 from '../../images/prism-gif-2.gif';
import gif3 from '../../images/prism-gif-3.gif';
import gif4 from '../../images/prism-gif-4.gif';
// import omit from 'lodash.omit';

// const leftArrow = (props) => {
// 	return (
// 		<i
// 			{...omit(props, ['currentSlide', 'slideCount'])}
// 			className={`help-left fa fa-chevron-left`}
// 		/>
// 	);
// };
// const rightArrow = (props) => {
// 	return (
// 		<i
// 			{...omit(props, ['currentSlide', 'slideCount'])}
// 			className={`help-left fa fa-chevron-right`}
// 		/>
// 	);
// };

const HelpOverlay = ({ isHelpOpen, closeHelp }) => {
	const sliderSettings = {
      dots: true,
      infinite: false,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1
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
					<div className="help-slide-2">
						<div className="help-row">
							<img className="help-img" src={gif1} alt=""/>
							<p className="help-text">
								You can only move through the colored blocks if the background is of the same color as the block.
							</p>
						</div>
						<div className="help-row">
							<img className="help-img" src={gif2} alt=""/>
							<p className="help-text">
								Turn colors <span className="bold">on</span> or <span className="bold">off</span> by toggling switches of that color.
							</p>
						</div>
					</div>
				</div>
				<div>
					<div className="help-slide-2">
						<div className="help-row">
							<img className="help-img" src={gif3} alt=""/>
							<p className="help-text">
								Turning a switch <span className="bold">on</span> will add its color to the color pool. Turning it <span className="bold">off</span> will remove it from the pool.
							</p>
						</div>
						<div className="help-row">
							<img className="help-img" src={gif4} alt=""/>
							<p className="help-text">
								Colors in the color pool mix together to generate the background color.
							</p>
						</div>
					</div>
				</div>
			</Slider>
		</div>
	);
};

export default HelpOverlay;
