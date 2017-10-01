import React from 'react';

class LevelArea extends React.Component {
	componentDidMount() {
		this.props.setPackInfo();
	}
	render() {
		const { setCurrentPack, packInfo, userLevelData, isLoading, packOpen } = this.props;
		return (
			<div className={`${packOpen ? 'blur' : ''} level-pack-area`}>
				{isLoading &&
					<div id="loader-wrapper">
					    <div id="loader"></div>
					</div>
				}
				<div className="packs-container">
					{packInfo.map(pack => {
						const userPackData = userLevelData[pack.packName];
						let solvedCount = 0;
						if (userPackData) {
							for (const level in userPackData) {
								solvedCount += userPackData[level].solved ? 1 : 0;
							}
						}
						return (
							<div
								key={pack.packName}
								className={`pack pack${pack.packColor}`}
								onClick={() => setCurrentPack(pack)}
							>
								<div className={`pack-content`}>
									<p className="pack-content-info difficulty">easy</p>
									<p className='pack-title'>{pack.packName.toUpperCase()}</p>
									<p className="pack-content-info completion">{`${Math.floor((solvedCount / pack.levelCount) * 100)}% complete`}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default LevelArea;




