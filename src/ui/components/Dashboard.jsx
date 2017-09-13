const React = require('react');
require("slick-carousel/slick/slick.css");
require("slick-carousel/slick/slick-theme.css");
const Slider = require('react-slick').default;

const Dashboard = () => {
	const mq = window.matchMedia("(orientation: portrait)");
	const settings = {
      dots: mq.matches,
      infinite: false,
      speed: 500,
      slidesToShow: mq.matches ? 1 : 3,
      slidesToScroll: mq.matches ? 1 : 3
    };
	return (
		<div className="dashboard">
			<Slider {...settings}>
				<div>
					<div className="dashboard-panel">
						<h1 className="daily-challenge-header">Daily Challenge</h1>
					</div>
				</div>
				<div>
					<div className="dashboard-panel">
						<h1 className="leaderboards-header">Leaderboards</h1>
						<ul className="leaderboards-list">
							<li>user1</li>
							<li>user2</li>
							<li>user3</li>
							<li>user4</li>
							<li>user5</li>
						</ul>
					</div>
				</div>
				<div>
					<div className="dashboard-panel">
						<h1 className="stats-header">Stats</h1>
						<ul className="stats-list">
						<li>Enemies Squashed: 1</li>
							<li>Levels Perfected: 2</li>
							<li>Switches Toggled: 7000</li>
							<li>Packs Completed: 3</li>
							<li>Something Else: 9</li>
						</ul>
					</div>
				</div>
			</Slider>
		</div>
	);
};

module.exports = Dashboard;
