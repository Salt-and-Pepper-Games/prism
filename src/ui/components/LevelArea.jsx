import React from 'react';

class LevelArea extends React.Component {
	componentDidMount() {
		this.props.setPackInfo();
	}
	render() {
		const { setCurrentPack, packInfo, userLevelData, isLoading, packOpen, audioLoaded } = this.props;
		return (
			<div id="level-area" className={`${packOpen ? 'blur' : ''} level-pack-area`}>
				{(isLoading || !audioLoaded) &&
					<div id="loader-wrapper">
					    <div id="loader"></div>
					    <div id="loader-text">Loading...</div>
					</div>
				}
				{!(isLoading || !audioLoaded) &&
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
									className={`pack pack${pack.packColor} pack${pack.packName}`}
									onClick={() => setCurrentPack(pack)}
								>
									<div className={`pack-content`}>
										<p className="pack-content-info difficulty">{pack.packSize ? `${pack.packSize}x${pack.packSize}` : 'Mixed size'}</p>
										<p className='pack-title'>{pack.packName.toUpperCase()}</p>
										<p className="pack-content-info completion">{`${Math.floor((solvedCount / pack.levelCount) * 100)}% complete`}</p>
									</div>
								</div>
							);
						})}
					</div>
				}
			</div>
		);
	}
}

export default LevelArea;




