import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import numeral from 'numeral';

const Dashboard = ({ stats, levelData, packInfo, isOpen, closeDashboard }) => {
	const mq = window.matchMedia("only screen and (orientation: portrait)");
	const mq2 = window.matchMedia("only screen and (max-width: 800px)");
	const settings = {
      dots: mq.matches || mq2.matches,
      infinite: false,
      arrows: false,
      slidesToShow: mq.matches || mq2.matches ? 1 : 3,
      slidesToScroll: mq.matches || mq2.matches ? 1 : 3
    };
    numeral.nullFormat('...');
    numeral.zeroFormat('...');

    let uniqueLevelsComplete = 0;
    let packCompleteCount = 0;
    for (const pack in levelData) {
    	let uniquePackLevelCount = 0;
    	for (const level in levelData[pack]) {
    		if (levelData[pack][level].solved) {
    			uniquePackLevelCount += 1;
    		}
    	}
    	const currentPack = packInfo.filter(p => p.packName === pack);
    	if (currentPack && currentPack[0]) {
    		packCompleteCount += uniquePackLevelCount === currentPack[0].levelCount ? 1 : 0;
    	}
    	uniqueLevelsComplete += uniquePackLevelCount;
    }

    // stop scrolling outside modal
    const body = document.getElementById('body');
	const html = document.getElementById('html');
	if (isOpen) {
		body.classList.add('modal-open');
		html.classList.add('modal-open');
		body.ontouchmove = e => e.preventDefault();
		html.ontouchmove = e => e.preventDefault();

	} else {
		body.classList.remove('modal-open');
		html.classList.remove('modal-open');
		body.ontouchmove = e => (true);
		html.ontouchmove = e => (true);
	}

	return (
		<div>
			<div onClick={closeDashboard} className={`dashboard-bg ${isOpen ? 'open' : 'hidden'}`} />
			<div className={`dashboard ${isOpen ? 'open' : 'hidden'}`}>
				<i onClick={closeDashboard} className='fa fa-close close-dashboard-btn'/>
				<Slider {...settings}>
					<div>
						<div className="dashboard-panel">
							<h1 className="stats-header">Stats</h1>
							<div className="stats-wrapper-wrapper">
								<div className="stats-wrapper">
									<ul className="stats-list first-list">
										<li className="stat">{`Packs Complete: ${packCompleteCount}`}</li>
										<li className="stat">{`Levels Complete: ${numeral(uniqueLevelsComplete).format('0, 0')}`}</li>
										<li className="stat">{`Switches Toggled: ${numeral(stats.switches).format('0, 0')}`}</li>
										
									</ul>
									<ul className="stats-list">
										<li className="stat">{`Moves Made: ${numeral(stats.moves).format('0, 0')}`}</li>
										<li className="stat">{`Total Playing Time: ${numeral(stats.elapsedTime/(1000)).format('00:00:00')}`}</li>
										<li className="stat">{`Something Else: 14`}</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="dashboard-panel">
							<p className="about-prism">
								PRISM
							</p>
						</div>
					</div>
					<div>
						<div className="dashboard-panel">
							<div className="credits-wrapper">
								<div className="credits-section">
									<h1 className="credits-header">Design</h1>
									<ol className="credits-list first-list">
										<li className="credit-item" >Simon Ever-Hale</li>
										<li className="credit-item" >Sam Grund</li>
										<li className="credit-item" >Peter Stefek</li>
									</ol>
								</div>
								<div className="credits-section">
									<h1 className="credits-header">Music & Sound</h1>
									<ol start="4" className="credits-list">
										<li className="credit-item" >Isaac Pearl</li>
									</ol>
								</div>
								<div className="credits-section">
									<h1 className="credits-header">Special Thanks</h1>
									<ol start="4" className="credits-list">
										<li className="credit-item" >Jonah Bregstone</li>
										<li className="credit-item" >Daniel Karcher</li>
									</ol>
								</div>
							</div>
						</div>
					</div>
				</Slider>
			</div>
		</div>
	);
};

export default Dashboard;
