const uiActionCreators = require('./uiActionCreators');
const levelActionCreators = require('./levelActionCreators');
const firebase = require('../utils/initFirebase');

module.exports = {
	loadLevelString: (levelNum, packInfo) => {
		return dispatch => {
			const packRef = firebase.database().ref(`levelStrings/${packInfo.packName}Pack`);
			packRef.once("value").then(snapshot => {
				return snapshot.child(`level${levelNum}`).val();
			}).then(levelString => {
				const levelObject = {
					levelString,
					levelNum,
					packInfo
				};
				console.log(levelObject);
				// dispatch(levelActionCreators.loadLevelAction(levelObject));
			});
		};
	}
};
