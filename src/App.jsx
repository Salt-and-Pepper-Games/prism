const React = require('react');
const Header = require('./ui/components/Header.jsx');
const Dashboard = require('./ui/components/Dashboard.jsx');
const LevelAreaContainer = require('./ui/containers/LevelAreaContainer.jsx');
const LevelPackContainer = require('./ui/containers/LevelPackContainer.jsx');

class App extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<Dashboard />
				<LevelAreaContainer />
				<LevelPackContainer />
			</div>
		);
	}
}


module.exports = App;
