const React = require('react');

class App extends React.Component {
	render() {
		return (
			<div className="header">
				<div className='prism'>
					<span className='letter P'>P</span>
					<span className='letter R'>R</span>
					<span className='letter I'>I</span>
					<span className='letter S'>S</span>
					<span className='letter M'>M</span>
				</div>
				<div className="subtitle">
					A Salt and Pepper Games Production
				</div>
			</div>
		);
	}
}


module.exports = App;
