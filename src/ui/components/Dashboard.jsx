import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import numeral from 'numeral';

const Dashboard = ({ stats, levelData, packInfo, isOpen, closeDashboard }) => {
	const mq = window.matchMedia("only screen and (orientation: portrait), only screen and (max-width: 800px");
	const settings = {
      dots: mq.matches,
      infinite: false,
      arrows: false,
      speed: 500,
      slidesToShow: mq.matches ? 1 : 3,
      slidesToScroll: mq.matches ? 1 : 3
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
				<Slider {...settings}>
					<div>
						<div className="dashboard-panel">
							<h1 className="leaderboards-header">Leaderboards</h1>
							<ul className="leaderboards-list">
								<li className="leaderboard-item" >user1</li>
								<li className="leaderboard-item" >user2</li>
								<li className="leaderboard-item" >user3</li>
								<li className="leaderboard-item" >user4</li>
								<li className="leaderboard-item" >user5</li>
							</ul>
						</div>
					</div>
					<div>
						<div className="dashboard-panel">
							<h1 className="stats-header">Stats</h1>
							<ul className="stats-list">
								<li className="stat">{`Packs Complete: ${packCompleteCount}`}</li>
								<li className="stat">{`Levels Complete: ${numeral(uniqueLevelsComplete).format('0, 0')}`}</li>
								<li className="stat">{`Switches Toggled: ${numeral(stats.switches).format('0, 0')}`}</li>
								<li className="stat">{`Moves Made: ${numeral(stats.moves).format('0, 0')}`}</li>
								<li className="stat">{`Total Playing Time: ${numeral(stats.elapsedTime/(1000)).format('00:00:00')}`}</li>
							</ul>
						</div>
					</div>
					<div>
						<div className="dashboard-panel">
							<p className="about-prism">
								Bring the white square home by using the switches to combine colors and navigate obstacles.
							</p>
						</div>
					</div>
				</Slider>
			</div>
		</div>
	);
};

export default Dashboard;
