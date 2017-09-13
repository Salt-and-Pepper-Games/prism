const uiActionCreators = require('./uiActionCreators');
const levelActionCreators = require('./levelActionCreators');
const firebase = require('../utils/initFirebase');

module.exports = {
	loadLevelString: (levelNum, packIndex) => {
		return dispatch => {
			const packRef = firebase.database().ref(`levelStrings/pack${packIndex}`);
			packRef.once("value").then(snapshot => {
				return snapshot.child(`level${levelNum}`).val();
			}).then(levelString => {
				console.log(levelString);
			});
		};
	}
};
