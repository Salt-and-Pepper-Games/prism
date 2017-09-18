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
							<span className="pack-content-info">
								<p>easy</p>
								<p>{`${Math.floor(Math.random() * 100)}% complete`}</p>
							</span>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default LevelArea;




