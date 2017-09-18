import React from 'react';

class LevelArea extends React.Component {
	componentDidMount() {
		this.props.setPackInfo();
	}
	render() {
		const { setCurrentPack, packInfo } = this.props;
		return (
			<div className="packs-container">
				{packInfo.map(pack =>
					<div
						key={pack.packName}
						className={`pack pack${pack.packName}`}
						onClick={() => setCurrentPack(pack)}
					>
						<div className={`pack-content`}>
							<p className='pack-title'>{pack.packName.toUpperCase()}</p>
							<p className="pack-content-info">easy</p>
							<p className="pack-content-info completion">{`${Math.floor(Math.random() * 100)}% complete`}</p>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default LevelArea;




