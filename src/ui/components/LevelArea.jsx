const React = require('react');
const firebase = require('../../utils/initFirebase');

class LevelArea extends React.Component {
	componentDidMount() {
		const levelsRef = firebase.database().ref("levelStrings");
		const packInfo = [];
		levelsRef.once("value").then(snapshot => {
			const packCount = snapshot.child("packCount").val();
			for (let i = 1; i <= packCount; i++) {
				packInfo.push(levelsRef.once("value").then(snapshot => {
					return snapshot.child(`pack${i}/packInfo`).val();
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
					/>
				)}
			</div>
		);
	}
}

module.exports = LevelArea;




