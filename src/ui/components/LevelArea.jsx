import React from 'react';
import firebase from '../../utils/initFirebase';

class LevelArea extends React.Component {
	componentDidMount() {
		const levelsRef = firebase.database().ref("levelStrings");
		const packInfo = [];
		levelsRef.once("value").then(snapshot => {
			const packNames = snapshot.child("packNames").val();
			for (const packName in packNames) {
				packInfo.push(levelsRef.once("value").then(snapshot => {
					return snapshot.child(`${packName}Pack/packInfo`).val();
				}));
			}
			return packInfo;
		}).then(packInfo => {
			Promise.all(packInfo).then(resolvedPacks => {
				this.props.setPackInfo(resolvedPacks);
			});
		});
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
							<p>{pack.packName}</p>
							<span className="pack-content-info">
								<p>easy</p>
								<p>45% complete</p>
							</span>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default LevelArea;




